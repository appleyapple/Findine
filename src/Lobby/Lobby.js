import React from 'react';
import { Redirect } from 'react-router-dom';
import './../mainapp/Mainapp.css';
import NavbarPage from '../Navbar';
import './Lobby.css';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Filters from './components/Filters';
import UserStatus from './components/UserStatus';

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

class LobbyPage extends React.Component {

	constructor(props) {
		super(props);
		this.ready = this.ready.bind(this);
		this.addPriceFilters = this.addPriceFilters.bind(this);

        this.state = {
			prices: ['1', '2', '3', '4'],
			userName: ''
		};
	}
	
	// handler for users to ready up
	ready() {
		console.log('start');
		var data = {
			'userName': this.state.userName,
			'preferences': this.state.prices
		}
		fetch('/profiles/profiles/addPreferences', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {'Content-Type': 'application/json'}
		})
		this.props.history.push('/mainapp');
	}

	// handler for users to filter by price
	addPriceFilters(priceArray) {
		this.setState({ prices: priceArray });
	}

	getUser() {
		fetch('/sessions/sessions')
		.then(res => res.json())
		.then(data => {
			this.setState({ userName: data.userName });
		});
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
					<h2>Select price range</h2>
					<p>Please note that all prices are included by default</p>

					<Filters
						addPriceFilters = {this.addPriceFilters}
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
