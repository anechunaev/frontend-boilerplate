import * as React from 'react';
import { render } from 'react-dom';
// import { hydrate } from 'react-dom';
import Chain from '../app/chain';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import i18n from '@tutu/lang/lib/core/i18n';
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
// import Backend from '../backend';

window.addEventListener("load", () => {
	const generatedStyles = document.getElementById('server-side-styles');
	if (!!generatedStyles) generatedStyles.outerHTML = '';
});

document.addEventListener("DOMContentLoaded", () => {
	const container = document.getElementById('main');
	Promise.all([
		Loadable.preloadReady(),
		i18n
			.use(Backend as any)
			.use(initReactI18next)
			.init({
				lng: "de",
				fallbackLng: false,
				debug: true,
				supportedLngs: ['en', 'de', 'ru', 'dev'],
				backend: {
					loadPath: '/dist/{{ns}}.{{lng}}.json',
				},
				defaultNS: 'module',
				ns: ['main', 'vendor'],

				interpolation: {
					escapeValue: false
				},
				react: {
					wait: true,
					useSuspense: false,
				},
			}),
	]).then(() => {
		(window as any).i18n = i18n;
		render(
				<BrowserRouter>
					<Chain />
				</BrowserRouter>,
			container,
			() => {
				if (container) container.dataset.render = "client";
			}
		);
	});
});