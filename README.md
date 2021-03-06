# memory-ui (v1.0.0)

A Memory game based on Angular playable locally or over network while the latter needs [memory-server](https://github.com/deadratfink/memory-server).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## TOC

- [Prerequisites](#prerequisites)
  - [1. Install Node.js](#1-install-nodejs)
  - [2. Install Brew](#2-install-brew)
  - [3. Install Yarn](#3-install-yarn)
  - [4. Install Dependencies](#4-install-dependencies)
- [Development server](#development-server)
- [Code scaffolding](#code-scaffolding)
- [Build](#build)
- [Running unit tests](#running-unit-tests)
- [Running end-to-end tests](#running-end-to-end-tests)
- [Further help](#further-help)
- [Further information](#further-information)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.0.

## Prerequisites

Pls ensure that the following requirements are fulfilled before you go ahead with [Setup](#setup) section.

### 1. Install Node.js

To use node.js it is recomended to have [nvm](https://github.com/nvm-sh/nvm) installed. Afterwards, you can
install the required node version (for this project we need v10):

```text
$ nvm install 10
```

### 2. Install Brew

To install yarn you need [brew](https://brew.sh/) to be installed before.

### 3. Install Yarn

Install [yarn](https://yarnpkg.com/en/docs/install#mac-stable).

### 4. Install Dependencies

```text
$ make install
```

## Development server

Run `make start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `make build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `make test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `make e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Further information

- [Module Details](./PACKAGE.md)

- [Makefile Reference](./MAKE.md)

- [Changelog](./CHANGELOG.md)

- [License](./LICENSE.md)

