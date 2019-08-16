#Define image to build from
FROM node:10-alpine
LABEL AUTHOR="Samuel Ladapo <ladaposamuel@gmail.com>"
LABEL app="storm-backend"

#Create directory to hold the application code inside the image
#Working directory of the application
ADD . /var/app
WORKDIR /var/app

#Install app dependencies using npm binary
RUN npm install

#Bundle apps source code
RUN npm run build

# start the application
CMD npm run start

# app binds to port 3000 so you'll use the EXPOSE
EXPOSE 3000
