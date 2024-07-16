import { atom, atomFamily } from 'recoil';
import {
  type IBookResponse,
  type IMedicament,
  type IPharmacies,
  type IPrescription,
  type IStatement,
} from '../data/packagesTypes.ts';
import { type DictionaryTypes } from '../data/dictionaryEnum.ts';
import { type TDictionary } from '../data/dictionaryTypes.ts';

export const initialAppInfoIsOpenAtom = atom({
  key: 'initialAppInfoIsOpen',
  default: true,
});

export const prescriptionsAtom = atom<IPrescription[]>({
  key: 'prescriptions',
  default: [],
});

export const pharmaciesAtom = atom<IPharmacies[]>({
  key: 'pharmacies',
  default: [],
});

export const selectedPharmacyAtom = atom<Partial<IPharmacies>>({
  key: 'selectedPharmacy',
  default: {},
});

export const addressSearchValueAtom = atom({
  key: 'addressSearchValue',
  default: '',
});

export const centerAtom = atom({
  key: 'center',
  default: null,
});

export const selectedMedicineAtom = atom<Record<string, IMedicament>>({
  key: 'selectedMedicine',
  default: {},
});

export const selectedMedicineStrengthAtom = atom<Record<string, IMedicament>>({
  key: 'selectedMedicineStrength',
  default: {},
});

export const selectedPrescriptionsAtom = atom<IPrescription[]>({
  key: 'selectedPrescriptions',
  default: [],
});

export const quantityErrorAtom = atom({
  key: 'quantityError',
  default: false,
});

export const isPrescriptionSetAtom = atom({
  key: 'isPrescriptionSet',
  default: false,
});

export const bookAtom = atom<Partial<IBookResponse>>({
  key: 'book',
  default: {},
});

export const statementAtom = atom<Partial<IStatement>>({
  key: 'statement',
  default: {},
});

export const screenBreakpointAtom = atom<string>({
  key: 'screenBreakpoint',
  default: 'large',
});

export const dictionaryAtom = atomFamily<TDictionary[DictionaryTypes][], DictionaryTypes>({
  key: 'dictionary',
  default: () => [],
});
