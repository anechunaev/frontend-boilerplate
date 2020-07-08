import * as React from 'react';
import labels from '@tutu/lang/lib/core/labels';
import i18n from '@tutu/lang/lib/core/i18n';
import labelsMap from './dev.labels.json';

export default () => {
	console.log('==> inside: ', i18n.language, labelsMap, labelsMap['test']);
	return (
		<div>
			Testing test: {labels(labelsMap, 'test')} - end;
		</div>
	);
}