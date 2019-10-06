FROM node

WORKDIR /web
# Copy only necessary files
COPY . .

# Install dependencies
RUN npm install
# Creates static files
RUN npm run build
# Expose port
EXPOSE 45000
# Start server
CMD npm run start

