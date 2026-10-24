# Torino (تورینو)

آژانس مسافرتی — فرانت‌اند با Next.js 13.1.1

## اجرا

```bash
npm install
npm run dev
```

API پیش‌فرض: `http://localhost:6500` (Swagger: `/api-docs`)

## Auth endpoints

- `POST /auth/send-otp` — `{ mobile }`
- `POST /auth/check-otp` — `{ mobile, code }` → `accessToken`, `refreshToken`, `user`
- `POST /auth/refresh-token` — `{ refreshToken }` → `accessToken`
