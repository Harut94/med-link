import { useTranslation } from 'react-i18next';
import './index.scss';
import { type FC } from 'react';
import MButton from '../../../../components/FormControls/MButton/MButton.tsx';
import { useRecoilValue } from 'recoil';
import { selectedMedicineAtom, selectedPharmacyAtom, selectedPrescriptionsAtom } from '../../store/store.ts';
import type { IBook } from '../../data/packagesTypes.ts';
import { PharmacyFields } from '../../data/pharmacyEnums.ts';
import { langKeyAdapter } from '../../../../utils/normalizers.ts';
import useBook from '../../hooks/useBook.tsx';

interface ITermsAndConditions {
  isOpen: boolean;
  onClose: () => void;
}

const TermsAndConditions: FC<ITermsAndConditions> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();

  const selectedMedicineBrand = useRecoilValue(selectedMedicineAtom);
  const selectedPrescriptions = useRecoilValue(selectedPrescriptionsAtom);
  const selectedPharmacy = useRecoilValue(selectedPharmacyAtom);

  const { onBook, loading } = useBook();

  const handleBook = () => {
    const bookData: IBook = {
      [PharmacyFields.pharmacyId]: selectedPharmacy[PharmacyFields.branch]![PharmacyFields.pharmacyId],
      [PharmacyFields.branchCode]: selectedPharmacy[PharmacyFields.branch]![PharmacyFields.code],
      [PharmacyFields.address]:
        // @ts-ignore
        selectedPharmacy[PharmacyFields.branch]![PharmacyFields.address]?.[langKeyAdapter[i18n.language]],
      [PharmacyFields.medicaments]: Object.values(selectedMedicineBrand).map((pharmacy) => {
        const prescription = selectedPrescriptions.find(
          (prescription) => +prescription[PharmacyFields.documentId] === pharmacy[PharmacyFields.documentId],
        );

        return {
          [PharmacyFields.documentId]: pharmacy[PharmacyFields.documentId],
          [PharmacyFields.code]: pharmacy[PharmacyFields.code],
          [PharmacyFields.price]: pharmacy[PharmacyFields.price],
          [PharmacyFields.quantity]: prescription![PharmacyFields.quantity],
          // @ts-ignore
          [PharmacyFields.name]: pharmacy[PharmacyFields.name]?.[langKeyAdapter[i18n.language]],
          // @ts-ignore
          [PharmacyFields.description]: prescription[PharmacyFields.description],
        };
      }),
    };
    onBook(bookData);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="terms-container">
      <div className="terms-content">
        <div className="terms-title">
          <div>{t('notification')}</div>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <img src="/images/close.svg" alt="" onClick={onClose} />
        </div>
        <div className="terms-description">{t('termsAndConditions')}</div>
        <div className="continue-button">
          <MButton text="continue" className="w-100" onClick={handleBook} disabled={loading} />
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
