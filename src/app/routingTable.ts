import memo from 'fast-memoize';
import loadable from 'react-loadable';

const routingTable = <const>[
	{
		id: "main",
		path: "/",
		component: loadable({
			loader: () => import('./pages/main'),
			loading: require('./components/Spinner').default,
			delay: 300,
			timeout: 10000,
			modules: ['./pages/main'],
			webpack: () => [(require as CustomNodeRequire).resolveWeak('./pages/main')],
		}),
	},
	{
		id: "demo",
		path: "/demo",
		component: loadable({
			loader: () => import('./pages/demo'),
			loading: require('./components/Spinner').default,
			delay: 300,
			timeout: 10000,
			modules: ['./pages/demo'],
			webpack: () => [(require as CustomNodeRequire).resolveWeak('./pages/demo')],
		}),
	},
];

export default routingTable;


/***********
 * Helpers *
 ***********/

interface CustomNodeRequire extends NodeRequire {
	resolveWeak: (s: string) => any;
}

export type Route = typeof routingTable[number];
export const getRouteById = memo((id: Pick<Route, 'id'>['id']) => {
	return routingTable.find(route => route.id === id) as Route;
});
