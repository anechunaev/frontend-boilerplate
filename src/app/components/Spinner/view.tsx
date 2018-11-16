import * as React from 'react';

export interface IOuterProps {
	error?: boolean;
	retry?: () => void;
	timedOut?: boolean;
	pastDelay?: boolean;
}

export interface IInnerProps extends IOuterProps {
	classes: {[key: string]: string};
}

class SpinnerView extends React.PureComponent<IInnerProps> {
	public render() {
		const {
			classes,
			error,
			retry,
			timedOut,
			pastDelay,
			...rest
		} = this.props;

		if (error || timedOut) {
			return <div>Error while loading page. Please, <button onClick={retry}>try again</button></div>;
		} else if (pastDelay) {
			return <div className={classes.spinner} {...rest} />;
		}

		return null;
	}
}

export default SpinnerView;