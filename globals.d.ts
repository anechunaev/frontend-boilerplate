declare module "*.json" {
	const value: {[key: string]: any};
	export default value;
}

declare module 'express-static-gzip' {
	const mod: (path: string, options?: {[key: string]: any}) => any;
	export = mod;
}