# Findine: CMPT-470 web application group project

## install dependencies:
```
> findine\server> npm install
```

```
> findine> npm install
```

need to run both for front+back end for now

## start app:
run backend + example page:

```
> findine/server> nodemon app
```

run backend + frontend
```
> findine> npm run dev
```

proof-of-concept page: http://localhost:3000/

## using example page

can filter by name, cuisine, price, rating, tags (only cuisine and price is implemented but they're all similar)

important tags include Breakfast, Lunch, Dinner

there is an 'img' attribute for each restaurant that features a link to their respective photo (not printed in example cause its too long anyways)

## populate db with test data:
Populates the database restaurant collection with x restaurants retrieved from Zomato's API. Location is set to Robson St., grabbing restaurants within 1km. 

```
...findine/server> node populatedb.js
```

## todo:
user model/controller

update usersready state to instead be in userdb, and start main app if both users are ready

scale zomato api restaurant scraper to any # of entries (currently limited to 20)
