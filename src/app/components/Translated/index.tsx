import * as React from 'react';
import labels from '@tutu/lang/lib/core/labels';
import labelsMap from './dev.labels.json';

export default () => {
	return (
		<div>
			Testing test: {labels(labelsMap, 'test')} - end;
		</div>
	);
}
