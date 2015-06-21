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
    $ decompress <file> [directory]
    $ cat <file> | decompress [directory]

  Example
    $ decompress --strip 1 file.zip out
    $ cat file.zip | decompress out

  Options
    -m, --mode     Set mode on the extracted files
    -s, --strip    Equivalent to --strip-components for tar
```


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
