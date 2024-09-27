# Use a Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app
EXPOSE 4090 4091

# Install npm packages
COPY package.json .
RUN npm install
COPY . .

# Prisma
RUN npx prisma generate

# Build
RUN npm run build
RUN rm -rf ./src

CMD ["node", "./dist/src/main.js"]