FROM node:18.20.8-bullseye

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and install deps (dev deps needed for Vite)
COPY package*.json ./
RUN npm install

# Copy the rest of the source
COPY . .

# Expose Vite's default port
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
