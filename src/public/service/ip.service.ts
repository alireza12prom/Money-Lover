import ipaddr from 'ipaddr.js';

export class IPService {
  private constructor() {}

  static isValid(ip: string) {
    return ipaddr.isValid(ip);
  }

  static version(ip: string) {
    return ipaddr.parse(ip).kind();
  }

  /**
   * NOTE: convert IPv6 ip to IPv4 version
   * if the ip was a IPv4-mapped IPv6
   */
  static toIPv4(ip: string) {
    const addr = ipaddr.parse(ip);
    if (addr instanceof ipaddr.IPv6 && addr.isIPv4MappedAddress()) {
      ip = addr.toIPv4Address().toString();
    }
    return ip;
  }
}
