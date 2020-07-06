import * as React from 'react';
import TestComponent from '@tutu/test-component';
import Translated from '../components/Translated';

export default () => (
	<>
		<h1>Main page</h1>
		<p>Hello world!</p>
		<p>
			<TestComponent disabled>
				Child:
			</TestComponent>
		</p>
		<p>
			<Translated />
		</p>
	</>
);