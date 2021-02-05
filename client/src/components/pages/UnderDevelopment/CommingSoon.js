import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './CommingSoon.css';
export default function CommingSoon() {
	return (
		<Fragment>
			<div className="CommingSoon">
				<div className="bgimg">
					<div className="topleft">
						<Link to="/">
							<h3>Libri</h3>
						</Link>
					</div>
					<div className="middle">
						<h1>	Hi I am stopping all the work on this website. I am rebuilding this. I started building this
							while I was still learning so the code is messy now. And the theme is also from facebook
							which I want to change.</h1>
					</div>
					<div className="bottomleft">
						<p>
						Made with love during the summer of 2020
						</p>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
