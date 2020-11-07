# Findine: CMPT-470 web application group project

## MERN tech stack
*Mondodb (Mongoose front-end)
*Express (mvc)
*React // integrate react router dom
*Node.js

## install dependencies:
*>Findine\mvc> npm install

## start devserver:
*>Findine\mvc> nodemon Findine
*landing page: http://localhost:3000/
*restaurants in db: http://localhost:3000/catalog/list

## mongoose schematypes:
*https://mongoosejs.com/docs/schematypes.html
*https://mongoosejs.com/docs/validation.html

## populate db with test data:
*DO NOT RUN IF DB IS ALREADY POPULATED
*>Findine\mvc> node populatedb mongodb+srv://admin:cmpt470@findine.mexlh.mongodb.net/findine?retryWrites=true&w=majority


## todo:
*serve restaurant list w/ parameters from a form
*user model + controller
*integrate react router dom
*zomato/place api restaurant scraper
    