import { useRecoilValue } from 'recoil';
import { dictionaryAtom } from '../store/store.ts';
import { type DictionaryTypes } from '../data/dictionaryEnum.ts';
import { useMemo } from 'react';
import { PharmacyFields } from '../data/pharmacyEnums.ts';

const useDictionaryByKey = (key: number, dictionaryType: DictionaryTypes) => {
  const dictionary = useRecoilValue(dictionaryAtom(dictionaryType));

  return useMemo(
    () => dictionary.find((item) => item[PharmacyFields.key] === key)?.[PharmacyFields.value] || '',
    [dictionary, key],
  );
};

export default useDictionaryByKey;
