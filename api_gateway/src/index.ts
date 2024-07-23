import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration des routes pour chaque service backend
const services = {
  userService: process.env.USER_SERVICE_URL,
  authService: process.env.AUTH_SERVICE_URL,
  clientService: process.env.CLIENT_SERVICE_URL,
  itemService: process.env.ITEM_SERVICE_URL,
};

// Proxy pour le service des utilisateurs
app.use('/users', createProxyMiddleware({
  target: services.userService,
  changeOrigin: true,
  pathRewrite: {
    '^/users': '', 
  },
}));

// Proxy pour le service d'authentification
app.use('/auth', createProxyMiddleware({
  target: services.authService,
  changeOrigin: true,
  pathRewrite: {
    '^/auth': '', 
  },
}));

// Proxy pour le service des clients
app.use('/clients', createProxyMiddleware({
  target: services.clientService,
  changeOrigin: true,
  pathRewrite: {
    '^/clients': '', 
  },
  logLevel: 'debug',
}));

// Proxy pour le service des items
app.use('/items', createProxyMiddleware({
  target: services.itemService,
  changeOrigin: true,
  pathRewrite: {
    '^/items': '', 
  },
}));

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
