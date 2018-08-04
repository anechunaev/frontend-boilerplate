import * as React from 'react';
import { JssProvider, ISheetsRegistry } from 'react-jss';
import { Switch, Route } from 'react-router-dom';
import Main from './pages/main';

export default ({ registry }: {registry?: ISheetsRegistry}) => (
	<JssProvider registry={registry}>
		<Switch>
			<Route path="/" component={Main} />
		</Switch>
	</JssProvider>
);