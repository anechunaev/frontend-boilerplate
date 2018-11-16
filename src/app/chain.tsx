import * as React from 'react';
import { JssProvider, ISheetsRegistry } from 'react-jss';
import { Switch, Route, Link as RouterLink } from 'react-router-dom';
import Main from './pages/main';
import Demo from './pages/demo';

export default ({ registry }: {registry?: ISheetsRegistry}) => (
	<JssProvider registry={registry}>
		<div>
			<div>
				<RouterLink to="/">Main</RouterLink>
				&emsp;
				<RouterLink to="/demo">Demo</RouterLink>
			</div>
			<Switch>
				<Route exact path="/" component={Main} />
				<Route exact path="/demo" component={Demo} />
			</Switch>
		</div>
	</JssProvider>
);