interface NodeModule {
	hot: {
		accept(path: string, callback: () => void): void;
	}
}

declare const SERVER: boolean;

interface Window {
	__STATE__: any;
	__REDUX_DEVTOOLS_EXTENSION__(): any;
}

declare module 'microseconds' {
	export interface DateObject {
		microseconds: number;
		milliseconds: number;
		seconds: number;
		minutes: number;
		hours: number;
		days: number;
	}

	export function now(): number;
	export function parse(timeStamp: number): DateObject;
	export function since(timeStamp: number): number;
}

declare module '*.svg' {
	const _: string;
	export default _;
}

declare module '*.less' {
	type Style = {
		[key: string]: string;
	}
	const _: Style;
	export default _;
}

declare module '*.json' {
	type Obj = {
		[key: string]: any;
	}
	const _: Obj;
	export default _;
}

// @types/node patch
interface SymbolConstructor {
	(key: string): symbol;
	readonly iterator: symbol;
}
declare var Symbol: SymbolConstructor;