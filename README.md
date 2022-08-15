This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## What is this project about?

This project represents the whole authentication of an Instagram-Clone, which I am currently developing. Hence this project resembles the design of instagrams official authentication logic. However I've added a few features to improve the user experience even further.

Obviously, this project has login & signup functionalities, but also login with social media accounts like [Google](https://www.google.com) or [Facebook](https://www.facebook.com). For better security two Factor Authentication is used with e-mail or SMS. I know this is not the most secure option, but sufficient enough for the purposes of this application.
Since SMS cost a few cents, I am currently using the sandbox mode of [Everify](https://everify.dev/sandbox).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Since this application employs a MySQL database, creating one of your own is necessary. The query for the database is provided in `/database/newInstagramDatabase.sql`. This query not only includes the structure of the database, but also tons of fake data, necessary for development purposes, created with [Faker.js](https://fakerjs.dev/)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!