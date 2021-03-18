FROM node:14 as base
WORKDIR /code
ADD package.json package.json
ADD package-lock.json package-lock.json
RUN npm ci --silent
ADD src src
ADD public public
COPY jsconfig.json .eslintrc.js .prettierrc ./

FROM base as builder
ARG NODE_ENV=production
ARG VERSION
RUN npm run build

FROM nginx
COPY --from=builder /code/build/ /usr/share/nginx/html
