# pull official base image
FROM node:19-alpine3.15

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json .
RUN npm ci
RUN npm install --silent
# RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . .

# start app
CMD ["npm", "run", "start:dev"]