import { Color, ColorOrColorless, RESOURCE_GENERIC_CARD_BACK, SYMBOL_COST, SYMBOL_PRINTS, SYMBOL_RULINGS, SYMBOL_SET, SYMBOL_TEXT } from '../IScry';
import { Cached } from '../util/Cached';
import MagicEmitter from '../util/MagicEmitter';
import MagicQuerier, { ApiCatalog, List, TOrArrayOfT } from '../util/MagicQuerier';
import cards from './Cards';
import Rulings, { Ruling } from './Rulings';
import Sets, { Set } from './Sets';

export enum UniqueStrategy {
  cards,
  art,
  prints,
}

export enum Sort {
  name,
  set,
  released,
  rarity,
  color,
  usd,
  tix,
  eur,
  cmc,
  power,
  toughness,
  edhrec,
  artist,
  penny,
  review,
}

export enum SortDirection {
  auto,
  asc,
  desc,
}

export interface SearchOptions {
  unique?: keyof typeof UniqueStrategy;
  order?: keyof typeof Sort;
  dir?: keyof typeof SortDirection;
  include_extras?: boolean;
  include_multilingual?: boolean;
  include_variations?: boolean;
  page?: number;
}

export interface ManifestOptions {
  lang?: string;
  order?: 'released' | 'imageupdated';
  page?: number;
}

export interface ManifestEntry {
  id: string;
  oracle_id: string | null;
  name: string;
  set_code: string;
  collector_number: string;
  lang: string;
  created_at: string;
  data_updated_at: string;
  image_updated_at: string | null;
}

export enum Rarity {
  common,
  uncommon,
  rare,
  special,
  mythic,
  bonus,
}

export enum FrameEffect {
  legendary,
  miracle,
  nyxtouched,
  draft,
  devoid,
  tombstone,
  colorshifted,
  inverted,
  sunmoondfc,
  compasslanddfc,
  originpwdfc,
  mooneldrazidfc,
  moonreversemoondfc,
  showcase,
  extendedart,
  companion,
  etched,
  snow,
  lesson,
  shatteredglass,
  convertdfc,
  fandfc,
  upsidedowndfc,
}

export enum Game {
  paper,
  arena,
  mtgo,
}

export enum Legality {
  legal,
  not_legal,
  restricted,
  banned,
}

export enum Border {
  black,
  borderless,
  gold,
  silver,
  white,
}

export enum Layout {
  normal,
  split,
  flip,
  transform,
  modal_dfc,
  meld,
  leveler,
  saga,
  adventure,
  planar,
  scheme,
  vanguard,
  token,
  double_faced_token,
  emblem,
  augment,
  host,
  art_series,
  double_sided,
}

export enum Format {
  standard,
  future,
  historic,
  gladiator,
  pioneer,
  explorer,
  modern,
  legacy,
  pauper,
  vintage,
  penny,
  commander,
  oathbreaker,
  brawl,
  historicbrawl,
  alchemy,
  paupercommander,
  duel,
  premodern,
  oldschool,
}

export type Legalities = {
  [key in keyof typeof Format]: keyof typeof Legality;
};

export interface ImageUris {
  small: string;
  normal: string;
  large: string;
  png: string;
  art_crop: string;
  border_crop: string;
}

export interface Prices {
  usd?: string | null;
  usd_foil?: string | null;
  usd_etched?: string | null;
  eur?: string | null;
  eur_foil?: string | null;
  tix?: string | null;
}

export interface PurchaseUris {
  tcgplayer?: string | null;
  cardmarket?: string | null;
  cardhoarder?: string | null;
  [key: string]: string | null | undefined;
}

export interface RelatedUris {
  gatherer?: string | null;
  tcgplayer_decks?: string | null;
  tcgplayer_infinite_decks?: string | null;
  tcgplayer_infinite_articles?: string | null;
  edhrec?: string | null;
  mtgtop8?: string | null;
  [key: string]: string | null | undefined;
}

