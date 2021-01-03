# FINDINE

Findine is a restaurant suggestion web application with Tinder-like mechanics. Users can provide constraints such as cost, maximum travel distance, dietary options (vegetarian, gluten free, allergies, etc), or personal preferences, and the web application will then present users with suggestions. Users can anonymously swipe to like or dislike the restaurant suggestions of their choice. 

This repo was initialized using the group's GitLab repo just before project submission and has since been updated by Henry.

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

## sample users
user: appleyapples
pass: 123123
user: phos
pass: 123123

## contributions to group project
-server-side development: mvc structure, restaurant controller/model/routes, server setup 
-server api sample js code (client folder)
-mongodb and mongoose integration
-db population script
-main application functionality (restaurant previews and selection (like/dislike))
-lobby page and filtering
-partial contribution to front end of lobby, mainapp, and results page

## changelog since submission:
-cleaned up mainapp code; no longer requires extraneous 'start' button (properly calls functions asynchronously)
-streamlined lobby processes; faster loading times 
-fixed warning in filters component in lobby page ("Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.")
-added meal (breakfast, lunch, dinner) and cuisine filters

## todo
-dynamic cuisine filter options (update as restaurants update)
-ui for lobby page
-websockets for lobby page (let users pick their own filters, combine filters)
-synchronized user processes (users selecting restaurants simultaneously)
-location picker
-overhaul results (match.js) page 
-proper user sessions, google login service

## bugs
-sometimes match page does not display the match (empty restaurant card) until refresh
-match page refresh wonky
-warning that doesnt seem to affect functionality (Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.)

## Authors
- Yu Xi Hu
- Howard Chang
- Hsuan-Yi (Eric) Lin
- Henry Yip
- Naomi Chao