# Use Node v8.9.1 as the base image.
FROM node:8.9.1

ADD . /app

# Install dependencies
RUN cd /app; \  
    npm install

# Expose the server port
EXPOSE 8080

# Run the app
CMD ["node", "/app/app.js"]