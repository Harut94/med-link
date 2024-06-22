import { type DictionaryTypes } from './dictionaryEnum.ts';
import { type PharmacyFields } from './pharmacyEnums.ts';

export interface IDictionary {
  [PharmacyFields.key]: number;
  [PharmacyFields.value]: string;
}

export type TDictionary = Record<DictionaryTypes, IDictionary>;
