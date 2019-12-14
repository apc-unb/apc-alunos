FROM node

WORKDIR /app
RUN mkdir tmp
# Copy all files to container
COPY . .
# Install dependencies
RUN npm install
# Build dist
RUN npm run build
# Expose port
EXPOSE 4000
# Start server
CMD npm run start

