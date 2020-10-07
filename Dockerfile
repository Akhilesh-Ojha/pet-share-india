#Specify a base image
FROM node:alpine

WORKDIR /usr/app
#INSTALL SOME DEPENDENCIES
COPY ./package.json ./
RUN npm install

COPY ./ ./

#DEFAULT COMMAND
CMD ["npm" , "run" ,"start"]




# We are copying all files and folder, if we make changes in some file (not package.json),
# docker detects that we change one of the file. 
# Because we made a change, all steps execute again

#npm install runs only for package.json. So during intial cycle we want to copy 