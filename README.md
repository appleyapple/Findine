# FINDINE

Findine is a restaurant suggestion web application with Tinder-like mechanics. Users can provide constraints such as cost, maximum travel distance, dietary options (vegetarian, gluten free, allergies, etc), or personal preferences, and the web application will then present users with suggestions. Users can anonymously swipe to like or dislike the restaurant suggestions of their choice. 

## install dependencies:
```
> findine> npm install
```

## start app:
run backend + frontend
```
> findine> npm run dev
```

run backend + example page:
```
> findine/server> nodemon app
```

example page (http://localhost:3000/) tests implementation of backend api

## populate db with test data:
Populates the database restaurant collection with x restaurants retrieved from Zomato's API. Location is set to Robson St., grabbing restaurants within 1km. 

```
...findine/server> node populatedb.js
```

## changelog since submission by Henry:
-cleaned up mainapp code; no longer requires extraneous 'start' button (properly calls functions asynchronously)

## Authors
- Yu Xi Hu
- Howard Chang
- Hsuan-Yi (Eric) Lin
- Henry Yip
- Naomi Chao