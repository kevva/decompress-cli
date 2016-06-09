import fs from 'fs';
import execa from 'execa';
import pify from 'pify';
import rimraf from 'rimraf';
import test from 'ava';

test('show help screen', async t => {
	t.regex(await execa.stdout('./cli.js', ['--help']), /Extracting archives made easy/);
});

test('show version', async t => {
	t.is(await execa.stdout('./cli.js', ['--version']), require('./package').version);
});

test('`--out-dir` is mandatory', async t => {
	const err = await t.throws(execa('./cli.js', ['fixture.zip']));
	t.is(err.stderr.trim(), 'Specify a `--out-dir`');
});

test('extract archive', async t => {
	await execa('./cli.js', ['fixture.zip', '--out-dir', 'dist']);
	t.deepEqual(await pify(fs.readdir)('dist'), ['test.jpg']);
	await pify(rimraf)('dist');
});
