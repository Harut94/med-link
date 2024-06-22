import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getPharmaciesService } from '../services/PharmacyServices.ts';
import { pharmaciesAtom, selectedPrescriptionsAtom } from '../store/store.ts';
import { PharmacyFields } from '../data/pharmacyEnums.ts';
import { type IOffer } from '../data/packagesTypes.ts';

const usePharmacies = () => {
  const [loading, setLoading] = useState(false);
  const [pharmacies, setPharmacies] = useRecoilState(pharmaciesAtom);
  const prescriptions = useRecoilValue(selectedPrescriptionsAtom);

  const getPharmacies = () => {
    const offer: IOffer[] = prescriptions.map((prescription) => ({
      [PharmacyFields.documentId]: prescription[PharmacyFields.documentId],
      [PharmacyFields.brands]: prescription[PharmacyFields.brands],
      [PharmacyFields.quantity]: prescription[PharmacyFields.quantity],
    }));

    setLoading(true);
    getPharmaciesService(offer)
      .then(({ data }) => {
        setPharmacies(
          data.map((pharmacy) => ({
            [PharmacyFields.lng]: pharmacy[PharmacyFields.branch]?.[PharmacyFields.longitude],
            [PharmacyFields.lat]: pharmacy[PharmacyFields.branch]?.[PharmacyFields.latitude],
            // @ts-ignore
            [PharmacyFields.label]: pharmacy[PharmacyFields.branch]?.[PharmacyFields.pharmacy],
            ...pharmacy,
          })),
        );
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(
    () => () => {
      //   TODO check
      // setPharmacies([]);
      // setLoading(true);
    },
    [],
  );

  return { pharmacies, getPharmacies, loading, setLoading };
};

export default usePharmacies;
