import View, { IOuterProps as IViewProps } from './view';
import styles from './style';
import withStyles from 'react-jss';

export type IProps = IViewProps;

const Spinner = withStyles(styles)(View);
Spinner.displayName = 'Spinner';

export default Spinner;