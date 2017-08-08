import * as React from 'react';
import { Route } from 'react-router-dom';
import Helmet from 'react-helmet';

import * as styles from './style.less';

export interface IProps {
}

const App: React.SFC<IProps> = (): React.ReactElement<IProps> => (
	<div className={styles.wrapper}>
		<Helmet>
			<title>Tutu design language prototype</title>
		</Helmet>

		<Route exact path="/" component={<h1>Index page</h1>} />
	</div>
);

export default App;