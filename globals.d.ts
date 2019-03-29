declare module 'react-jss' {
	export type ISheetsRegistry = any;
	export const SheetsRegistry: ISheetsRegistry;
	export const JssProvider: any;
	const withStyles: (styles: {[key: string]: any}) => (com: React.ComponentType<any>) => React.ComponentType<any>;
	export default withStyles;
}

declare module "*.json" {
	const value: {[key: string]: any};
	export default value;
}

declare module 'express-static-gzip' {
	const mod: (path: string, options?: {[key: string]: any}) => any;
	export = mod;
}