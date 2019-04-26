import * as React from 'react';
import { JssProvider, ISheetsRegistry } from 'react-jss';
import { Switch, Route, Link as RouterLink } from 'react-router-dom';
import loadable from 'react-loadable';
import Spinner from './components/Spinner';

interface CustomNodeRequire extends NodeRequire {
	resolveWeak: (s: string) => any;
}

const PageMain = loadable({
	loader: () => import('./pages/main'),
	loading: Spinner,
	delay: 300,
	timeout: 10000,
	modules: ['./pages/main'],
	webpack: () => [(require as CustomNodeRequire).resolveWeak('./pages/main')],
});
const PageDemo = loadable({
	loader: () => import('./pages/demo'),
	loading: Spinner,
	delay: 300,
	timeout: 10000,
	modules: ['./pages/demo'],
	webpack: () => [(require as CustomNodeRequire).resolveWeak('./pages/demo')],
});

export default ({ registry }: {registry?: ISheetsRegistry}) => (
	<JssProvider registry={registry}>
		<div>
			<div>
				<RouterLink to="/">Main</RouterLink>
				&emsp;
				<RouterLink to="/demo">Demo</RouterLink>
			</div>
			<Switch>
				<Route exact path="/" component={PageMain} />
				<Route exact path="/demo" component={PageDemo} />
			</Switch>
		</div>
	</JssProvider>
);