export enum RelatedCardComponent {
  token,
  meld_part,
  meld_result,
  combo_piece,
}

const SYMBOL_CARD = Symbol('CARD');

export class RelatedCard {
  object: 'related_card';

  id: string;
  component: keyof typeof RelatedCardComponent;
  name: string;
  type_line: string;
  uri: string;

  /**
   * Turns plain related-card data into a RelatedCard.
   * @param card The related-card data to use.
   */
  public static construct(card: RelatedCard) {
    Object.setPrototypeOf(card, RelatedCard.prototype);
    return card;
  }

  private [SYMBOL_CARD]?: Card;
  public async get() {
    return this[SYMBOL_CARD] ??= await cards.byId(this.id);
  }
}

interface CardFaceMethods {
  getText (): string | null | undefined;
  getCost (): string | null | undefined;
  /**
   * Returns the image link for this face at the given size.
   * @param version The image size to return.
   */
  getImageURI (version: keyof ImageUris): string | null | undefined;
}

export interface CardFace extends CardFaceMethods {
  object: 'card_face';

  artist?: string | null;
  artist_id?: string | null;
  cmc?: number | null;
  color_indicator?: Color[] | null;
  colors?: Color[] | null;
  defense?: string | null;
  flavor_text?: string | null;
  illustration_id?: string | null;
  image_uris?: ImageUris | null;
  layout?: string | null;
  loyalty?: string | null;
  mana_cost?: string | null;
  name: string;
  oracle_id?: string | null;
  oracle_text?: string | null;
  power?: string | null;
  printed_name?: string | null;
  printed_text?: string | null;
  printed_type_line?: string | null;
  toughness?: string | null;
  type_line?: string | null;
  watermark?: string | null;
}

export interface Preview {
  previewed_at?: string | null;
  source_uri?: string | null;
  source?: string | null;
}

export enum PromoType {
  alchemy,
  arenaleague,
  beginnerbox,
  boosterfun,
  boxtopper,
  brawldeck,
  bringafriend,
  bundle,
  buyabox,
  commanderparty,
  concept,
  confettifoil,
  convention,
  datestamped,
  dossier,
  doubleexposure,
  doublerainbow,
  draculaseries,
  draftweekend,
  duels,
  embossed,
  event,
  fnm,
  fracturefoil,
  galaxyfoil,
  gameday,
  giftbox,
  gilded,
  glossy,
  godzillaseries,
  halofoil,
  imagine,
  instore,
  intropack,
  invisibleink,
  jpwalker,
  judgegift,
  league,
  magnified,
  manafoil,
  mediainsert,
  moonlitland,
  neonink,
  oilslick,
  openhouse,
  planeswalkerdeck,
  plastic,
  playerrewards,
  playpromo,
  playtest,
  portrait,
  poster,
  premiereshop,
  prerelease,
  promopack,
  rainbowfoil,
  raisedfoil,
  ravnicacity,
  rebalanced,
  release,
  resale,
  ripplefoil,
  schinesealtart,
  scroll,
  serialized,
  setextension,
  setpromo,
  silverfoil,
  sldbonus,
  stamped,
  startercollection,
  starterdeck,
  stepandcompleat,
  storechampionship,
  surgefoil,
  textured,
  themepack,
  thick,
  tourney,
  upsidedown,
  upsidedownback,
  vault,
  wizardsplaynetwork,
}

export enum CardFinish {
  foil,
  nonfoil,
  etched,
  glossy,
}

export const CardFrame = {
  1993: 0,
  1997: 1,
  2003: 2,
  2015: 3,
  Future: 4,
};

export enum CardStatus {
  missing,
  placeholder,
  lowres,
  highres_scan,
}

export enum CardSecurityStamp {
  oval,
  triangle,
  acorn,
  circle,
  arena,
  heart,
}

export interface CardIdentifier {
  id?: string;
  mtgo_id?: number;
  multiverse_id?: number;
  oracle_id?: string;
  illustration_id?: string;
  name?: string;
  set?: string;
  collector_number?: string;
}

