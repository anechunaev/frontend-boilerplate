import * as React from 'react';
import { Route } from 'react-router-dom';
import Helmet from 'react-helmet';

import styles from './style.less';

export interface IProps {
}

const App: React.SFC<IProps> = (): React.ReactElement<IProps> => (
	<div className={styles.wrapper}>
		<Helmet>
			<title>Frontend Boilerplate</title>
		</Helmet>

		<Route exact path="/" component={() => <h1>Index page</h1>} />
		<Route exact path="/test" component={() => <h1>Test page</h1>} />
	</div>
);

export default App;