import * as React from 'react';
import { JssProvider, ISheetsRegistry } from 'react-jss';
import { Switch, Route } from 'react-router-dom';
import Menu from './components/Menu';
import routingTable, { getRouteById } from './routingTable';

export default ({ registry }: {registry?: ISheetsRegistry}) => (
	<JssProvider registry={registry}>
		<div>
			<Menu routingTable={routingTable} />
			<Switch>
				<Route exact path={getRouteById('main').path} component={getRouteById('main').component} />
				<Route exact path={getRouteById('demo').path} component={getRouteById('demo').component} />
			</Switch>
		</div>
	</JssProvider>
);