export const CardIdentifier = {
  /**
   * Builds a card identifier from a Scryfall id.
   * @param id The Scryfall id of the card.
   */
  byId(id: string): CardIdentifier {
    return { id };
  },

  /**
   * Builds a card identifier from a Magic Online id.
   * @param id The Magic Online id of the card.
   */
  byMtgoId(id: number): CardIdentifier {
    return { mtgo_id: id };
  },

  /**
   * Builds a card identifier from a Multiverse id.
   * @param id The Multiverse id of the card.
   */
  byMultiverseId(id: number): CardIdentifier {
    return { multiverse_id: id };
  },

  /**
   * Builds a card identifier from an Oracle id.
   * @param id The Oracle id of the card.
   */
  byOracleId(id: string): CardIdentifier {
    return { oracle_id: id };
  },

  /**
   * Builds a card identifier from an illustration id.
   * @param id The illustration id of the card.
   */
  byIllustrationId(id: string): CardIdentifier {
    return { illustration_id: id };
  },

  /**
   * Builds a card identifier from a name, and an optional set.
   * @param name The name of the card.
   * @param set The set code, if you want one printing.
   */
  byName(name: string, set?: string): CardIdentifier {
    return { name, set };
  },

  /**
   * Builds a card identifier from a set and collector number.
   * @param set The set code of the card.
   * @param collectorNumber The collector number of the card.
   */
  bySet(set: string, collectorNumber: string | number): CardIdentifier {
    return { collector_number: `${collectorNumber}`, set };
  },
};

export type SymbologyTransformer = (type: string, type2?: string) => string;
let symbologyTransformer: SymbologyTransformer | string | undefined;
const REGEX_SYMBOLOGY = /{([a-z]|\d+)(?:\/([a-z]))?}/gi;

function transform(self: Card,
  key: keyof { [KEY in keyof Card as Card[KEY] extends string | null | undefined ? KEY : never]: any },
  map: WeakMap<SymbologyTransformer, string>) {
  const text = self[key];
  const transformer = symbologyTransformer;
  if (!text || !transformer)
    return text;

  if (typeof transformer === 'string')
    return text.replace(REGEX_SYMBOLOGY, transformer);

  const value = map.get(transformer);
  if (value)
    return value;

  const transformed = text.replace(REGEX_SYMBOLOGY, (_: string, type1: string, type2?: string) => transformer(type1, type2 ?? ''));
  map.set(transformer, transformed);
  return transformed;
}

export type Modifier = `+${bigint}` | `-${bigint}`;

export type AttractionLight = 1 | 2 | 3 | 4 | 5 | 6;

export class Card implements CardFaceMethods {
  object: 'card';

  // core fields
  arena_id?: number | null;
  id: string;
  lang: string;
  mtgo_id?: number | null;
  mtgo_foil_id?: number | null;
  multiverse_ids?: number[] | null;
  tcgplayer_id?: number | null;
  tcgplayer_etched_id?: number | null;
  cardmarket_id?: number | null;
  oracle_id: string;
  layout: keyof typeof Layout;
  prints_search_uri: string;
  rulings_uri: string;
  scryfall_uri: string;
  uri: string;

  // gameplay fields
  all_parts?: RelatedCard[] | null;
  card_faces: CardFace[];
  cmc: number;
  color_identity: Color[];
  color_indicator?: Color[] | null;
  colors?: Color[] | null;
  edhrec_rank?: number | null;
  hand_modifier?: Modifier | null;
  keywords: string[];
  legalities: Legalities;
  life_modifier?: Modifier | null;
  loyalty?: string | null;
  mana_cost?: string | null;
  name: string;
  oracle_text?: string | null;
  penny_rank?: number | null;
  power?: string | null;
  produced_mana?: ColorOrColorless[] | null;
  reserved: boolean;
  toughness?: string | null;
  type_line: string;

