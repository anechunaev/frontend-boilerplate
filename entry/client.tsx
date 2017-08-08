import 'isomorphic-fetch';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createNewStore from 'lib/redux';

import App from 'src/common/App';
import 'normalize.css';

const store = createNewStore({middleware: [], reducers: []});

function render() {
	ReactDOM.render(
		<Root />,
		document.getElementById('main'),
	);
}

const Root = (() => {
	const Chain = () => (
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	);

	if (module.hot) {
		const AppContainer = require('react-hot-loader').AppContainer;
		module.hot.accept('src/common/App', () => {
			require('src/common/App').default;
			render();
		});

		return () => (
			<AppContainer>
				<Chain />
			</AppContainer>
		);
	}
	return Chain;
})();

render();