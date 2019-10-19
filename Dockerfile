FROM node

ENV APIHOST="localhost"
ENV APIPORT="80"
ENV PORT="4000"
ENV NODE_ENV="production"

WORKDIR /app
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

