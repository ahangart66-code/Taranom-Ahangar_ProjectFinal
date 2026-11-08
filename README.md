# Torino

Persian (RTL) frontend for the Torino travel agency. Next.js 13.1.1. Users search tours, open a tour, add it to the basket, and check out. Signed-in users can edit their profile and see purchased tours and transactions.

The API is a separate service. This app only talks to it over HTTP.

## Requirements

- Node.js 18+
- npm
- The Torino API running locally (default `http://localhost:6500`)

## Setup

```bash
npm install
```

Create `.env` in the project root:

```bash
NEXT_PUBLIC_API_URL=http://localhost:6500
```

If `.env` is missing, the app uses `http://localhost:6500`.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Command |
| --- | --- |
| Dev server | `npm run dev` |
| Production build | `npm run build` |
| Production server | `npm start` |
| Lint | `npm run lint` |
| Format | `npm run format` |

## Routes

| Path | Page |
| --- | --- |
| `/` | Home: origin, destination, Jalali date search, tour list, contact banner, “why Torino” |
| `/tours/[id]` | Tour details (price, features, image) |
| `/checkout` | Basket and passenger form |
| `/profile` | Edit name, birth date, gender, bank card |
| `/profile/tours` | Purchased tours |
| `/profile/transactions` | Transactions |
| `/about` | About |
| `/contact` | Contact |
| Any other path | 404 |

Home search updates the URL (`originId`, `destinationId`, `startDate`, `endDate`) and filters on the server and in the browser. Dates in the form are Jalali; query values are `YYYY-MM-DD`.

## API

Base URL: `NEXT_PUBLIC_API_URL` (default `http://localhost:6500`).

Auth header after login: `Authorization: Bearer <accessToken>`.

| Method | Path | Used for |
| --- | --- | --- |
| `POST` | `/auth/send-otp` | Send OTP. Body: `{ mobile }` |
| `POST` | `/auth/check-otp` | Verify OTP. Body: `{ mobile, code }` → `accessToken`, `refreshToken`, `user` |
| `POST` | `/auth/refresh-token` | Refresh access token. Body: `{ refreshToken }` |
| `GET` | `/tour` | Tour list. Query: `originId`, `destinationId`, `startDate`, `endDate` |
| `GET` | `/tour/:id` | One tour |
| `PUT` | `/basket/:tourId` | Add the tour to the basket |
| `GET` | `/basket` | Current basket |
| `POST` | `/order` | Place the order (passenger details) |
| `GET` | `/user/profile` | Profile |
| `PUT` | `/user/profile` | Update profile |
| `GET` | `/user/tours` | Purchased tours |
| `GET` | `/user/transactions` | Transactions |

Tour image paths that start with `/` are loaded from the API origin.
