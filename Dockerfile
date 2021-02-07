FROM nginx:1.19-alpine
COPY ./build /usr/share/nginx/html
WORKDIR /usr/share/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]