  // print fields
  artist?: string | null;
  artist_ids?: string[] | null;
  attraction_lights?: AttractionLight[] | null;
  booster: boolean;
  border_color: keyof typeof Border;
  card_back_id: string;
  collector_number: string;
  content_warning?: boolean | null;
  digital: boolean;
  finishes: (keyof typeof CardFinish)[];
  flavor_name?: string | null;
  flavor_text?: string | null;
  frame_effects?: (keyof typeof FrameEffect)[] | null;
  frame: keyof typeof CardFrame;
  full_art: boolean;
  games: (keyof typeof Game)[];
  highres_image: boolean;
  illustration_id?: string | null;
  image_status: keyof typeof CardStatus;
  image_uris?: ImageUris | null;
  oversized: boolean;
  prices: Prices;
  printed_name?: string | null;
  printed_text?: string | null;
  printed_type_line?: string | null;
  promo: boolean;
  promo_types?: (keyof typeof PromoType)[] | null;
  purchase_uris?: PurchaseUris | null;
  rarity: keyof typeof Rarity;
  related_uris: RelatedUris;
  released_at: string;
  reprint: boolean;
  scryfall_set_uri: string;
  set_name: string;
  set_search_uri: string;
  set_type: Set['set_type'];
  set_uri: string;
  set: string;
  set_id: string;
  story_spotlight: boolean;
  textless: boolean;
  variation: boolean;
  variation_of?: string | null;
  security_stamp?: (keyof typeof CardSecurityStamp)[] | null;
  watermark?: string | null;
  preview?: Preview | null;

  /**
   * Turns plain card data into a Card.
   * @param card The card data to use.
   */
  public static construct(card: Card) {
    Object.setPrototypeOf(card, Card.prototype);

    if (!card.card_faces)
      card.card_faces = [{ object: 'card_face' } as CardFace];

    for (const face of card.card_faces)
      Object.setPrototypeOf(face, card);

    card.all_parts?.forEach(RelatedCard.construct);

    return card;
  }

  private [SYMBOL_SET]?: Set;
  public async getSet() {
    return this[SYMBOL_SET] ??= await Sets.byId(this.set);
  }

  private [SYMBOL_RULINGS]?: Ruling[];
  public async getRulings() {
    return this[SYMBOL_RULINGS] ??= await Rulings.byId(this.id);
  }

  private [SYMBOL_PRINTS]?: Card[];
  public async getPrints() {
    if (!this[SYMBOL_PRINTS]) {
      this[SYMBOL_PRINTS] = await cards.search(`oracleid:${this.oracle_id}`, { unique: 'prints' })
        .waitForAll();

      for (const card of this[SYMBOL_PRINTS]!) {
        card[SYMBOL_SET] ??= this[SYMBOL_SET];
        card[SYMBOL_RULINGS] ??= this[SYMBOL_RULINGS];
        card[SYMBOL_PRINTS] ??= this[SYMBOL_PRINTS];
      }
    }

    return this[SYMBOL_PRINTS]!;
  }

  public getTokens() {
    return !this.all_parts
? []
      : this.all_parts.filter(part => part.component === 'token');
  }

  /**
   * @param format The format to check.
   * @returns `true` if this card is `legal` or `restricted` in the given format.
   */
  public isLegal(format: keyof typeof Format) {
    return this.legalities[format] === 'legal' || this.legalities[format] === 'restricted';
  }

  /**
   * @param format The format to check.
   * @returns `true` if this card is `not_legal` or `banned` in the given format.
   */
  public isIllegal(format: keyof typeof Format) {
    return this.legalities[format] === 'not_legal' || this.legalities[format] === 'banned';
  }

  private [SYMBOL_TEXT]: WeakMap<SymbologyTransformer, string>;
  /**
   * @returns The `oracle_text` of this card, with symbols transformed by the transformer as set by @see {@link Cards.setSymbologyTransformer}
   */
  public getText() {
    if (!Object.prototype.hasOwnProperty.call(this, SYMBOL_TEXT))
      this[SYMBOL_TEXT] = new WeakMap();

    return transform(this, 'oracle_text', this[SYMBOL_TEXT]);
  }

