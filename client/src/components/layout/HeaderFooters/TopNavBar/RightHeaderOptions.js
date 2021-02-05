import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// COMPONENTS

import SidebarElements from '../../Sidebar/SidebarElements';
import TopModal from '../../Modal/TopModal';
import { logout } from '../../../../stores/action/auth';

// IMAGES

const iconPlus = require('../../../../assets/HomePage/Plus.png');
const iconMessages = require('../../../../assets/HomePage/Messages.png');
const iconNotification = require('../../../../assets/HomePage/Notification.png');
const iconMore = require('../../../../assets/HomePage/More.png');
const iconSetting = require('../../../../assets/HomePage/Settings.png');
const iconSell = require('../../../../assets/HomePage/Sell.png');
const iconLogout = require('../../../../assets/HomePage/Logout.png');
const RightHeaderOptions = ({ logout, auth: { isAuthenticated, loading, user } }) => {
	const modalRef = React.useRef();

	const openModal = () => {
		modalRef.current.openModal();
	};
	return (
		<Fragment>
			{/* MODAL */}
			{/* MODAL MESSAGE */}
			<TopModal ref={modalRef}>
				<div class="dropdown">
					<ul>
						<SidebarElements
							name={user && user.name}
							img={user && user.avatar}
							link={'/profile'}
						></SidebarElements>

						<br />

						<SidebarElements name="Settings" img={iconSetting} link={'/settings'}></SidebarElements>

						<SidebarElements name="Store" img={iconSell} link={'/store'}></SidebarElements>

						<span href="" onClick={logout}>
							<SidebarElements name="Logout" img={iconLogout}></SidebarElements>
						</span>
					</ul>
				</div>
			</TopModal>
			{/* END OF MODAL */}
			<div className="grid-header-rightSidebar">
				<Link to="/profile">
					<div className="rs-userProfile">
						<img src={user && user.avatar} alt="User Profile" className="user-image" />
						<p>{user && user.name}</p>
					</div>
				</Link>

				<div className="rs-item-wrapper">
					<div className="rs-items">
						<div className="rs-icons">
							<img src={iconPlus} alt="Create Post" height="25px" width="25px" />
						</div>
					</div>
					<div className="rs-items">
						<div className="rs-icons">
							<img src={iconMessages} alt="Message" height="25px" width="25px" />
						</div>
					</div>
					<div className="rs-items">
						<div className="rs-icons">
							<img src={iconNotification} alt="Notification" height="25px" width="25px" />
						</div>
					</div>
					<div className="rs-items">
						<div className="rs-icons">
							<img src={iconMore} alt="More Options" height="25px" width="25px" onClick={openModal} />
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};
RightHeaderOptions.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps, { logout })(RightHeaderOptions);
