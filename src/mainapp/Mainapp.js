import React from 'react';
import { Link } from 'react-router-dom';
import './Mainapp.css';
import NavbarPage from '../Navbar'
import nullimg from './assets/passbutton.png';
import RestaurantCards from './components/RestaurantCards';
import SwipeButtons from './components/SwipeButtons';
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

class MainAppPage extends React.Component {

	constructor(props) {
		super(props);
		this.indexer = this.indexer.bind(this);
		this.getPref = this.getPref.bind(this);
		this.getRestaurants = this.getRestaurants.bind(this);

		// cancel fetch request; mem leak problem fix?
		this.controller = new AbortController();

        this.state = {
			
			// restaurant cards
			restaurants: [],
			price: ['1', '2', '3', '4'],
			liked: [],
			numCards: 0,
			cardIndex: 0,

			// misc
			loading: true,
			loadingPref: true,
			loadingUser: true,
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

	getLiked() {
		var likedJSON = {};
		var restaurantsCopy = this.state.restaurants.map((restaurant) => {
			return restaurant['name'];
		});
		var likedCopy = [...this.state.liked, false];

		// mask restaurant list to get liked restaurant names
		var liked = restaurantsCopy.filter((i) => {
			return likedCopy[restaurantsCopy.indexOf(i)];
		});

		likedJSON = { 'userName': this.state.userName, 'likedRestaurants': liked };

		return likedJSON;
	}

	// query builder 
	buildURL() {
		// var url = 'http://localhost:9000/restaurants?cuisine[]=Japanese';
		var url = '/restaurants?';
		return url;
	}

	buildLikedURL(likedList) {
		var url = '/profiles/profiles/addLikeRestaurants?';
		likedList = likedList.join('&');
		console.log(likedList);

		url = url.concat('userName=', this.state.userName);
		url = url.concat('&likedRestaurants=', likedList);

		return url;
	}

	getPref() {
		console.log(this.state.userName);
		fetch('/profiles/profiles/getPreferences?userName='.concat(this.state.userName))
		.then(res => res.json())
		.then(data => {
			console.log('prices: ' + data.preferences);
			this.setState({ price: data.preferences })
			this.setState({ loadingPref: false })
			return data.preferences;
		})
		.then((pref) => {
			this.getRestaurants(pref);
		})
		.catch(err => err);
	}

    getRestaurants(pref) {
		// set loading status
		this.setState({ loading: true }, () => {

			// get list of restaurants
			var url = this.buildURL();
			var data = {
				'trim': 21,
				'price': pref,
				// 'price': this.state.price,
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
				console.log(this.state.restaurants);
			})
            .catch(err => err);
		});
	}

	getUser() {
		fetch('/sessions/sessions')
		.then(res => res.json())
		.then(data => {
			this.setState({ userName: data.userName });
			this.setState({ loadingUser: false });
		});
	}

    componentDidMount() {
		console.log('main app page');
		this.getUser();
		// this.getRestaurants();
		// this.getPref();
	}

	componentWillUnmount() {
		this.controller.abort();
	}
	
    render() {
		const {classes} = this.props;

		// loading page
		if (this.state.loading || this.state.loadingPref || this.state.loadingUser) {		
			return (
				<div className='main-app'>
					{/* <NavbarPage /> */}
					<div className='start'>
						<Button className={classes.root} onClick={this.getPref}>Start</Button>
					</div>
				</div>
			)
		} 

		// results page
		if (this.state.cardIndex >= this.state.numCards - 1) {
			console.log('results page');
			var liked = this.getLiked();
			console.log(JSON.stringify(liked));

			fetch('/profiles/profiles/addLikeRestaurants',  {
				signal: this.controller.signal,
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(liked)
			})
			.catch(err => err);

			this.props.history.push('/match');

			return (
				<div className="main-app">
					<h1>results page</h1>
					<p>to be implemented as a separate page</p>
					<h2>matched restaurant</h2>
					<h2>see more</h2>
					<h2>try again</h2>
				</div>
			)
		}

		// main app page
		else { 
			console.log(this.state.price);
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
