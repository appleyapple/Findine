import React from 'react';
import './Mainapp.css';
import NavbarPage from '../Navbar'
import nullimg from './assets/passbutton.png';
import RestaurantCards from './components/RestaurantCards';
import SwipeButtons from './components/SwipeButtons';
import { withStyles } from '@material-ui/core/styles';

const async = require('async');

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

// const url = 'https://developers.zomato.com/api/v2.1/search?start='; // add offset 
// const tags = '&q=breakfast%2C%20lunch%2C%20dinner';
// const loc = '&lat=49.287968050315634&lon=-123.13003220889654';
// const etc = '&radius=1000&sort=rating&order=desc';

class MainAppPage extends React.Component {

	constructor(props) {
		super(props);
		this.indexer = this.indexer.bind(this);
		this.getUser = this.getUser.bind(this);
		this.getPref = this.getPref.bind(this);
		this.getRestaurants = this.getRestaurants.bind(this);
		this.setLikedRestaurants = this.setLikedRestaurants.bind(this);

		// clean up fetch request; mem leak problem fix?
		this.controller = new AbortController();

        this.state = {
			
			// restaurants and filters
			restaurants: [],
			prices: ['1', '2', '3', '4'],
			cuisines: [],
			meals: ['Breakfast', 'Lunch', 'Dinner'],
			liked: [],

			// misc
			loading: true,
			loadingPref: true,
			loadingUser: true,
			numCards: 0,
			cardIndex: 0,
			userName: ''
		};
	}
	
	// handler for buttons to update cardIndex and liked/passed restaurants
	indexer(bool) {
		this.setState({ cardIndex: this.state.cardIndex + 1 });
		this.setState(prevState => ({
			liked: [...prevState.liked, bool]
		}));
		return;
	}
	
	// get current user using sessions
	getUser(cb) {
		fetch('/sessions/sessions')
		.then(res => res.json())
		.then(data => {
			this.setState({ userName: data.userName });
			this.setState({ loadingUser: false });
			cb(null, data.userName);
		});
	}

	// get list of liked restaurants (names only)
	getLiked() {
		var likedJSON = {};

		// get list of restaurant names
		var restaurantsCopy = this.state.restaurants.map((restaurant) => {
			return restaurant['name'];
		});

		// mask list of restaurant with liked (boolean) array to get liked restaurants
		var likedCopy = [...this.state.liked, false];
		var liked = restaurantsCopy.filter((i) => {
			return likedCopy[restaurantsCopy.indexOf(i)];
		});

		likedJSON = { 'userName': this.state.userName, 'likedRestaurants': liked };

		return likedJSON;
	}

	// get filters from lobby page 
	getPref(username) {
		fetch('/profiles/profiles/getPreferences?userName='.concat(username))
		.then(res => res.json())
		.then(data => {
			this.setState({ prices: data.preferences.prices });
			this.setState({ cuisines: data.preferences.cuisines });
			this.setState({ meals: data.preferences.tags });
			return data;
		})
		.then((data) => {
			this.setState({ loadingPref: false });
			return data.preferences;
		})
		.then((pref) => {
			console.log(pref)
			this.getRestaurants(pref);
		})
		.catch(err => err);
	}

	// get restaurant info according to preferences
    getRestaurants(pref) {
		this.setState({ loading: true }, () => {

			// get list of restaurants
			var data = {
				'trim': 20,
				'price': pref.prices,
				'cuisines': pref.cuisines,
				'tags': pref.tags,
			}
			fetch('/restaurants?', {
				signal: this.controller.signal,
				method: 'POST',
				body: JSON.stringify(data),
				headers: {'Content-Type': 'application/json'}
			}) // bug: hangs here sometimes on try again
			.then(res => res.json())

			// map json to object array
			.then((res) => {
				var restaurantList = res.map(function(res) {
					var restaurantInfo = {
						name: res.name,
						img: res.img,
						cuisines: res.cuisine,
						rating: res.rating,
						price: res.price
					}
					return restaurantInfo;
				});

				// cushion value to check for out-of-bound array index
				restaurantList.push({ name: 'placeholder', img: nullimg });
				return restaurantList;
			})

			// set list to restaurant state and release loading status
			.then((list) => {
				this.setState({ numCards: list.length });
				this.setState({ restaurants: list });
				this.setState({ loading: false });
				// console.log(this.state.restaurants);
			})
            .catch(err => err);
		});
	}

	// save list of liked restaurants to db
	setLikedRestaurants() {
		var liked = this.getLiked();
		// console.log(JSON.stringify(liked));

		fetch('/profiles/profiles/addLikeRestaurants',  {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(liked)
		})
		.catch(err => err);
	}

    componentDidMount() {
		// console.log('main app page');
		async.waterfall([
			this.getUser,
			this.getPref
		], function(err) {
			console.log(this.state.userName);
			console.log(this.state.restaurants);
			console.log(this.state.price);
		});
	}

	componentWillUnmount() {
		this.controller.abort();
	}
	
    render() {
		// const {classes} = this.props;

		// loading page
		if (this.state.loading || this.state.loadingPref || this.state.loadingUser) {		
			return (
				<div className='main-app'>
					<div className='loading'>
						<p>loading...</p>
					</div>
				</div>
			)
		} 

		// results page
		if (this.state.cardIndex >= this.state.numCards - 1) {

			this.setLikedRestaurants();

			this.props.history.push('/match');

			return (
				<div className='main-app'>
					<div className='results'>
						<p>loading results...</p>
					</div>
				</div>
			)
		}

		// main app page
		else { 
			return (
				<div className="main-app">
				<NavbarPage />
					<h4>Swipe on these restaurants!</h4>
					<div className='cards'>
						<RestaurantCards 
							restaurants = {this.state.restaurants} 
							cardIndex = {this.state.cardIndex} 
							numCards = {this.state.numCards} />
					</div>
					<div>
						<SwipeButtons 
							indexer = {this.indexer} />
					</div>
				</div>
			)
		} 
    }
}

export default withStyles(useStyles)(MainAppPage);
