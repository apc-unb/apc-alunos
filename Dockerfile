FROM node

ENV APIHOST="184.172.214.210"
ENV APIPORT="32637"
ENV PORT="8001"
ENV NODE_ENV="production"

WORKDIR /app
# Copy only necessary files
COPY package.json .
COPY package-lock.json .
COPY server.js .
COPY dist ./dist
COPY static/ ./static
COPY app ./app

# Install dependencies
RUN npm install
# Expose port
EXPOSE 8001
# Start server
CMD npm run start

