import PharmacyOffer from '../components/PharmacyOffer/PharmacyOffer.tsx';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedPharmacyAtom } from '../store/store.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { AppPaths } from '../../../constants/constants.ts';

const PharmacyOffers = () => {
  const selectedPharmacy = useRecoilValue(selectedPharmacyAtom);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!Object.keys(selectedPharmacy).length) {
      navigate(`/${AppPaths.prescriptions}/${id}`);
    }
  }, []);

  return <PharmacyOffer />;
};

export default PharmacyOffers;
