import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Configuration des routes pour chaque service backend
const services = {
  userService: process.env.USER_SERVICE_URL,
  authService: process.env.AUTH_SERVICE_URL,
  clientService: process.env.CLIENT_SERVICE_URL,
  itemService: process.env.ITEM_SERVICE_URL,
  logsService: process.env.LOGS_SERVICE_URL,
  stockService: process.env.STOCK_SERVICE_URL,
};


// Vérifiez les URLs des services
Object.keys(services).forEach(service => {
  if (!services[service]) {
    console.error(`Missing URL for ${service}`);
  }
});

// Proxy pour le service de logs
if (services.logsService) {
  app.use('/logs', createProxyMiddleware({
    target: services.logsService,
    changeOrigin: true,
    pathRewrite: {'^/logs': ''},
  }));
}

// Proxy pour le service des utilisateurs
if (services.userService) {
  app.use('/users', createProxyMiddleware({
    target: services.userService,
    changeOrigin: true,
    pathRewrite: {'^/users': ''},
  }));
}

// Proxy pour le service d'authentification
if (services.authService) {
  app.use('/auth', createProxyMiddleware({
    target: services.authService,
    changeOrigin: true,
    pathRewrite: {'^/auth': ''},
  }));
}

// Proxy pour le service des clients
if (services.clientService) {
  app.use('/clients', createProxyMiddleware({
    target: services.clientService,
    changeOrigin: true,
    pathRewrite: {'^/clients': ''},
    logLevel: 'debug',
  }));
}

// Proxy pour le service des items
if (services.itemService) {
  app.use('/items', createProxyMiddleware({
    target: services.itemService,
    changeOrigin: true,
    pathRewrite: {'^/items': ''},
  }));
}

// Proxy pour le service de stock
if (services.stockService) {
  app.use('/stock', createProxyMiddleware({
    target: services.stockService,
    changeOrigin: true,
    pathRewrite: {'^/stock': ''},
  }));
}

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
