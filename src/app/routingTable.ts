import memo from 'fast-memoize';
import loadable from '@loadable/component';
import * as React from 'react';
import Spinner from './components/Spinner';

const loadingOptions = {
	fallback: React.createElement(Spinner),
};

const routingTable = <const>[
	{
		id: "main",
		path: "/",
		component: loadable(() => import(/* webpackChunkName: "main" */'./pages/main'), loadingOptions),
	},
	{
		id: "demo",
		path: "/demo",
		component: loadable(() => import(/* webpackChunkName: "demo" */'./pages/demo'), loadingOptions),
	},
];

export default routingTable;


/***********
 * Helpers *
 ***********/

export type Route = typeof routingTable[number];
export const getRouteById = memo((id: Pick<Route, 'id'>['id']) => {
	return routingTable.find(route => route.id === id) as Route;
});
