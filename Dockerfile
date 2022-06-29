FROM node:14-alpine AS my-app-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=my-app-build /app/dist/angular-medecin /usr/share/nginx/html
EXPOSE 80
