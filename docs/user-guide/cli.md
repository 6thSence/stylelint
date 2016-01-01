---
layout: page
title: CLI
permalink: docs/user-guide/cli/
---

# The stylelint CLI

`stylelint --help` prints the following documentation:

```
Modern CSS linter

Usage
  stylelint [input] [options]

Examples
  stylelint stylesheets/*.css
  stylelint 'css/**/*.css' '!**/legacy.css' --quiet

By default, stylelint will look for a .stylelintrc file in JSON format,
using rc to look in various places (cf. https://github.com/dominictarr/rc#standards).
Alternately, you can specify a configuration file via --config.

Input
  File(s) or glob(s).
  Wrap globs in quotation marks to pass them to node-glob,
  for extra features like the globstar (**) and negation (!).
  You can also pass no input and use stdin.

Options
  --config            Path to a JSON configuration file.
  --version           Get the currently installed version of stylelint.
  --custom-formatter  Path to a JS file exporting a custom formatting function
  -f, --formatter     Specify a formatter: "json" or "string". Default is "string".
  -q, --quiet         Only register warnings for rules with an \"error\"-level severity
                      (ignore \"warning\"-level)  
  -s, --syntax        Specify a non-standard syntax that should be used to
                      parse source stylesheets. Options: "scss"
```

The CLI outputs formatted results into `process.stdout`, which you can read with your human eyes or pipe elsewhere (e.g. write the information to a file).

## Usage examples

Looking for `.stylelintrc` and linting all `.css` files in the `foo` directory:  

```bash
stylelint foo/*.css
```

Looking for `.stylelintrc` and linting `stdin`:

```bash
echo "a { color: pink; }" | stylelint
```

Using `bar/mySpecialConfig.json` as config to lint all `.css` files in the `foo` directory, then writing the output to `myTestReport.txt`:

```bash
stylelint foo/*.css --config bar/mySpecialConfig.json > myTestReport.txt
```

Using `bar/mySpecialConfig.json` as config, with quiet mode on, to lint all `.css` files in the `foo` directory and any of its subdirectories and also all `.css` files in the `bar directory`, then writing the JSON-formatted output to `myJsonReport.json`:

```bash
stylelint foo/**/*.css bar/*.css -q -f json --config bar/mySpecialConfig.json > myJsonReport.json
```

## Exit codes

The CLI can exit the process with the following exit codes:

- 1: Something unknown went wrong.
- 2: At least one rule with an "error"-level severity triggered at least one warning.
- 78: There was some problem with the configuration file.
- 80: A file glob was passed both it found no files.
