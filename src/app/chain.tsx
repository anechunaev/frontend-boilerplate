import * as React from 'react';
import { JssProvider, ISheetsRegistry } from 'react-jss';
import { Switch, Route } from 'react-router-dom';
import Menu from './components/Menu';
import routingTable, { getRouteById } from './routingTable';
import { Projects } from '@tutu-react/projects-toolbar';
import EuropeanLayout from '@tutu-react/europe-page-layout';
import LanguageProvider from '@tutu/lang/lib/react/provider';

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
			firstName: 'Длинная',
			lastName: 'картинка',
		},
	},
	cookieBannerGDPRProps:{
		policyUrl: 'jn',
	},
}


export default ({ registry }: {registry?: ISheetsRegistry}) => {
	const [lang, setLocale] = React.useState(locale);
	// i18n.changeLanguage(lang);
	return (
		<LanguageProvider language={lang}>
			<JssProvider registry={registry}>
				<div>
					<Menu routingTable={routingTable} />
					<div>
						<button type="button" onClick={() => setLocale('en')}>En</button>
						<button type="button" onClick={() => setLocale('de')}>De</button>
						<button type="button" onClick={() => setLocale('ru')}>Ru</button>
						<button type="button" onClick={() => setLocale('dev')}>Dev</button>
					</div>
					<Switch>
						<Route exact path={getRouteById('main').path} component={getRouteById('main').component} />
						<Route exact path={getRouteById('demo').path} component={getRouteById('demo').component} />
					</Switch>
				</div>
				<EuropeanLayout {...layoutProps}>
					Inside Layout
				</EuropeanLayout>
			</JssProvider>
		</LanguageProvider>
	);
};
