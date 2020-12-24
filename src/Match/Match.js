import React from 'react';
import './../mainapp/Mainapp.css';
import NavbarPage from '../Navbar'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const useStyles = () => ({
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

class MatchPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            restaurants: [{
                name: [], 
                price: [],
                rating: [],
                img: []
            }],
            
            //False -> hide showmore restaurants, True -> don't hide showmore restaurants
            showMore: false,
            //False -> hide show more button, True -> don't hhide show more button
            showButton: true
        }
        this.handleClick = this.handleClick.bind(this);
    }
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------

    async componentDidMount() {
        const sessionURL = '/sessions/sessions'
        const sessionResponse = await fetch(sessionURL);
        const sessionData = await sessionResponse.json();
        var currentUser = sessionData.userName;

        //Get liked restaurant for first user
        const firstUserRestaurantURL = '/profiles/profiles/getlikeRestaurants?userName=' + currentUser;
        const firstUserRestaurantResponse = await fetch(firstUserRestaurantURL);
        var rip = await firstUserRestaurantResponse.text();
        if(rip == ''){
            rip = '{"likedRestaurants":[],"_id":"0"}'
        }
        const firstUserRestaurantData = JSON.parse(rip);
        

        //Get userName for partner
        const userPartnerURL = '/profiles/profiles/getPartnerName?userName=' + currentUser;
        const userPartnerResponse = await fetch(userPartnerURL);
        var test = await userPartnerResponse.text();
        if(test == ''){
            test = '{"partnerName":"","_id":"0"}'
        }
        const userPartnerData = JSON.parse(test);
        const currentPartner = userPartnerData.partnerName;
        console.log(currentPartner);


        //Get liked restaurant for second user
        const secondUserRestaurantURL = '/profiles/profiles/getlikeRestaurants?userName=' + currentPartner;
        const secondUserRestaurantResponse = await fetch(secondUserRestaurantURL);
        var gg = await secondUserRestaurantResponse.text();
        if(gg == ''){
            gg = '{"likedRestaurants":[],"_id":"0"}'
        }
        const secondUserRestaurantData = JSON.parse(gg);
       

        //POST user1 and user2 to match db
        var userDetails = {
            
            'user1Name': currentUser,
            'user2Name': currentPartner
        };
        fetch('/matches/matches/addMatches', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userDetails)
        })

        //Post liked restaurants to match db
        const liked = this.compareLikedRestaurants(firstUserRestaurantData.likedRestaurants, secondUserRestaurantData.likedRestaurants);
        var likedDetails = {
            'user1Name': currentPartner,
            'matchedRestaurants': JSON.stringify(liked)
        }
        fetch('/matches/matches/addMatchedRestaurants', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(likedDetails)
        })
        //Get from match db
        /*
        const matchURL = 'http://localhost:9000/matches/matches/getMatchedRestaurants?user1Name=gg';
        const matchResponse = await fetch(matchURL);
        const matchData = await matchResponse.json();
        console.log(matchData);
        */
        const restaurantURL = '/restaurants';
        const restaurantResponse = await fetch(restaurantURL);
        const restaurantData = await restaurantResponse.json();
        var list = [];
        for(var i = 0; i < liked.length; i++){
            for(var j = 0; j < restaurantData.length; j ++){
                if(liked[i] === restaurantData[j].name){
                    list.push(restaurantData[j]);
                }
            }
        }
        this.setState({restaurants: list});
    }

    //Function for generating a list of restaurants both user likes
    compareLikedRestaurants(first, second) {
        var liked = first.filter(element => second.includes(element));
        return liked;

    }


    //Function that takes the list of restaurant names both user liked, and return an array of 
    //restaurant objects for comparison
    async searchRestaurant(list){
        var current = [];
        const restaurantURL = '/restaurants';
        const restaurantResponse = await fetch(restaurantURL);
        const restaurantData = await restaurantResponse.json();
        for(var i = 0; i < list.length; i++){
            for(var j = 0; j < restaurantData.length; j ++){
                if(list[i] === restaurantData[j].name){
                    current.push(restaurantData[j]);
                }
            }
        }
        return current;
    }

    //When button is clicked, hide the button and unhide the additional restaurants
    handleClick(e){      
        e.preventDefault();
        this.setState({showMore: true});
        this.setState({showButton: false});
    }

    render() {
        if(this.state.restaurants.length == 0){
            return(
                <h1>No Matches to show :(</h1>
            )
        }
        else {
        return (
            <div className="main-app">
                <NavbarPage />
                {this.RestaurantComponent()}
            </div>
        )
        }
            
    }

    RestaurantAllComponent(){
        console.log(this.state.restaurants.length)
    }

    //print a restaurant box
    RestaurantComponent(){
        if(this.state.showMore){
            return(
                <div className="main-app">
                    <h1>All of your matches!</h1>
                    <div className = "Card">
                        {this.state.restaurants.map(current =>(
        
                            <div key={current.name}>
        
                                <div class = "FirstLeft">
                                    <img className='result-image' src={current.img} />
                                </div>
            
                                <div class = "FirstRight">
                                    <h3>{current.name}</h3>
                                    <p>Rating: {current.rating}</p>
                                    <p>Price: {'$'.repeat(this.state.restaurants[0].price)}</p>
                                </div>
        
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else {
            const {classes} = this.props;

            return(
                <div className="main-app">
                    <h1>Your #1 Match!</h1>
                    <div className = "Card">
                        <div class = "FirstLeft">
                        <img className="result-image" src={this.state.restaurants[0].img} />
                        </div>
            
                        <div class = "FirstRight">
                        <h3>{this.state.restaurants[0].name}</h3>
                        <p>Rating: {this.state.restaurants[0].rating}</p>
                        <p>Price: {'$'.repeat(this.state.restaurants[0].price)}</p>
                        </div>
                    </div>
                    <div className='showmore'>
						<Button className={classes.root} onClick={this.handleClick}>Show more</Button>
				    </div>
                </div>
            );    
        }
    }
}


export default withStyles(useStyles)(MatchPage);
