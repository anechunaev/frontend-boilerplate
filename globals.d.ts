declare module 'react-jss' {
	export type ISheetsRegistry = any;
	export const SheetsRegistry: ISheetsRegistry;
	export const JssProvider: any;
}

declare module "*.json" {
	const value: {[key: string]: any};
	export default value;
}