import React, { Fragment, useEffect } from 'react';
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
import ProductItem from '../../layout/Product/ProductItem';
import EventItem from '../../layout/Product/EventItem';
const iconStore = require('../../../assets/HomePage/MarketPlace.png');
const iconBook = require('../../../assets/HomePage/BookIcon.png');
const iconEvent = require('../../../assets/HomePage/Events.png');
const iconCollege = require('../../../assets/HomePage/Courses.png');
const iconUser = require('./Sell/Assets/SingleUser.png');
const Marketplace = ({ product: { loading, products }, event: { events, event_loading }, getProducts, getEvents }) => {
	useEffect(() => {
		getProducts();
		getEvents();
	}, []);
	return loading && products === null && event_loading && events === null ? (
		<Spinner />
	) : (
		<Fragment>
			<GridWrapper navItems={true} branding={false}>
				<Sidebar color="#242526">
					<h4>Marketplace</h4>
					<br></br>
					<Searchbar text="Search Store"></Searchbar>
					<br></br>
					<SidebarElements name="Browse All" img={iconStore} link={'/store/you/selling'}></SidebarElements>
					<SidebarElements name="Your Account" img={iconUser}></SidebarElements>
					<br></br>
					<Link to="/store/create">
						<SidebarButton text=" +    Create Listing"></SidebarButton>
					</Link>
					<br></br>
					<h5>Categories</h5>

					<SidebarElements name="Books" img={iconBook} links={'/books'}></SidebarElements>

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
					<div className=" first store-product-category ">
						<h5>Books</h5>
						<Link to="/books">See All</Link>
					</div>
					<ProductWrapper>
						{products && products.length > 0 ? (
							products
								.filter((product) => product.category == 'book')
								.map((product) => (
									<Link to={`/books/${product._id}`}>
										<ProductItem key={product._id} product={product} />
									</Link>
								))
						) : (
							<h2>Products not found</h2>
						)}
					</ProductWrapper>
					<div className="store-product-category">
						<h5>Events</h5>
						<Link to="/events">See All</Link>
					</div>
					<ProductWrapper>
						{events && events.length > 0 ? (
							events.map((event) => (
								<Link to={`/events/${event._id}`}>
									<EventItem key={event._id} event={event} />
								</Link>
							))
						) : (
							<h2>Products not found</h2>
						)}
					</ProductWrapper>
					<div className="store-product-category">
						<h5>College Essentials</h5>
						<Link to="/college-essentials">See All</Link>
					</div>
					<ProductWrapper>
						{products && products.length > 0 ? (
							products
								.filter((product) => product.category == 'collegeEssential')
								.map((product) => (
									<Link to={`/college-essentials/${product._id}`}>
										<ProductItem key={product._id} product={product} />
									</Link>
								))
						) : (
							<h2>Products not found</h2>
						)}
					</ProductWrapper>
					<br></br>
				</div>
			</GridWrapper>
		</Fragment>
	);
};
Marketplace.propTypes = {
	getProducts: PropTypes.func.isRequired,
	products: PropTypes.object.isRequired,
	events: PropTypes.object.isRequired,
	getEvents: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	product: state.product,
	event: state.event,
});

export default connect(mapStateToProps, { getProducts, getEvents })(Marketplace);
