# decompress-cli [![Build Status](https://travis-ci.org/kevva/decompress-cli.svg?branch=master)](https://travis-ci.org/kevva/decompress-cli)

> Extracting archives made easy

*See [decompress](https://github.com/kevva/decompress) for the programmatic API and issue tracker.*


## Install

```
$ npm install --global decompress-cli
```


## Usage

```
$ decompress --help

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
```


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
