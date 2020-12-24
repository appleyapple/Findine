// if doesnt update, go to localhost:8080/script.js and refresh

// Server url
var url = 'http://localhost:9000/restaurants';

//  https://stackoverflow.com/questions/16601741/checkbox-value-in-array-javascript
function getFormCuisine(form) {
    var cuisines = form.cuisine;
    var cuisineValues = [];

    for (var i=0; i<cuisines.length; i++) {
        if (cuisines[i].checked) {
            cuisineValues.push(cuisines[i].id);
        }
    }

    return cuisineValues;
};

function getFormPrice(form) {
    var prices = form.price;
    var priceValues = [];

    for (var i=0; i<prices.length; i++) {
        if (prices[i].checked) {
            priceValues.push(prices[i].id);
        }
    }

    return priceValues;
};


function list(form) {
    // Cancels default form submission 
    event.preventDefault();

    // Collect data from form
    var data = {};
    var newURL = url.concat('?');
    var cuisines = getFormCuisine(form);
    var prices = getFormPrice(form)
    console.log(cuisines);
    console.log(prices);

    // Construct url request
    if (cuisines.length > 0) {
        for (var i=0; i<cuisines.length; i++) {
            if (i==0) {
                newURL = newURL.concat('cuisine[]=' + cuisines[i])
            } else {
                newURL = newURL.concat('&cuisine[]=' + cuisines[i])
            }
        }
    }

    if (prices.length > 0) {
        for (var j=0; j<prices.length; j++) {
            console.log(j);
            console.log(prices[j]);
            if (j==0) {
                if (cuisines.length > 0) {
                    newURL = newURL.concat('&');
                }
                newURL = newURL.concat('price[]=' + prices[j]);
            } else {
                newURL = newURL.concat('&price[]=' + prices[j]);
            }
        }
    } 

    // Send http request
    console.log(newURL);
    
    console.log('Displaying restaurant information...')
    fetch(newURL)
    .then(res => res.json())
    .then((out) => {
        console.log(out);
        drawDB(out);
        console.log('...restaurant information displayed!')
    })
    .catch(err => {
        throw err
    });
};

function drawDB(restaurants) {
    // restaurants = [ {id, name, cuisine, price, rating, highlights, img}, {}, {}, ... ]

    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var y = 5;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStlye = '#000000';
    ctx.strokeRect(0, 0, 1000, 1000);

    for (var i=0; i<restaurants.length; i++) {
        var res = restaurants[i]

        ctx.fillStyle = '#000000';
        ctx.font = '16px arial';
        ctx.fillText('Name: ' + res.name + 
                    ', Cuisine: ' + res.cuisine + 
                    ', Price: ' + res.price + 
                    ', Rating: ' + res.rating +
                    ', Tags: ' + res.highlights, // + 
                    // ', IMG link: ' + res.img, 
                    5, y + 16);
        y += 25
    }
};

