import * as React from 'react';
import memo from 'fast-memoize';
import loadable from 'react-loadable';
import i18next from '@tutu/lang/lib/core/i18n';

const routingTable = [
	{
		id: "main",
		path: "/",
		component: loadable.Map({
			loader: {
				Page: () => import('./pages/main'),
				labels: () => {
					if (typeof window !== 'undefined') {
						return new Promise((resolve, reject) => {
							i18next.on('initialized', () => {
								i18next.loadNamespaces(['main', 'vendor'])
								.then((data: any) => {
									resolve(data);
								})
								.catch(reject);
							});
						});
					}
					return i18next.loadNamespaces(['server']).catch(console.log);
				},
			},
			render: (loaded: any, props) => {
				const { Page: { default: Page } } = loaded;
				return <Page {...props} />;
			},
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
		component: loadable.Map({
			loader: {
				Page: () => import('./pages/demo'),
				labels: () => {
					if (typeof window !== 'undefined') {
						return new Promise((resolve, reject) => {
							i18next.on('initialized', () => {
								i18next.loadNamespaces(['demo', 'vendor'])
								.then((data: any) => {
									resolve(data);
								})
								.catch(reject);
							});
						});
					}
					return i18next.loadNamespaces(['server']).catch(console.log);
				}
			},
			render: (loaded: any, props) => {
				const { Page: { default: Page } } = loaded;
				return <Page {...props} />;
			},
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
