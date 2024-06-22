import '../components/Prescriptions/index.scss';
import { useTranslation } from 'react-i18next';
import PrescriptionItem from '../components/PrescriptionItem/PrescriptionItem.tsx';
import MButton from '../../../components/FormControls/MButton/MButton.tsx';
import usePrescriptions from '../hooks/usePrescriptions.tsx';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
  addressSearchValueAtom,
  centerAtom,
  initialAppInfoIsOpenAtom,
  isPrescriptionSetAtom,
  pharmaciesAtom,
  quantityErrorAtom,
  selectedPrescriptionsAtom,
} from '../store/store.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { AppPaths } from '../../../constants/constants.ts';
import Loader from '../../../components/Loader/Loader.tsx';
import InitialAppInfo from '../components/InitialAppInfo/InitialAppInfo.tsx';
import { useEffect } from 'react';
import { dateFormatter } from '../../../utils/normalizers.ts';
import { PharmacyFields } from '../data/pharmacyEnums.ts';

const Prescriptions = () => {
  const { t } = useTranslation();
  const { getAllPrescriptions, prescriptions, loading } = usePrescriptions();
  const [selectedPrescriptions, setSelectedPrescriptions] = useRecoilState(selectedPrescriptionsAtom);
  const [initialAppInfoIsOpen, setInitialAppInfoIsOpen] = useRecoilState(initialAppInfoIsOpenAtom);
  const [isPrescriptionSet, setIsPrescriptionSet] = useRecoilState(isPrescriptionSetAtom);

  const quantityError = useRecoilValue(quantityErrorAtom);
  // console.log(selectedPrescriptions);
  const resetCenter = useResetRecoilState(centerAtom);
  const resetPharmacies = useResetRecoilState(pharmaciesAtom);
  const resetSearchValue = useResetRecoilState(addressSearchValueAtom);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    resetCenter();
    resetPharmacies();
    resetSearchValue();
  }, []);

  useEffect(() => {
    if (prescriptions.length && !isPrescriptionSet) {
      setSelectedPrescriptions(prescriptions);
      setIsPrescriptionSet(true);
    }
  }, [prescriptions, isPrescriptionSet]);

  if (initialAppInfoIsOpen) {
    return (
      <InitialAppInfo
        onClose={() => {
          setInitialAppInfoIsOpen(false);
          getAllPrescriptions();
        }}
      />
    );
  }

  return (
    <div className="prescriptions-container">
      <header className="prescriptions-header">
        <div className="prescriptions-titles flex">
          <div>{t('prescriptions')}</div>
          {/*<LanguagePicker />*/}
        </div>
      </header>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="appointed-container">
            {/*<div>*/}
            {/*  {t('prescription')} #{id}*/}
            {/*</div>*/}
            <div>{dateFormatter(prescriptions[0]?.[PharmacyFields.validFrom])}</div>
          </div>
          <div className="prescriptions p-b-76">
            {prescriptions.map((prescription, i) => (
              <PrescriptionItem key={i} prescription={prescription} />
            ))}
          </div>
          <div className="medicine-pay-container">
            <MButton
              text={t('buy')}
              className="w-100"
              disabled={!selectedPrescriptions.length}
              onClick={() => {
                if (!quantityError) {
                  navigate(`/${AppPaths.pharmacies}/${id}`);
                }
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Prescriptions;
