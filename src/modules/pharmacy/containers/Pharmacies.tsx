// @ts-ignore
import Map from '../components/Map/Map.jsx';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { selectedPrescriptionsAtom } from '../store/store.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { AppPaths } from '../../../constants/constants.ts';
import { useEffect } from 'react';

const Pharmacies = () => {
  const { t } = useTranslation();
  const selectedPrescriptions = useRecoilValue(selectedPrescriptionsAtom);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!selectedPrescriptions.length) {
      navigate(`/${AppPaths.prescriptions}/${id}`);
    }
  }, []);

  return <Map />;
};

export default Pharmacies;
