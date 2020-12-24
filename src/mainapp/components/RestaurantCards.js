import React from 'react';
import './RestaurantCards.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      maxWidth: 500,
    },
    media: {
      height: 300,
      width: 500,
    },
});

function RestaurantCards(props) {

    const classes = useStyles();

    // placeholder img for restaurants with no featured photo
    var img = props.restaurants[props.cardIndex].img;
    if (img === '') {
        img = 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';
    }

    // convert price to dolla signs
    var price = parseInt(props.restaurants[props.cardIndex].price, 10);
    var dolla = '$'.repeat(price);

    return (
        <div className='restaurantCard'>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.media}
                    image={img}
                    title='restaurant image'
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        { props.restaurants[props.cardIndex].name }
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Rating: {props.restaurants[props.cardIndex].rating},  Price: {dolla}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.restaurants[props.cardIndex].cuisines.join(', ')}
                    </Typography>
                </CardContent>
            </Card>

        </div>
    )
}

export default RestaurantCards
