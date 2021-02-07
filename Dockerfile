FROM nginx:1.19-alpine
COPY ./next /usr/share/nginx/html
WORKDIR /usr/share/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]