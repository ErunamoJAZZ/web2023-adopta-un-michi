FROM node:18-slim

# Create app directory
WORKDIR /app
COPY .env package.json /app/
COPY build /app/build

# RUN ls
RUN npm install --omit=dev

# Expose
ENV HOST 0.0.0.0
EXPOSE 3000

# start command
CMD [ "npm", "start" ]
