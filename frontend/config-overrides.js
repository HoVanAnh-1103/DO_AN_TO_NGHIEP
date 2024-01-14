const path = require('path');

module.exports = function override(config) {
	config.resolve = {
		...config.resolve,
		alias: {
			...config.alias,
			'@access': path.resolve(__dirname, 'src/access'),
			"@services": path.resolve(__dirname, 'src/services'),
			'@utils':path.resolve(__dirname, 'src/utils')
		}
	}
	return config;
}