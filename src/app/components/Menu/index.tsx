import View, { IOuterProps as IViewProps } from './view';
import styles from './style';
import withStyles from 'react-jss';

export type IProps = IViewProps;

const Menu = withStyles(styles)(View);
Menu.displayName = 'Menu';

export default Menu;
