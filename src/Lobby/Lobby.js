import React from 'react';
import './../mainapp/Mainapp.css';
import './Lobby.css';
import NavbarPage from '../Navbar';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Filters from './components/Filters';
import MoreFilters from './components/MoreFilters';

// import UserStatus from './components/UserStatus';

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

// robson st, vancouver
// const defaultLocation = { 
// 	lat: 49.287968050315634,
// 	lng: -123.13003220889654
// };

class LobbyPage extends React.Component {

	constructor(props) {
		super(props);
		this.ready = this.ready.bind(this);
		this.addPriceFilters = this.addPriceFilters.bind(this);
		this.addMealFilters = this.addMealFilters.bind(this);
		this.addCuisineFilters = this.addCuisineFilters.bind(this);
		this.setPreferences = this.setPreferences.bind(this);
		this.handleLocationChange = this.handleLocationChange.bind(this);

        this.state = {
			userName: '',
			prices: ['1', '2', '3', '4'],
			meals: ['Breakfast', 'Lunch', 'Dinner'],
			cuisines: [],
			address: '',
			position: {
				lat: 0,
				lng:0
			}
		};
	}
	
	// handler for users to ready up
	ready() {
		console.log('start');
		this.setPreferences();
		this.props.history.push('/mainapp');
	}

	setPreferences() {
		var data = {
			'userName': this.state.userName,
			'preferences': {
				'prices': this.state.prices,
				'cuisines': this.state.cuisines,
				'tags': this.state.meals
			}
		};
		console.log(JSON.stringify(data));
		fetch('/profiles/profiles/addPreferences', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {'Content-Type': 'application/json'}
		});
	}

	// handler for users to filter by price
	addPriceFilters(priceArray) {
		this.setState({ prices: priceArray });
	}

	// handler for users to filter by meal
	addMealFilters(mealArray) {
		this.setState({ meals: mealArray });
	}

	// handler for users to filter by cuisine
	addCuisineFilters(cuisineArray) { 
		this.setState({ cuisines: cuisineArray });
	}

	getUser() {
		fetch('/sessions/sessions')
		.then(res => res.json())
		.then(data => {
			this.setState({ userName: data.userName });
		});
	}

	handleLocationChange ({ position, address, places }) {
 
		// Set new location
		console.log(position);
		this.setState({ position, address });
	}

	componentDidMount() {
		this.getUser();
	}

	componentWillUnmount() {

	}
	
    render() {
		
		const {classes} = this.props;

		// lobby page
        return (
            <div className="main-app">
				<NavbarPage />
				<div className='filters'>

					<Filters
						addPriceFilters = {this.addPriceFilters}
						addMealFilters = {this.addMealFilters}
                	/>
					<MoreFilters
						addCuisineFilters = {this.addCuisineFilters}
                	/>

				</div>
				<div className='ready'>
					<Button className={classes.root} onClick={this.ready}>Ready</Button>
				</div>
            </div>
        )
    }
}

export default withStyles(useStyles)(LobbyPage);
