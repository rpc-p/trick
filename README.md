# Usage

You can execute `rt -h` to Get simple help

## Command

- init

`rt init`

Generate default configuration file

- Packaged

`rt cs [version]`

`version` is a designated version

*ex*

We assume the `version` in `package.json` is **1.0.1**

and the `minorversion` in `trick.json` is **1**

excute:

```bash
rt cs 3
```

The result is:

`v1.0.1.3`

if `version` is empty

```bash
rt cs
```

That Will add 1 on the original basis that `minorversion` in the `trick.json`.

The result is:

`v1.0.1.2`

- Switch environment

`rt env`

When you execute this command, you can choose a environment that `env` `test` and `prod`.

Execution results according to your configuration in the `trick.json`.

- Switch major version

`rt v [version]`

this is a duplicate of `npm version`
