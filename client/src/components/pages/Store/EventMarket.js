import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../layout/Spinner/Spinner';
import { getProducts } from '../../../stores/action/product';
import { getEvents } from '../../../stores/action/event';
import GridWrapper from '../../layout/GridWrapper/GridWrapper';
import Sidebar from '../../layout/Sidebar/Sidebar';
import SidebarElements from '../../layout/Sidebar/SidebarElements';
import Searchbar from '../../layout/Searchbox/Searchbar';
import SidebarButton from '../../layout/Sidebar/SidebarButton';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductWrapper from '../../layout/Product/ProductWrapper';

import EventItem from '../../layout/Product/EventItem';
import EventFilter from '../../layout/Product/Filters/EventFilter';
const iconStore = require('../../../assets/HomePage/MarketPlace.png');
const iconBook = require('../../../assets/HomePage/BookIcon.png');
const iconEvent = require('../../../assets/HomePage/Events.png');

const EventMarket = ({
	event: { events, event_loading },

	getEvents,
}) => {
	const handleChange = (category) => {
		console.log(category);
	};
	const [search, setSearch] = useState('');
	const [filteredEvents, setFilteredEvents] = useState('');
	useEffect(() => {
		getEvents();
	}, []);
	useEffect(() => {
		setFilteredEvents(
			events.filter((event) => {
				return event.title.toLocaleLowerCase().includes(search.toLocaleLowerCase());
			})
		);
	}, [search, events]);
	return event_loading && events === null ? (
		<Spinner />
	) : (
		<Fragment>
			<GridWrapper navItems={true} branding={false}>
				<Sidebar color="#242526">
					<h5>Events</h5>
					<br></br>
					<input
						className="searchbar"
						placeholder="Search Events"
						onChange={(e) => setSearch(e.target.value)}
					/>
					<br></br>

					<Link to="/store/create">
						<SidebarButton text=" +    Create Listing"></SidebarButton>
					</Link>
					<br></br>

					<h5>Categories</h5>

					<SidebarElements name="Books" img={iconBook} link={'/books'}></SidebarElements>

					<SidebarElements name="Events" img={iconEvent} link={'/events'}></SidebarElements>

					<SidebarElements
						name="College Essentials"
						img={iconStore}
						link={'/college-essentials'}
					></SidebarElements>
				</Sidebar>
				<div className="product-content">
					<div className="mb-productStore-header">
						<div className="productStore-header-options">
							<div className="s-h-user">My Account</div>
							<Link to="/store/create">
								<div className="s-h-sell">Sell</div>
							</Link>
							{/* <div className="s-h-categories">All Categories</div> */}
						</div>
						<Searchbar text="Search Store"></Searchbar>
					</div>
					<EventFilter onChange={handleChange}></EventFilter>
					<div className="first store-product-category">
						<h5>Events</h5>
						<Link to="/events">See All</Link>
					</div>
					<ProductWrapper>
						{filteredEvents && filteredEvents.length > 0 ? (
							filteredEvents.map((event) => (
								<Link to={`/events/${event._id}`}>
									<EventItem key={event._id} event={event} />
								</Link>
							))
						) : (
              <p>"{search}" not found</p>
						)}
					</ProductWrapper>

					<br></br>
				</div>
			</GridWrapper>
		</Fragment>
	);
};
EventMarket.propTypes = {
	getProducts: PropTypes.func.isRequired,
	products: PropTypes.object.isRequired,
	events: PropTypes.object.isRequired,
	getEvents: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	product: state.product,
	event: state.event,
});

export default connect(mapStateToProps, { getProducts, getEvents })(EventMarket);
