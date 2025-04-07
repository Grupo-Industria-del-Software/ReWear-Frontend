    FROM node:18-alpine AS builder
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm ci
    
    ARG REACT_APP_API_URL
    ENV REACT_APP_API_URL=$REACT_APP_API_URL
    
    COPY . .
    RUN npm run build  # Las variables se compilan en los archivos estáticos
    
    FROM nginx:alpine
    COPY --from=builder /app/build /usr/share/nginx/html
    
    COPY nginx.config /etc/nginx/conf.d/default.conf
    
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]