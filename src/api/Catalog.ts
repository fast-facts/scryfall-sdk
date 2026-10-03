import { Cached } from '../util/Cached';
import MagicQuerier, { ApiCatalog } from '../util/MagicQuerier';

class Catalog extends MagicQuerier {
  private list(path: string) {
    return this.query<ApiCatalog>(path).then(result => result.data);
  }

  @Cached
  public cardNames() {
    return this.list('catalog/card-names');
  }

  @Cached
  public artistNames() {
    return this.list('catalog/artist-names');
  }

  @Cached
  public wordBank() {
    return this.list('catalog/word-bank');
  }

  @Cached
  public creatureTypes() {
    return this.list('catalog/creature-types');
  }

  @Cached
  public planeswalkerTypes() {
    return this.list('catalog/planeswalker-types');
  }

  @Cached
  public landTypes() {
    return this.list('catalog/land-types');
  }

  @Cached
  public artifactTypes() {
    return this.list('catalog/artifact-types');
  }

  @Cached
  public enchantmentTypes() {
    return this.list('catalog/enchantment-types');
  }

  @Cached
  public spellTypes() {
    return this.list('catalog/spell-types');
  }

  @Cached
  public powers() {
    return this.list('catalog/powers');
  }

  @Cached
  public toughnesses() {
    return this.list('catalog/toughnesses');
  }

  @Cached
  public loyalties() {
    return this.list('catalog/loyalties');
  }

  @Cached
  public watermarks() {
    return this.list('catalog/watermarks');
  }

  @Cached
  public keywordAbilities() {
    return this.list('catalog/keyword-abilities');
  }

  @Cached
  public keywordActions() {
    return this.list('catalog/keyword-actions');
  }

  @Cached
  public abilityWords() {
    return this.list('catalog/ability-words');
  }

  @Cached
  public supertypes() {
    return this.list('catalog/supertypes');
  }

  @Cached
  public battleTypes() {
    return this.list('catalog/battle-types');
  }

  @Cached
  public flavorWords() {
    return this.list('catalog/flavor-words');
  }

  @Cached
  public cardTypes() {
    return this.list('catalog/card-types');
  }
}

export default new Catalog();
