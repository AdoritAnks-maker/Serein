# Serein

Serein is a real-time, interest-based chat app for college students. Users choose who they want to meet and a set of interests, then chat in a shared private room when matched.

## Run locally

1. Copy `Backend/.env.example` to `Backend/.env` and set `MONGO_URI` and `JWT_SECRET`.
2. In `Backend`, run `npm install` and `npm start`.
3. Copy `frontend/.env.example` to `frontend/.env`.
4. In `frontend`, run `npm install` and `npm run dev`.

## Deploy on Render

Create two services from this repository.

### Backend web service

- Root directory: `Backend`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables:
  - `MONGO_URI`: your MongoDB Atlas connection string
  - `JWT_SECRET`: a long, random secret
  - `CLIENT_URL`: the full URL of your deployed frontend, for example `https://serein-web.onrender.com`
  - `MONGODB_DNS_SERVERS`: optional; leave as `8.8.8.8,8.8.4.4` if your network blocks Atlas SRV lookups

After deployment, confirm `https://your-backend.onrender.com/health` returns `{ "status": "ok" }`.

### Frontend static site

- Root directory: `frontend`
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Environment variables:
  - `VITE_API_URL`: `https://your-backend.onrender.com/api`
  - `VITE_SOCKET_URL`: `https://your-backend.onrender.com`

Vite variables are embedded during the build. Trigger a new frontend deploy whenever either `VITE_*` value changes.

## Production checks

- Add the final frontend URL to `CLIENT_URL` exactly, without a trailing slash.
- Do not commit `.env` files; only the safe `.env.example` templates are tracked.
- MongoDB Atlas must allow connections from your host. For Render, use Atlas network access settings appropriate for your security policy.