  private [SYMBOL_COST]: WeakMap<SymbologyTransformer, string>;
  /**
   * @returns The `mana_cost` of this card, with symbols transformed by the transformer as set by @see {@link Cards.setSymbologyTransformer}
   */
  public getCost() {
    if (!Object.prototype.hasOwnProperty.call(this, SYMBOL_COST))
      this[SYMBOL_COST] = new WeakMap();

    return transform(this, 'mana_cost', this[SYMBOL_COST]);
  }

  /**
   * Returns the image link for this card at the given size.
   * @param version The image size to return.
   */
  public getImageURI(version: keyof ImageUris) {
    return this.image_uris?.[version] ??
      this.card_faces[0].image_uris?.[version];
  }

  /**
   * Returns the front-face image link at the given size.
   * @param version The image size to return.
   */
  public getFrontImageURI(version: keyof ImageUris) {
    return this.card_faces[0].image_uris?.[version] ??
      this.image_uris?.[version];
  }

  /**
   * Returns the back-face image link at the given size.
   * @param version The image size to return.
   */
  public getBackImageURI(version: keyof ImageUris) {
    return this.layout !== 'transform' && this.layout !== 'double_faced_token'
      ? RESOURCE_GENERIC_CARD_BACK
      : this.card_faces[1].image_uris?.[version] ?? RESOURCE_GENERIC_CARD_BACK;
  }
}

class Cards extends MagicQuerier {
  /**
   * Sets how mana symbols in card text are replaced.
   * @param transformer Text or a function used to replace each symbol. Leave it out to stop replacing symbols.
   */
  public setSymbologyTransformer(transformer?: string | SymbologyTransformer) {
    symbologyTransformer = transformer;
    return this;
  }

  /**
   * Returns the card with the given name.
   * @param name The card name to look up.
   * @param fuzzy When `true`, allows a close name match instead of an exact one.
   */
  public async byName(name: string, fuzzy?: boolean): Promise<Card>;
  /**
   * Returns the card with the given name.
   * @param name The card name to look up.
   * @param set A set code, if you want one printing.
   * @param fuzzy When `true`, allows a close name match instead of an exact one.
   */
  public async byName(name: string, set?: string, fuzzy?: boolean): Promise<Card>;
  @Cached
  public async byName(name: string, set?: string | boolean, fuzzy = false) {
    if (typeof set === 'boolean') {
      fuzzy = set;
      set = undefined;
    }

    const promise = this.queryCard('cards/named', {
      [fuzzy ? 'fuzzy' : 'exact']: name,
      set,
    });

    return promise;
  }

  /**
   * Returns the card with the given Scryfall id.
   * @param id The Scryfall id of the card.
   */
  @Cached
  public async byId(id: string) {
    return this.queryCard(['cards', id]);
  }

  /**
   * Returns the card from the given set and collector number.
   * @param setCode The set code, or the set itself.
   * @param collectorNumber The collector number of the card.
   * @param lang A language code, if you want that printing.
   */
  @Cached
  public async bySet(setCode: string | Set, collectorNumber: string | number, lang?: string) {
    const path = ['cards', typeof setCode === 'string' ? setCode : setCode.code, collectorNumber];
    if (lang) path.push(lang);
    return this.queryCard(path);
  }

  /**
   * Returns the card with the given Multiverse id.
   * @param id The Multiverse id of the card.
   */
  @Cached
  public async byMultiverseId(id: number) {
    return this.queryCard(['cards/multiverse', id]);
  }

  /**
   * Returns the card with the given Magic Online id.
   * @param id The Magic Online id of the card.
   */
  @Cached
  public async byMtgoId(id: number) {
    return this.queryCard(['cards/mtgo', id]);
  }

  /**
   * Returns the card with the given Arena id.
   * @param id The Arena id of the card.
   */
  @Cached
  public async byArenaId(id: number) {
    return this.queryCard(['cards/arena', id]);
  }

