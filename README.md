# scryfall-sdk-updated

[![version](https://img.shields.io/npm/v/scryfall-sdk-updated?style=for-the-badge&logo=npm&logoColor=white&label=version)](https://www.npmjs.com/package/scryfall-sdk-updated)
[![downloads](https://img.shields.io/npm/dm/scryfall-sdk-updated?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/scryfall-sdk-updated)
[![CI](https://img.shields.io/github/actions/workflow/status/fast-facts/scryfall-sdk/main.cron.publish.yml?branch=main&style=for-the-badge&logo=github&logoColor=white&label=CI)](https://github.com/fast-facts/scryfall-sdk/actions/workflows/main.cron.publish.yml)
[![CodeQL](https://img.shields.io/github/actions/workflow/status/fast-facts/scryfall-sdk/main.cron.code-analyze.yml?branch=main&style=for-the-badge&logo=github&logoColor=white&label=CodeQL)](https://github.com/fast-facts/scryfall-sdk/actions/workflows/main.cron.code-analyze.yml)
[![license](https://img.shields.io/github/license/fast-facts/scryfall-sdk?style=for-the-badge)](./LICENSE)

A Node.js SDK for [Scryfall](https://scryfall.com/docs/api) written in Typescript.

Covers the card, set, ruling, symbology, catalog, bulk data, and migration endpoints in the [Scryfall documentation](https://scryfall.com/docs/api). If something is missing, make an issue!


## Installation

```bat
npm install scryfall-sdk-updated
```

Needs Node.js 22 or newer.


## Basic Example Usage
```ts
import * as Scry from "scryfall-sdk-updated";

// ...in some function somewhere...
const chalice = await Scry.Cards.byName("Chalice of the Void");
console.log(chalice.name, chalice.set); // "Chalice of the Void", "a25"

const prints = await chalice.getPrints();
console.log(prints.length); // 7
```

> [!IMPORTANT]  
> Scryfall [requires](https://scryfall.com/docs/api#required-headers) that all applications provide an agent, except if they are executing from web browser JavaScript.
>
> If this is true for your application, you must set your agent before making any requests:
> ```ts
> Scry.setAgent("MyAmazingAppName", "1.0.0");
> ```

## [Full Documentation](./DOCUMENTATION.md)
scryfall-sdk-updated covers the Scryfall JSON endpoints, and also paginates through results and downloads bulk data streams. It does not wrap text, CSV, or image redirects. See the [documentation](./DOCUMENTATION.md) for information on everything you can do.

Know the endpoint you want, but not sure what it looks like in scryfall-sdk-updated? Well, you're in luck: [Scryfall-SDK Equivalents for Scryfall Routes](./ROUTES.md)


## Contributing

Thanks for wanting to help out! Here's the setup you'll have to do:
```bat
git clone https://github.com/fast-facts/scryfall-sdk
cd scryfall-sdk
npm install
```
You can now make changes to the repository. 

To compile:
```bat
npm run build
```
To compile on every file change:
```bat
npm run watch
```
To test:
```bat
npm test
```


## MIT License

[Copyright 2017-2024 Chiri Vulpes](./LICENSE)
