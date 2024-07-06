# Utiliser une image de base Node.js compatible avec npm@10.8.1
FROM node:18.17.0-buster-slim

# Définir l'environnement Node, par défaut en production
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Définir les ports par défaut
ARG PORT=19006
ENV PORT $PORT
EXPOSE $PORT 19001 19002 8081

# Installer les packages globaux
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm --allow-root -g npm@latest expo-cli@latest @expo/ngrok@^4.1.0

# Créer le répertoire de l'application avec les permissions appropriées
RUN mkdir /opt/react_native_app
WORKDIR /opt/react_native_app
ENV PATH /opt/react_native_app/.bin:$PATH
COPY package.json package-lock.json ./
RUN npm install

# Copier le code source de l'application
WORKDIR /opt/react_native_app/app
COPY . .

# Définir le point d'entrée et la commande par défaut
#CMD ["npx", "expo", "start", "--tunnel", "--no-dev"]

# Si vous voulez désactiver ngrok, utilisez "--offline" au lieu de "--tunnel" :
CMD ["npx", "expo", "start", "--offline", "--no-dev"]
