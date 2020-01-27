<p align="center">
 <img width="20%" height="20%" src="./logo.svg">
</p>

<br />

[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
[![ngneat](https://img.shields.io/badge/@-ngneat-383636?style=flat-square&labelColor=8f68d4)](https://github.com/ngneat/)
[![spectator](https://img.shields.io/badge/tested%20with-spectator-2196F3.svg?style=flat-square)]()

> Various RxJS utilities

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

### NPM

`npm install @ngspot/rxjs --save-dev`

### Yarn

`yarn add @ngspot/rxjs --dev`

## Usage

### @Share()

This decorator comes handy when you expect a function that returns a completable observable to share that observable for a unique set of parameters of the function.

In the example below only 2 http network requests will be made.

```ts
import { Share } from '@ngneat/rxjs/decorators';

class MyApi {
  constructor(private http: HttpClient) {}

  @Share()
  makeCall(param1: number, param2: number) {
    return this.http.get(`/api/${param1}/${param2}`);
  }
}

class BusinessLogic {
  constructor(private api: MyApi) {
    api.makeCall(1, 2).subscribe();
    api.makeCall(1, 2).subscribe();
    api.makeCall(1, 3).subscribe();
  }
}
```

There might be a use-case when you'd want to disable the functionality of `@Share` decorator based on the function arguments.
To achieve this you can provide the `when` option to specify the condition when the observable should be shared:

In the example below the observable will only be shared when the `param1` is not equal to `param2`.

```ts
@Share({ when: (param1, param2) => param1 !== param2 })
makeCall(param1: number, param2: number) {
  return this.http.get(`/api/${param1}/${param2}`);
}
```
The context of the `when` callback function is the context of the class instance. The signature of the of `when` callback has the same signature as the method that the decorator is applied to.

With the implementation above, two HTTP requests will be made in the example below:
```ts
class BusinessLogic {
  constructor(private api: MyApi) {
    api.makeCall(1, 1).subscribe();
    api.makeCall(1, 1).subscribe();
  }
}
```


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
