# Dockerfile pour authentification_api

# Utiliser une image de base Node.js
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier les fichiers du dossier authentification_api
COPY . .

# Exposer le port utilisé par l'application
EXPOSE 5050

# Démarrer l'application
CMD ["npm", "run", "start:dev"]
