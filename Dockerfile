FROM node:14-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:14-alpine
ENV PORT=80

COPY --from=builder /app/dist/angular-medecin /app

CMD npx http-server-spa /app /app/index.html $PORT
