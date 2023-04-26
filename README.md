This is a lightweight npm library designed to validate SQL injection attacks in user input
![npm version](https://img.shields.io/npm/v/input-validator?color=green&label=npm&style=flat-square)
![size](https://img.shields.io/bundlephobia/min/joi-sql-injector-validator)

# joi-sql-injector-validator
> Joi SQL Injection Validator is a lightweight npm library designed to validate SQL injection attacks in user input using Joi, a popular validation library for Node.js. This library provides a set of pre-built Joi validation schemas for various types of user input such as strings, numbers, dates, and arrays that can be easily integrated into any Node.js project.

## Prerequisites

This project requires NodeJS (version 8 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.4.1
v8.16.0
```

## Getting Started

These instructions will help you to install this package in your project to perform data validation.

## How to use

> This **joi-sql-injector-validator** package includes all available validation method which is available here 
JOI Official doc at - https://joi.dev/api/  
along with more powerful validation sqlInjectionFilter() for avoiding SQL Injection attacks

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

Start with installation of package in your project:

```sh
$ cd PROJECT
$ npm i joi-sql-injector-validator
```

After successful installation of package you need to import package in your file:
To import complete package in once

```sh
$ import JOI from 'joi-sql-injector-validator';
```
## SQL Injection validation example

```tsx
const Joi = = require("joi-sql-injector-validator");

const schema = Joi.object()
  .keys({
    name: Joi.string()
    .sqlInjectionFilter()
      .min(3)
      .max(40)
      .required(),
    age: Joi.number()
      .integer()
      .min(16)
  });

  const {
    error
  } = schema.validate({name:"test OR 1=1; DROP users;", age:15});
  if (error) {
    //It will give error "String shouldn't contain any SQL injection commands"
   console.log("validation error", error.details)
  } else {
    console.log("validation passed")
  }
```


## Other Examples

```tsx
import JOI from 'joi-sql-injector-validator';

const schema = JOI.object({
    username: JOI.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: JOI.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: JOI.ref('password'),

    access_token: [
        JOI.string(),
        JOI.number()
    ],

    birth_year: JOI.number()
        .integer()
        .min(1900)
        .max(2013),

    email: JOI.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
    .with('username', 'birth_year')
    .xor('password', 'access_token')
    .with('password', 'repeat_password');


schema.validate({ username: 'abc', birth_year: 1994 });
// -> { value: { username: 'abc', birth_year: 1994 } }

schema.validate({});
// -> { value: {}, error: '"username" is required' }

// Also -

try {
    const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
}
catch (err) { }
```

## Other example
```tsx
const Joi = = require("joi-sql-injector-validator");

const schema = Joi.object()
  .keys({
    name: Joi.string()
      .min(3)
      .max(40)
      .required(),
    age: Joi.number()
      .integer()
      .min(16)
  });

  const {
    error
  } = schema.validate({name:"test", age:15});
  if (error) {
   console.log("validation error", error.details)
  } else {
    console.log("validation passed")
  }
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request :sunglasses:

## Credits
All credit goes to me:sunglasses: 

## Built With

* Love

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Saimul Hasnain** - *Initial work* - [Saimul Hasnain](https://github.com/saimulhasnain-dev)

