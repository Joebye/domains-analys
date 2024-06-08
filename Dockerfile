FROM node:20-alpine
COPY ./build /build 
COPY ./package.json /package.json 
COPY ./package-lock.json /package-lock.json
RUN npm install  

CMD ["npm","run","startprod"]