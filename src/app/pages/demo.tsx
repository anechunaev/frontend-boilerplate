import * as React from 'react';
import labelsMap from './demo.labels.json';
import labels from '@tutu/lang/lib/core/labels';

export default () => (
	<>
		<h1>{labels(labelsMap, 'title')}</h1>
		<p>{labels(labelsMap, 'description')}</p>
	</>
);