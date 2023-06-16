# Money-Lover

A simpel node.js web app to manage expenses and incomes.

```
NOTE: To connect to a database, you must create a .env file and set `DATABASE_URL` as your database url.
```

## 💡 Summary 💡

In this application you can create wallet and then reocrd your `expenses` and `incomes`. Also you can create
Label for your transactions and with this feature, your transactions will be more recognizable.

## 🛠️ Deeping 🛠️

In this project I using a populare pattern called `Controller-Service-Repository`. With this pattern we will have
three layers that makes projects more maintainable.

I using [Prisma](https://github.com/prisma/prisma) as an ORM to better managing `Repository` Layer. Prisma has a lot of feature and is more
compatible with typescript.

Also I using [Eslint](https://github.com/eslint/eslint) (as a linter) and
[Prettier](https://github.com/prettier/prettier) (as a code formatter) that are the best choice for nodejs projects.

And in the end I using [Express](https://github.com/expressjs/express) that is a web
framework for nodejs and is a best choice for small projects.
