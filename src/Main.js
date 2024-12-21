import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App'; // Assuming App is a valid component for the root
import { postRoutes } from './PostManagement_Task/routes';
import { nftsRoutes } from './NFTs_Crypto/routes';

function Main() {
	return (
		<div>
			<Router>
				<Switch>
					<Route exact path="/" component={App} />
					{[...postRoutes,...nftsRoutes].map((route, index) =>
						<Route key={index} path={route.path} component={route.component} />
					)}
				</Switch>
			</Router>
		</div>
	);
}

export default Main;