  /**
   * Returns the card with the given TCGplayer id.
   * @param id The TCGplayer id of the card.
   */
  @Cached
  public async byTcgPlayerId(id: number) {
    return this.queryCard(['cards/tcgplayer', id]);
  }

  /**
   * Returns the card with the given Cardmarket id.
   * @param id The Cardmarket id of the card.
   */
  @Cached
  public async byCardmarketId(id: number) {
    return this.queryCard(['cards/cardmarket', id]);
  }

  /**
   * Returns a random card, or a random card that matches the search.
   * @param query The search text to match. Leave it out for any card.
   */
  public async random(query?: string) {
    return this.queryCard('cards/random', { q: query });
  }

  /**
   * Returns a MagicEmitter of every card in the Scryfall database that matches the given query.
   * @param query The search text to match.
   * @param options Search options for this search.
   */
  public search(query: string, options?: SearchOptions): MagicEmitter<Card>;
  /**
   * Returns a MagicEmitter of every card in the Scryfall database that matches the given query.
   * @param query The search text to match.
   * @param page The page to start on.
   */
  public search(query: string, page?: number): MagicEmitter<Card>;
  /**
   * Returns a MagicEmitter of every card in the Scryfall database that matches the given query.
   * @param query The search text to match.
   * @param options Search options, or a page number.
   */
  public search(query: string, options?: SearchOptions | number): MagicEmitter<Card>;
  public search(query: string, options?: SearchOptions | number) {
    const emitter = new MagicEmitter<Card>()
      .map(Card.construct);

    this.queryPage(emitter, 'cards/search', { q: query, ...typeof options === 'number' ? { page: options } : options })
      .catch((err: Error) => emitter.emit('error', err));

    return emitter;
  }

  /**
   * Returns a short record for every card, for keeping a local copy in sync.
   * @param options Language, sort, and page. Leave it out to start at the first page.
   */
  public manifest(options?: ManifestOptions) {
    const emitter = new MagicEmitter<ManifestEntry>();

    this.queryPage(emitter, 'cards/manifest', options)
      .catch((err: Error) => emitter.emit('error', err));

    return emitter;
  }

  /**
   * Returns card names that start with the given text.
   * @param name The start of a card name.
   * @param includeExtras When `true`, also returns extra and token names.
   */
  @Cached
  public async autoCompleteName(name: string, includeExtras?: boolean) {
    return (await this.query<ApiCatalog>('cards/autocomplete', {
      q: name,
      include_extras: includeExtras ? true : undefined,
    })).data;
  }

  /**
   * Returns the cards for the given identifiers.
   * @param identifiers The card identifiers to look up.
   */
  public collection(...identifiers: CardIdentifier[]) {
    const emitter = new MagicEmitter<Card, CardIdentifier>()
      .map(Card.construct);

    void this.processCollection(emitter, identifiers).catch((error: Error) => {
      emitter.emit('error', error);
    });

    return emitter;
  }

  private async queryCard(apiPath: TOrArrayOfT<string | number | undefined>, query?: Record<string, any>, post?: any): Promise<Card> {
    return await this.query<Card>(apiPath, query, post)
      .then(Card.construct);
  }

  private async processCollection(emitter: MagicEmitter<Card, CardIdentifier>, identifiers: CardIdentifier[]) {
    for (let i = 0; i < identifiers.length; i += 75) {
      if (emitter.cancelled) break;

      // the api only supports a max collection size of 75, so we take the list of identifiers (any length)
      // and split it into 75 card-max requests
      const collectionSection = { identifiers: identifiers.slice(i, i + 75) };

      const { data, not_found } = await this.query<List<Card, CardIdentifier>>('cards/collection', undefined, collectionSection);

      emitter.emitAll('not_found', ...not_found ?? []);

      if (!emitter.cancelled)
        emitter.emitAll('data', ...data);

      if (emitter.willCancelAfterPage)
        emitter.cancel();
    }

    if (!emitter.cancelled)
      emitter.emit('end');

    emitter.emit('done');
  }
}

export default new Cards();
