# [Hitchy](https://core.hitchy.org) has [moved its repositories](https://gitlab.com/hitchy) incl. [this one](https://gitlab.com/hitchy/plugin-cookies).

---

# hitchy-plugin-cookies

[![Build Status](https://travis-ci.org/hitchyjs/plugin-cookies.svg?branch=master)](https://travis-ci.org/hitchyjs/plugin-cookies)

## License

MIT

## Usage

In your [Hitchy-based](https://hitchyjs.github.io/) application run
 
```
npm install --save hitchy-plugin-cookies
```

After restarting your application the plugin should be discovered. It is automatically injecting new policy parsing every request's header for provided cookies exposing them in [`req.cookies`](https://hitchyjs.github.io/core/api/#req-cookies) in handlers of any succeeding policy or controller.
