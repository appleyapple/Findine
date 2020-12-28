import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import './SwipeButtons.css'

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
  });

function liked() {
    console.log('liked');
    return;
}

function passed() {
    console.log('passed');
    return;
}

function SwipeButtons(props) {

    const classes = useStyles();

    return (
        <div className='swipeButtons'>
            <Button className={classes.root} onClick={() => {
                passed(); 
                props.indexer(false);
            }}><ThumbDownIcon/></Button>
            
            <Button className={classes.root} onClick={() => {
                liked(); 
                props.indexer(true);
            }}><ThumbUpIcon/></Button>
        </div>
    )
}

export default SwipeButtons
