FROM node:alpine3.12 as build

ENV REACT_APP_API_URL=link

WORKDIR /code

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

FROM nginx:1.19.6-alpine

COPY --from=build /code/build /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'