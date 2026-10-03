## Documentation on Scryfall-SDK equivalents for Scryfall routes:

| Query | Result |
| --- | --- |
| [`/cards/named?{fuzzy\|exact}=<card name>(&set=<set code>)`](./DOCUMENTATION.md#cardsbyname-name-string-set-string-fuzzy--false-promisecard-) | Card |
| [`/cards/:id`](./DOCUMENTATION.md#cardsbyid-id-string-promisecard-) | Card |
| [`/cards/:set/:collector_number(/:lang)`](./DOCUMENTATION.md#cardsbyset-setcode-string--set-collectornumber-string--number-lang-string-promisecard-) | Card |
| [`/cards/multiverse/:multiverse_id`](./DOCUMENTATION.md#cardsbymultiverseid-id-number-promisecard-) | Card |
| [`/cards/mtgo/:mtgo_id`](./DOCUMENTATION.md#cardsbymtgoid-id-number-promisecard-) | Card |
| [`/cards/arena/:id`](./DOCUMENTATION.md#cardsbyarenaid-id-number-promisecard-) | Card |
| [`/cards/tcgplayer/:id`](./DOCUMENTATION.md#cardsbytcgplayerid-id-number-promisecard-) | Card |
| [`/cards/cardmarket/:id`](./DOCUMENTATION.md#cardsbycardmarketid-id-number-promisecard-) | Card |
| [`/cards/random(?q=<search query>)`](./DOCUMENTATION.md#cardsrandom-query-string-promisecard-) | Card |
| [`/cards/search?q=<search query>`](./DOCUMENTATION.md#cardssearch-query-string-options-searchoptions--number-magicemittercard-) | MagicEmitter\<Card\> |
| [`/cards/manifest`](./DOCUMENTATION.md#cardsmanifest-options-manifestoptions-magicemittermanifestentry-) | MagicEmitter\<ManifestEntry\> |
| [`/cards/autocomplete?q=<card name>`](./DOCUMENTATION.md#cardsautocompletename-name-string-includeextras-boolean-promisestring-) | string[] |
| [`/cards/collection`](./DOCUMENTATION.md#cardscollection-collection-cardidentifier-magicemittercard-) | MagicEmitter\<Card\> |
| [`/sets`](./DOCUMENTATION.md#setsall--promiseset-) | Set[] |
| [`/sets/:code`](./DOCUMENTATION.md#setsbycode-code-string-promiseset-) | Set |
| [`/sets/:id`](./DOCUMENTATION.md#setsbyid-id-string-promiseset-) | Set |
| [`/sets/tcgplayer/:id`](./DOCUMENTATION.md#setsbytcgplayerid-id-number-promiseset-) | Set |
| [`/cards/multiverse/:id/rulings`](./DOCUMENTATION.md#rulingsbymultiverseid-id-number-promiseruling-) | Ruling[] |
| [`/cards/mtgo/:id/rulings`](./DOCUMENTATION.md#rulingsbymtgoid-id-number-promiseruling-) | Ruling[] |
| [`/cards/arena/:id/rulings`](./DOCUMENTATION.md#rulingsbyarenaid-id-number-promiseruling-) | Ruling[] |
| [`/cards/:code/:number/rulings`](./DOCUMENTATION.md#rulingsbyset-code-string-collectornumber-string--number-promiseruling-) | Ruling[] |
| [`/cards/:id/rulings`](./DOCUMENTATION.md#rulingsbyid-id-string-promiseruling-) | Ruling[] |
| [`/symbology`](./DOCUMENTATION.md#symbologyall--promisecardsymbol-) | CardSymbol[] |
| [`/symbology/parse-mana?cost=<shorthand mana cost>`](./DOCUMENTATION.md#symbologyparsemana-mana-string-promisemanacost-) | ManaCost |
| [`/catalog/card-names`](./DOCUMENTATION.md#catalogcardnames--promisestring-) | string[] |
| [`/catalog/artist-names`](./DOCUMENTATION.md#catalogartistnames--promisestring-) | string[] |
| [`/catalog/word-bank`](./DOCUMENTATION.md#catalogwordbank--promisestring-) | string[] |
| [`/catalog/creature-types`](./DOCUMENTATION.md#catalogcreaturetypes--promisestring-) | string[] |
| [`/catalog/planeswalker-types`](./DOCUMENTATION.md#catalogplaneswalkertypes--promisestring-) | string[] |
| [`/catalog/land-types`](./DOCUMENTATION.md#cataloglandtypes--promisestring-) | string[] |
| [`/catalog/artifact-types`](./DOCUMENTATION.md#catalogartifacttypes--promisestring-) | string[] |
| [`/catalog/enchantment-types`](./DOCUMENTATION.md#catalogenchantmenttypes--promisestring-) | string[] |
| [`/catalog/spell-types`](./DOCUMENTATION.md#catalogspelltypes--promisestring-) | string[] |
| [`/catalog/powers`](./DOCUMENTATION.md#catalogpowers--promisestring-) | string[] |
| [`/catalog/toughnesses`](./DOCUMENTATION.md#catalogtoughnesses--promisestring-) | string[] |
| [`/catalog/loyalties`](./DOCUMENTATION.md#catalogloyalties--promisestring-) | string[] |
| [`/catalog/watermarks`](./DOCUMENTATION.md#catalogwatermarks--promisestring-) | string[] |
| [`/catalog/keyword-abilities`](./DOCUMENTATION.md#catalogkeywordabilities--promisestring-) | string[] |
| [`/catalog/keyword-actions`](./DOCUMENTATION.md#catalogkeywordactions--promisestring-) | string[] |
| [`/catalog/ability-words`](./DOCUMENTATION.md#catalogabilitywords--promisestring-) | string[] |
| [`/catalog/supertypes`](./DOCUMENTATION.md#catalogsupertypes--promisestring-) | string[] |
| [`/catalog/battle-types`](./DOCUMENTATION.md#catalogbattletypes--promisestring-) | string[] |
| [`/catalog/flavor-words`](./DOCUMENTATION.md#catalogflavorwords--promisestring-) | string[] |
| [`/catalog/card-types`](./DOCUMENTATION.md#catalogcardtypes--promisestring-) | string[] |
| [`/bulk-data`](./DOCUMENTATION.md#bulkdatadefinitions--promisebulkdatadefinition-) | BulkDataDefinition[] |
| [`/bulk-data/:type`](./DOCUMENTATION.md#bulkdatadefinitionbytype-type-bulkdatatype-promisebulkdatadefinition-) | BulkDataDefinition |
| [`/bulk-data/:id`](./DOCUMENTATION.md#bulkdatadefinitionbyid-id-string-promisebulkdatadefinition-) | BulkDataDefinition |
| [`/migrations(?page=<number>)`](./DOCUMENTATION.md#migrationsall-page-number-magicemittermigration-) | MagicEmitter\<Migration\> |
| [`/migrations/:id`](./DOCUMENTATION.md#migrationsbyid-id-string-promisemigration-) | Migration |
