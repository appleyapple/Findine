# Findine
CMPT-470 web application group project


stack: MERN
    Mondodb (Mongoose front-end)
    Express (mvc)
    React
    Node.js

install dependencies: 
    >Findine\mvc> npm install

start devserver: 
    >Findine\mvc> nodemon Findine
    webpage: http://localhost:3000/


mongoose schematypes:
    https://mongoosejs.com/docs/schematypes.html
    https://mongoosejs.com/docs/validation.html

populate db with test data:
    DO NOT RUN IF DB IS ALREADY POPULATED
    >Findine\mvc> node populatedb mongodb+srv://admin:cmpt470@findine.mexlh.mongodb.net/findine?retryWrites=true&w=majority
