# hitchy-plugin-cookies

[![Build Status](https://travis-ci.org/hitchyjs/plugin-cookies.svg?branch=master)](https://travis-ci.org/hitchyjs/plugin-cookies)

## License

MIT

## Usage

In your [Hitchy-based](https://hitchyjs.github.io/) application run
 
```
npm install --save hitchy-plugin-cookies
```

After restarting the extension should be discovered. It is automatically injecting new policy parsing every request's header for provided cookies exposing them in `req.cookies` in any succeeding policy or terminal route's handler.
