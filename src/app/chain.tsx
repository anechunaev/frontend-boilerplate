import * as React from 'react';
import { JssProvider, ISheetsRegistry } from 'react-jss';
import { Switch, Route } from 'react-router-dom';
import Menu from './components/Menu';
import routingTable, { getRouteById } from './routingTable';
import { Projects } from '@tutu-react/projects-toolbar';
import EuropeanLayout from '@tutu-react/europe-page-layout';

const locale = 'en';
const currency = 'USD';

const layoutProps = {
	logoUrl:"https://tootravel.com",
	settingsUpdateUrl:"https://my.com.rc.tootravel.pro/settings/api/settings",
	cookieBannerGDPRUpdateUrl:"https://settings.com.rc.tootravel.pro/api/settings/cookie/agreements",
	currencySwitcherProps:{
		currency,
	},
	localeSwitcherProps:{
		locale,
	},
	projectsToolbarProps:{
		projectsParams: {
			[Projects.SEARCH]: {
				url: '/aaaa',
			},
			[Projects.PROFILE]: {
				url: '/bbbbb',
			},
			[Projects.RADAR]: {
				url: '/cccc',
			},
			[Projects.TRIPS]: {
				url: '/ddd',
			},
		},
		current: Projects.SEARCH,
		user:
		{
			picture: 'https://bigenc.ru/media/2016/10/27/1235204139/18636.jpg',
			firstName: 'Длинная',
			lastName: 'картинка',
		},
	},
	cookieBannerGDPRProps:{
		policyUrl: 'jn',
	},
}


export default ({ registry }: {registry?: ISheetsRegistry}) => (
	<JssProvider registry={registry}>
		<div>
			<Menu routingTable={routingTable} />
			<Switch>
				<Route exact path={getRouteById('main').path} component={getRouteById('main').component} />
				<Route exact path={getRouteById('demo').path} component={getRouteById('demo').component} />
			</Switch>
		</div>
		<EuropeanLayout {...layoutProps}>
			Inside Layout
		</EuropeanLayout>
	</JssProvider>
);
