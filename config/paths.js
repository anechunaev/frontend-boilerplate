const path = require('path');

const root = path.join(__dirname, '..');

module.exports = {
	root,
	entry: path.join(root, 'entry'),
	webpack: path.join(root, 'config/webpack'),
	views: path.join(root, 'src/server/views'),
	src: path.join(root, 'src'),
	static: path.join(root, 'static'),
	dist: path.join(root, 'dist'),
	public: path.join(root, 'dist', 'public'),
};