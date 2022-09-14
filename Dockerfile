FROM nginxinc/nginx-unprivileged:stable-alpine
USER root
COPY ./.nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./dist /usr/share/nginx/html
RUN chown nginx.nginx -Rv /usr/share/nginx/html && \
    cp /usr/share/zoneinfo/Asia/Jakarta /etc/localtime && \
    apk del tzdata && \
    rm -rf /var/cache/apk/*
USER nginx:nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]