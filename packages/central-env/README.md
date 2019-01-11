# centralenv

Source will be on Github soon... (when finish separating from monorepo)

- [Motivation](#motivation)
- [Documentation](#documentation)
  - [Install](#install)
  - [Usage:](#usage)
    - [Simple](#simple)
    - [Multiple Stages: `centralenv`](#multiple-stages-centralenv)
- [Todo](#todo)

## Motivation

That's just I wanted this function.

## Documentation

NOTE:

- **`centralenv` overwrite output file. You will lost your data if output file already exist.**
- `centralenv` is not tested. Please use at your own risk.
- Might not work on Windows. Please let me know if it works or not, since I don't have one.

### Install

```sh
npm i centralenv -D
yarn add -D centralenv
```

### Usage:

Options:

| options             | Column B                                       |
| ------------------- | ---------------------------------------------- |
| -p, --projectName   | .env.\<projectName\>.\<stage\>                 |
| -h, --help          | Show help                                      |
| --sourceFile        | [default: ".env"]                              |
| --sourceDir         | [default: "$HOME"]                             |
| -k, --keySourceFile | [default: ".env.example"]                      |
| -s, --stages        | [default: ["development","production","test"]] |

#### Simple

- `centralenv -s` =>
  - .env

- Source file `${sourceDir}/${sourceFile}` => default: $HOME/.env

```dotenv
NAME=UNCHI
EMOJI=💩
CONDITION=VERY_GOOD
PRICE=1010000$
```

- \<projectRoot\>/.env.sample

```dotenv
NAME=N
EMOJI=
CONDITION=?
PRICE=100
NOT_EXISTING_KEY=SomeValue
```

- => \<projectRoot\>/.env

```dotenv
NAME=UNCHI
EMOJI=💩
CONDITION=VERY_GOOD
PRICE=1010000$
NOT_EXISTING_KEY=
```

#### Multiple Stages: `centralenv`

- `centralenv` =>
  - output
    - .env.development
    - .env.production
    - .env.test
- `centralenv -s dev -s prod -s someother` =>
  - output
    - .env.dev
    - .env.prod
    - .env.someother


## Todo

- [x] basic functions
- [x] support stages ['development', 'production', 'test']
- [x] command line args
- [ ] log output, by relative path, from project root.
- [ ] generate publish script, to avoid unnecessary devDependencies to be installed.
- [ ] prefix ( eg: "API_SERVER_" )
- [ ] encryption / decryption
- [ ] connect git repo ( using as source with encryption, like fastlane )


