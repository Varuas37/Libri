import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function Notice({ isAuthenticated }) {
	if (isAuthenticated) {
		return <Redirect to="/Home" />;
	}

	return (
		<div className="notice" style={{margin:"40px"}}>
			<h1>Before you start</h1>
			<ul>
				<li>I started this project during the summer of 2020 and I have decided to end it</li>
				<li>
					The codebase got really messy and I want this to be an actual project so I am re-writing it from
					scratch .
				</li>
				<li> I also have learned a lot since then so I didn't like the way project was structured.</li>
				<li>
					{' '}
					Additionaly, the theme looks almost identical to facebook. Which I don't want in my finished product
				</li>
				<li>
					There are few features that don't work properly yet. Like comments showing up instantly. You have to
					refresh. (due to error on redux) and few other thing
				</li>

				<li>Default login username and password are pre-filled</li>
			</ul>
			<Link to="/landing" style={{ color: 'blue', marginTop: '20px' }}>
				<strong>Click to go to Home</strong>
			</Link>
		</div>
	);
}

Notice.propTypes = {};
Notice.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, null)(Notice);
