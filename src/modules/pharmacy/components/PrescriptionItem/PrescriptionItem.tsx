import { useTranslation } from 'react-i18next';
import './index.scss';
import MNumberSpinner from '../../../../components/FormControls/MNumberSpinner/MNumberSpinner.tsx';
import { type FC, useEffect, useMemo, useState } from 'react';
import { type IPrescription } from '../../data/packagesTypes.ts';
import { PharmacyFields } from '../../data/pharmacyEnums.ts';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { quantityErrorAtom, selectedPrescriptionsAtom } from '../../store/store.ts';
import classnames from 'classnames';
import { dateFormatter } from '../../../../utils/normalizers.ts';

interface IPrescriptionItem {
  prescription: IPrescription;
}

const PrescriptionItem: FC<IPrescriptionItem> = ({ prescription }) => {
  const { t } = useTranslation();
  const [medicineCount, setMedicineCount] = useState(0);
  const [selectedPrescriptions, setSelectedPrescriptions] = useRecoilState(selectedPrescriptionsAtom);
  const setQuantityError = useSetRecoilState(quantityErrorAtom);

  const prescriptionChose = useMemo(
    () =>
      selectedPrescriptions.find(
        (selectedPrescription) =>
          prescription[PharmacyFields.documentId] === selectedPrescription[PharmacyFields.documentId],
      ),
    [prescription, selectedPrescriptions],
  );

  const onChooseClick = () => {
    // setPrescriptionChose(true);
    let newSelectedPrescriptions: IPrescription[] = [];

    if (!prescriptionChose) {
      newSelectedPrescriptions = [
        ...selectedPrescriptions,
        { ...prescription, [PharmacyFields.quantity]: medicineCount },
      ];
    } else {
      newSelectedPrescriptions = selectedPrescriptions.filter(
        (selectedPrescription) =>
          prescription[PharmacyFields.documentId] !== selectedPrescription[PharmacyFields.documentId],
      );
    }

    setSelectedPrescriptions(newSelectedPrescriptions);
  };

  const onCountChange = (count: number) => {
    setMedicineCount(count);

    if (count > prescription[PharmacyFields.quantity]) {
      setQuantityError(true);

      return;
    }

    setQuantityError(false);

    if (count === 0) {
      const newSelectedPrescriptions = selectedPrescriptions.filter(
        (selectedPrescription) =>
          prescription[PharmacyFields.documentId] !== selectedPrescription[PharmacyFields.documentId],
      );
      // setPrescriptionChose(false);
      setSelectedPrescriptions(newSelectedPrescriptions);
    } else {
      const newSelectedPrescription = { ...prescription, [PharmacyFields.quantity]: count };

      let newSelectedPrescriptions = selectedPrescriptions.map((selectedPrescription) => {
        if (newSelectedPrescription[PharmacyFields.documentId] === selectedPrescription[PharmacyFields.documentId]) {
          return newSelectedPrescription;
        } else return selectedPrescription;
      });

      if (!prescriptionChose) {
        newSelectedPrescriptions = [...newSelectedPrescriptions, newSelectedPrescription];
      }

      setSelectedPrescriptions(newSelectedPrescriptions);
    }
  };

  useEffect(() => {
    setMedicineCount(prescriptionChose?.[PharmacyFields.quantity] ?? 0);
  }, [prescriptionChose?.[PharmacyFields.quantity]]);

  return (
    <div className="prescription-item-container">
      <div className="medicine-description">
        <div className="medicine-name">{prescription[PharmacyFields.name]}</div>
        <div className={classnames('validity-date-description')}>
          {t('validityDate', { date: dateFormatter(prescription[PharmacyFields.validationDate]) })}
        </div>
        <div className="prescription-item-separator" />
        <div className="medicine-usage">
          <div>{prescription[PharmacyFields.description]}</div>
        </div>
        <div className="flex space-between m-t-12">
          <div className="medicine-item-label flex flex-column content-center m-r-12">{t('quantity')}</div>
          <MNumberSpinner
            value={medicineCount}
            minimumNumber={0}
            maximumNumber={prescription[PharmacyFields.quantity]}
            onChange={onCountChange}
          />
        </div>
        {medicineCount > prescription[PharmacyFields.quantity] ? (
          <div className="max-quantity-error p-t-8">
            {t('moreThanQuantityError', { quantity: prescription[PharmacyFields.quantity] })}
          </div>
        ) : null}
        {medicineCount === 0 ? <div className="zero-quantity p-t-8">{t('zeroQuantity')}</div> : null}
        <div className="flex space-between m-t-8">
          <div className="medicine-item-label">{t('mainIngredient')}</div>
          <div className="medicine-item-middle-line">
            <div />
          </div>
          <div className="medicine-item-label-right">{prescription[PharmacyFields.mainIngredient]}</div>
        </div>
        <div className="flex space-between m-t-12">
          <div className="medicine-item-label">{t('medicineType')}</div>
          <div className="medicine-item-middle-line">
            <div />
          </div>
          <div className="medicine-item-label-right">{prescription[PharmacyFields.dosageForm]}</div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionItem;
