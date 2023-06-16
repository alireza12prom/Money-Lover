import jwt from 'jsonwebtoken';
import config from '../../config/index.json';
interface AccessToken extends jwt.JwtPayload {
  id: string;
  ref: boolean;
}

export class TokenService {
  private constructor() {}

  static genAccessToken(id: string) {
    const secret = config.Token.SECRET;
    return jwt.sign({ id, ref: false }, secret, { algorithm: 'HS384', expiresIn: '1d' });
  }

  static genRefreshToken(id: string) {
    const secret = config.Token.SECRET;
    return jwt.sign({ id, ref: true }, secret, { algorithm: 'HS384', expiresIn: '7d' });
  }

  static validate(t: 'access' | 'refresh', token: string) {
    const secret = config.Token.SECRET;
    try {
      const validatedToken = jwt.verify(token, secret) as AccessToken;
      if (t == 'access' && validatedToken.ref) {
        return 'token is not an access token';
      }
      if (t == 'refresh' && !validatedToken.ref) {
        return 'token is not an refresh token';
      }
      return { id: validatedToken.id };
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return 'token has expired';
      }
      return 'token is not valid';
    }
  }
}
