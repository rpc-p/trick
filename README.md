# Usage

You can execute `rt -h` to Get simple help

## Command

### Init

Generate default configuration file。

`rt init [outputPath]`

- outputPath

default: `./dev/trick/`

### Build

`rt -c './dev/trick/trick.js' build [version]`

- version

`version` is a designated version。

*e.g.*

We assume the `version` in `trick.js` is **1.0.1.2**

```js
version: '0.0.0.1',
```

excute:

```bash
rt build 5 # v1.0.0.5

rt build # v1.0.0.3

rt build 1.1 # v1.0.1.1

rt build 1.1.1 # v1.1.1.1

rt build 2.1.1.1 # v2.1.1.1
```

### env

Switch environment

`rt -c './dev/trick/trick.js' build [environment]`

`trick.js env` is:

```js
{
  env: {
      environmentVariables: {
        dev: {
          commonHost: 'www.dev.com',
        },
        test: {
          commonHost: 'www.test.com',
        },
        prod: {
          commonHost: 'www.prod.com',
        },
    },
  }
}
```

excute:

```bash
$ rt env

dev ○
test
prod
```

If we do not specify an environment, then a list will be given for you to choose.

Otherwise, the designated environment will be directly selected。

`rt env dev`
