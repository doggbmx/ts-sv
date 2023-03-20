# Installation
> `npm install --save @types/passport-local`

# Summary
This package contains type definitions for passport-local (https://github.com/jaredhanson/passport-local).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/passport-local.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/passport-local/index.d.ts)
````ts
// Type definitions for passport-local 1.0.0
// Project: https://github.com/jaredhanson/passport-local
// Definitions by: Maxime LUCE <https://github.com/SomaticIT>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

/// <reference types="passport"/>

import { Strategy as PassportStrategy } from 'passport-strategy';
import express = require('express');

interface IStrategyOptions {
    usernameField?: string | undefined;
    passwordField?: string | undefined;
    session?: boolean | undefined;
    passReqToCallback?: false | undefined;
}

interface IStrategyOptionsWithRequest {
    usernameField?: string | undefined;
    passwordField?: string | undefined;
    session?: boolean | undefined;
    passReqToCallback: true;
}

interface IVerifyOptions {
    message: string;
}

interface VerifyFunctionWithRequest {
    (
        req: express.Request,
        username: string,
        password: string,
        done: (error: any, user?: Express.User | false, options?: IVerifyOptions) => void,
    ): void;
}

interface VerifyFunction {
    (
        username: string,
        password: string,
        done: (error: any, user?: Express.User | false, options?: IVerifyOptions) => void,
    ): void;
}

declare class Strategy extends PassportStrategy {
    constructor(options: IStrategyOptionsWithRequest, verify: VerifyFunctionWithRequest);
    constructor(options: IStrategyOptions, verify: VerifyFunction);
    constructor(verify: VerifyFunction);

    name: string;
}

````

### Additional Details
 * Last updated: Sat, 07 Jan 2023 10:02:43 GMT
 * Dependencies: [@types/express](https://npmjs.com/package/@types/express), [@types/passport](https://npmjs.com/package/@types/passport), [@types/passport-strategy](https://npmjs.com/package/@types/passport-strategy)
 * Global values: none

# Credits
These definitions were written by [Maxime LUCE](https://github.com/SomaticIT).
