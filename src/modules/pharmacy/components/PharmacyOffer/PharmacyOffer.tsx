import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { AppPaths } from '../../../../constants/constants.ts';
import './index.scss';
import MButton from '../../../../components/FormControls/MButton/MButton.tsx';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedMedicineAtom, selectedPharmacyAtom, selectedPrescriptionsAtom } from '../../store/store.ts';
import { PharmacyFields } from '../../data/pharmacyEnums.ts';
import { useEffect, useMemo, useState } from 'react';
import { type IMedicament, type IPrescription } from '../../data/packagesTypes.ts';
import classnames from 'classnames';
import { langKeyAdapter } from '../../../../utils/normalizers.ts';
import nataliPharm from '/public/images/natali-pharm-logo.svg';
import alfaPharm from '/public/images/alfa-pharm-logo.svg';
import Medicaments from '../Medicaments/Medicaments.tsx';
import TermsAndConditions from '../TermsAndConditions/TermsAndConditions.tsx';

export interface IGroupMedicament {
  [PharmacyFields.name]: { [PharmacyFields.arm]: string; [PharmacyFields.eng]: string; [PharmacyFields.rus]: string };
  [PharmacyFields.medicaments]?: IMedicament[];
}

const pharmacyLogos: Record<number, string> = {
  1: alfaPharm,
  2: nataliPharm,
  3: nataliPharm,
};

const PharmacyOffer = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedMedicineBrand, setSelectedMedicineBrand] = useRecoilState(selectedMedicineAtom);
  const selectedPrescriptions = useRecoilValue(selectedPrescriptionsAtom);
  const selectedPharmacy = useRecoilValue(selectedPharmacyAtom);

  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const selectedPharmacyGroupedByDocumentId = useMemo(
    () =>
      selectedPharmacy?.[PharmacyFields.medicaments]?.reduce((acc: Record<string, IGroupMedicament>, medicament) => {
        if (acc[medicament[PharmacyFields.documentId]]) {
          acc[medicament[PharmacyFields.documentId]][PharmacyFields.medicaments]!.push(medicament);
        } else {
          acc[medicament[PharmacyFields.documentId]] = {
            [PharmacyFields.name]: medicament[PharmacyFields.name],
          };
          acc[medicament[PharmacyFields.documentId]][PharmacyFields.medicaments] = [medicament];
        }

        return acc;
      }, {}),
    [selectedPharmacy],
  );

  const totalPrice = useMemo(
    () => Object.values(selectedMedicineBrand).reduce((acc, item) => acc + item[PharmacyFields.price], 0),
    [selectedMedicineBrand],
  );

  useEffect(() => {
    if (selectedPharmacyGroupedByDocumentId) {
      const newSelectedMedicine = { ...selectedMedicineBrand };
      Object.entries(selectedPharmacyGroupedByDocumentId).forEach(([documentId, medicaments], i) => {
        newSelectedMedicine[documentId] = medicaments[PharmacyFields.medicaments]![0];
      });
      setSelectedMedicineBrand(newSelectedMedicine);
    }
  }, [selectedPharmacyGroupedByDocumentId]);

  return (
    <div className="pharmacy-offer-container">
      <TermsAndConditions isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
      <header className="pharmacy-offer-header">
        <div className="pharmacy-offer-title-container">
          <div className="flex space-between">
            <img
              src="/images/back.svg"
              alt=""
              className="p-r-6"
              onClick={() => navigate(`/${AppPaths.pharmacies}/${id}`)}
            />
            <div>{t('pay')}</div>
            <div className="width-26"></div>
          </div>
        </div>
      </header>
      <div className="medicine">
        <div className="medicine-container">
          <div className="medicine-description">
            <div className="pharmacy-name m-16 flex items-center">
              <div className="flex items-center m-r-8">
                <img
                  src={
                    pharmacyLogos[Number(selectedPharmacy?.[PharmacyFields.branch]?.[PharmacyFields.pharmacyId]) || 1]
                  }
                  alt=""
                />
              </div>
              <div>{selectedPharmacy?.[PharmacyFields.label]}</div>
            </div>
            <div className="prescription-item-separator m-b-16"></div>
            <div className="medicine-name m-16">{t('pharmacyPriceByProducer')}</div>
            {selectedPharmacyGroupedByDocumentId &&
              Object.entries(selectedPharmacyGroupedByDocumentId).map(([documentId, medicaments], i) => {
                const quantityOfMedicine =
                  selectedPrescriptions.find(
                    (prescription) => +prescription[PharmacyFields.documentId] === +documentId,
                  ) ?? ({} as IPrescription);

                return (
                  <div className={classnames('m-16', { 'm-t-24': i !== 0 })} key={documentId}>
                    <div className="medicine-usage">
                      <div>
                        {/* @ts-ignore*/}
                        {medicaments[PharmacyFields.name][langKeyAdapter[i18n.language]]},
                        {quantityOfMedicine[PharmacyFields.quantity]} {quantityOfMedicine[PharmacyFields.dosageForm]}
                      </div>
                    </div>
                    <Medicaments medicaments={medicaments} documentId={documentId} />
                  </div>
                );
              })}
          </div>
          <div className="pay-action">
            <MButton
              text={t('payWithPrice', { price: totalPrice })}
              onClick={() => setIsTermsModalOpen(true)}
              className="w-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyOffer;
