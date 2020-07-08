let currentChunk: string;
let currentLanguage: string;
let chunkOptions: Record<string, string[]> | undefined;

export function setCurrentChunk(chunk: string, lng?: string): Promise<any> {
	if (typeof window === 'undefined') return Promise.resolve({});
	currentChunk = chunk;

	if (typeof lng !== 'undefined') {
		currentLanguage = lng;
	}

	const namespaces = (chunkOptions as any || {})[currentChunk] || [];

	const urls = namespaces.map((ns: string) => ns.replace(/\bdev\b/g, currentLanguage));

	console.log('==> SCC', currentChunk, currentLanguage, namespaces, urls, chunkOptions);

	const fetches = urls.map((url: string) => fetch(url).then(data => data.json()));

	return Promise.all(fetches);
}

export default class Backend {
	public static type = "backend";

	private options: { chunks?: Record<string, string[]> } = {};

	init(services: any, backendOptions: any, i18nextOptions: any) {
		console.log('==> BE init', services, backendOptions, i18nextOptions);
		/* use services and options */

		this.options = backendOptions;
		chunkOptions = this.options.chunks;
	}

	public read(language: string, namespace: string, callback: any) {
		console.log('==> BE read', language, namespace, callback.toString());
		currentLanguage = language;
		// const namespaces = ['vendor', 'main', 'demo'];
		
		setCurrentChunk(currentChunk, language).then((data) => {
			console.log('==> BE read loaded', data);
			callback(null, Object.assign({}, ...data));
		});
	}
}