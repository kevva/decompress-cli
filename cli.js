#!/usr/bin/env node
'use strict';
const arrify = require('arrify');
const decompress = require('decompress');
const getStdin = require('get-stdin');
const meow = require('meow');
const stripIndent = require('strip-indent');

const cli = meow(`
	Usage
	  decompress <file> --out-dir=dist [--plugin=<name> ...]
	  cat <file> | decompress --out-dir=dist

	Example
	  decompress --strip 1 --out-dir=dist file.zip
	  decompress --plugin=tarxz --out-dir=dist file.tar.xz
	  cat file.zip | decompress --out-dir=dist

	Options
	  -o, --out-dir  Output directory
	  -p, --plugin   Override the default plugins
	  -s, --strip    Remove leading directory components from extracted files
`, {
	string: [
		'out-dir',
		'plugin',
		'strip'
	],
	alias: {
		o: 'out-dir',
		p: 'plugin',
		s: 'strip'
	}
});

const requirePlugins = plugins => plugins.map(x => {
	try {
		return require(`decompress-${x}`)();
	} catch (err) {
		console.error(stripIndent(`
			Unknown plugin: ${x}

			Did you forgot to install the plugin?
			You can install it with:

			  $ npm install -g decompress-${x}
		`).trim());
		process.exit(1);
	}
});

const run = (input, opts) => {
	opts = Object.assign({}, opts);

	const dest = opts.outDir;
	const plugins = arrify(opts.plugin);

	if (plugins.length) {
		opts.plugins = requirePlugins(plugins);
	}

	delete opts.outDir;
	delete opts.plugin;

	decompress(input, dest, opts);
};

if (!cli.input.length && process.stdin.isTTY) {
	console.error('Specify a file');
	process.exit(1);
}

if (!cli.flags.outDir) {
	console.error('Specify a `--out-dir`');
	process.exit(1);
}

if (cli.input.length) {
	run(cli.input[0], cli.flags);
} else {
	getStdin.buffer().then(buf => run(buf, cli.flags));
}
