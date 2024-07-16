import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { AppPaths } from '../../../../constants/constants.ts';
import './index.scss';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedMedicineAtom, selectedMedicineStrengthAtom, selectedPharmacyAtom } from '../../store/store.ts';
import { PharmacyFields } from '../../data/pharmacyEnums.ts';
import { useEffect, useMemo, useState } from 'react';
import { type IMedicament, type IPrescription } from '../../data/packagesTypes.ts';
import classnames from 'classnames';
import nataliPharm from '/public/images/natali-pharm-logo.svg';
import alfaPharm from '/public/images/alfa-pharm-logo.svg';
import TermsAndConditions from '../TermsAndConditions/TermsAndConditions.tsx';
import { langKeyAdapter, numberWithCommaNormalizer } from '../../../../utils/normalizers.ts';
import MSelect, { type TOption } from '../../../../components/FormControls/MSelect/MSelect.tsx';
import MNumberSpinner from '../../../../components/FormControls/MNumberSpinner/MNumberSpinner.tsx';
import MButton from '../../../../components/FormControls/MButton/MButton.tsx';

export interface IGroupMedicament {
  [PharmacyFields.name]: { [PharmacyFields.arm]: string; [PharmacyFields.eng]: string; [PharmacyFields.rus]: string };
  [PharmacyFields.medicaments]?: IMedicament[];
}

const pharmacyLogos: Record<number, string> = {
  1: alfaPharm,
  2: nataliPharm,
  3: nataliPharm,
};

const pharmacyPillType = ['77', '6'];

const PharmacyOffer = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedMedicineBrand, setSelectedMedicineBrand] = useRecoilState(selectedMedicineAtom);
  const [selectedMedicineStrength, setSelectedMedicineStrength] = useRecoilState(selectedMedicineStrengthAtom);
  const selectedPharmacy = useRecoilValue(selectedPharmacyAtom);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [errors, setErrors] = useState(new Set());

  const selectedPharmacyGroupedByDocumentId = useMemo(
    () =>
      selectedPharmacy?.[PharmacyFields.medicaments]?.reduce((acc: Record<string, IGroupMedicament>, medicament) => {
        if (acc[medicament[PharmacyFields.documentId]]) {
          // @ts-ignore
          const isCountryDuplicate = acc[medicament[PharmacyFields.documentId]][PharmacyFields.medicaments].find(
            (item) => item[PharmacyFields.producer]['eng'] === medicament[PharmacyFields.producer]['eng'],
          );

          if (!isCountryDuplicate) {
            acc[medicament[PharmacyFields.documentId]][PharmacyFields.medicaments]!.push(medicament);
          }
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

  const selectedPharmacyGroupedByDocumentIdAndCountry = useMemo(
    () =>
      selectedPharmacy?.[PharmacyFields.medicaments]?.reduce((acc: Record<string, IMedicament[]>, medicament) => {
        if (acc[`${medicament[PharmacyFields.documentId]}_${medicament[PharmacyFields.producer]['eng']}`]) {
          acc[`${medicament[PharmacyFields.documentId]}_${medicament[PharmacyFields.producer]['eng']}`].push({
            ...medicament,
            value: `${medicament[PharmacyFields.strength]} ${medicament[PharmacyFields.strengthUnit]}`,
            label: `${medicament[PharmacyFields.strength]} ${medicament[PharmacyFields.strengthUnit]}`,
          });
        } else {
          acc[`${medicament[PharmacyFields.documentId]}_${medicament[PharmacyFields.producer]['eng']}`] = [
            {
              ...medicament,
              value: `${medicament[PharmacyFields.strength]} ${medicament[PharmacyFields.strengthUnit]}`,
              label: `${medicament[PharmacyFields.strength]} ${medicament[PharmacyFields.strengthUnit]}`,
            },
          ];
        }

        return acc;
      }, {}),
    [selectedPharmacy],
  );

  const totalPrice = useMemo(
    () =>
      Object.values(selectedMedicineStrength).reduce(
        (acc, item) => acc + item[PharmacyFields.price] * item[PharmacyFields.quantity],
        0,
      ),
    [selectedMedicineStrength],
  );

  const isMedicineChose = useMemo(
    () => Object.values(selectedMedicineStrength).find((medicine) => medicine[PharmacyFields.quantity] != 0),
    [selectedMedicineStrength],
  );

  const onMedicineCountryChange = (value: IMedicament) => {
    const newSelectedMedicine = { ...selectedMedicineBrand };
    newSelectedMedicine[value[PharmacyFields.documentId]] = {
      ...value,
    } as IMedicament;
    const newSelectedMedicineStrength =
      selectedPharmacyGroupedByDocumentIdAndCountry?.[
        `${value[PharmacyFields.documentId]}_${value[PharmacyFields.producer]['eng']}`
      ]?.[0];
    const selectedMedicineStrengthClone = { ...selectedMedicineStrength };
    selectedMedicineStrengthClone[value[PharmacyFields.documentId]] = { ...newSelectedMedicineStrength } as IMedicament;

    setSelectedMedicineStrength(selectedMedicineStrengthClone);
    setSelectedMedicineBrand(newSelectedMedicine);
  };

  const onMedicineStrengthChange = (value: IMedicament) => {
    const newSelectedMedicineStrength = { ...selectedMedicineStrength };

    newSelectedMedicineStrength[value[PharmacyFields.documentId]] = value;

    setSelectedMedicineStrength(newSelectedMedicineStrength);
  };

  const onQuantityChange = ({
    quantity,
    maxQuantity,
    documentId,
  }: {
    [PharmacyFields.quantity]: number;
    maxQuantity: number;
    [PharmacyFields.documentId]: string;
  }) => {
    const newSelectedMedicineStrength = { ...selectedMedicineStrength };
    const newMedicine = { ...newSelectedMedicineStrength[documentId] };
    const newErrors = new Set(errors);

    if (quantity > maxQuantity) {
      newErrors.add(documentId);
    } else {
      newErrors.delete(documentId);
    }

    // @ts-ignore
    // eslint-disable-next-line no-compare-neg-zero
    newMedicine[PharmacyFields.quantity] = quantity < 0 || quantity == -0 || !quantity ? '0' : quantity;
    newSelectedMedicineStrength[documentId] = newMedicine;
    setSelectedMedicineStrength(newSelectedMedicineStrength);
    setErrors(newErrors);
  };

  useEffect(() => {
    if (selectedPharmacyGroupedByDocumentId) {
      const newSelectedMedicine = { ...selectedMedicineBrand };
      const newSelectedMedicineStrength = { ...selectedMedicineStrength };
      Object.entries(selectedPharmacyGroupedByDocumentId).forEach(([documentId, medicaments], i) => {
        const name =
          // @ts-ignore
          medicaments[PharmacyFields.medicaments]![0][PharmacyFields.producer]?.[langKeyAdapter[i18n.language]];
        newSelectedMedicine[documentId] = { ...medicaments[PharmacyFields.medicaments]![0], value: name, label: name };
        newSelectedMedicineStrength[documentId] = {
          ...medicaments[PharmacyFields.medicaments]![0],
          value: `${medicaments[PharmacyFields.medicaments]![0][PharmacyFields.strength]} ${medicaments[PharmacyFields.medicaments]![0][PharmacyFields.strengthUnit]}`,
          label: `${medicaments[PharmacyFields.medicaments]![0][PharmacyFields.strength]} ${medicaments[PharmacyFields.medicaments]![0][PharmacyFields.strengthUnit]}`,
        };
      });
      setSelectedMedicineBrand(newSelectedMedicine);
      setSelectedMedicineStrength(newSelectedMedicineStrength);
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
        <div className="header-description-container">
          <div className="header-description">{t('prisePerProducer')}</div>
          <div className="header-pharmacy">{selectedPharmacy[PharmacyFields.label]}</div>
        </div>
      </header>
      <div className="medicine">
        {selectedPharmacyGroupedByDocumentId &&
          Object.entries(selectedPharmacyGroupedByDocumentId).map(([documentId, medicaments], i) => {
            const quantityOfMedicine =
              selectedPharmacy?.[PharmacyFields.medicaments]?.find(
                (medicament) => medicament[PharmacyFields.code] === selectedMedicineStrength[documentId]?.code,
              ) ?? ({} as IPrescription);
            const options = medicaments[PharmacyFields.medicaments]?.map((medicament) => ({
              ...medicament,
              // @ts-ignore
              value: medicament[PharmacyFields.producer]?.[langKeyAdapter[i18n.language]],
              // @ts-ignore
              label: medicament[PharmacyFields.producer]?.[langKeyAdapter[i18n.language]],
            }));

            const strengthOptions = selectedPharmacyGroupedByDocumentIdAndCountry?.[
              `${documentId}_${selectedMedicineBrand[documentId]?.[PharmacyFields.producer]['eng']}`
            ]?.map((medicament) => ({
              ...medicament,
            }));

            return (
              <div className={classnames('medicine-container', { 'm-t-16': i !== 0 })} key={documentId}>
                <div className="medicine-description">
                  <div className="pharmacy-name m-16 flex items-center">
                    {/* @ts-ignore*/}
                    {selectedMedicineStrength?.[documentId]?.[PharmacyFields.name][langKeyAdapter[i18n.language]]},
                  </div>
                  <div className={classnames('m-16', { 'm-t-24': i !== 0 })}>
                    <MSelect
                      selectedValue={selectedMedicineBrand[documentId] as unknown as TOption}
                      options={options!}
                      singleOption={options?.length === 1}
                      isDisabled={options?.length === 1}
                      // @ts-ignore
                      onChange={onMedicineCountryChange}
                    />
                    {pharmacyPillType.includes(
                      selectedMedicineStrength?.[documentId]?.[PharmacyFields.strengthUnitCode] as string,
                    ) ? null : (
                      <MSelect
                        selectedValue={selectedMedicineStrength[documentId] as unknown as TOption}
                        options={strengthOptions!}
                        singleOption={strengthOptions?.length === 1}
                        isDisabled={strengthOptions?.length === 1}
                        // @ts-ignore
                        onChange={onMedicineStrengthChange}
                      />
                    )}

                    <MNumberSpinner
                      value={selectedMedicineStrength[documentId]?.[PharmacyFields.quantity]}
                      minimumNumber={0}
                      maximumNumber={quantityOfMedicine?.[PharmacyFields.quantity]}
                      onChange={(value) => {
                        onQuantityChange({
                          maxQuantity: quantityOfMedicine?.[PharmacyFields.quantity],
                          [PharmacyFields.quantity]: value,
                          [PharmacyFields.documentId]: documentId,
                        });
                      }}
                    />
                    {selectedMedicineStrength[documentId]?.[PharmacyFields.quantity] == 0 ? (
                      <div className="zero-quantity p-t-8">{t('zeroQuantity')}</div>
                    ) : null}
                    {errors.has(documentId) ? (
                      <div className="max-quantity-error p-t-8">
                        {t('moreThanQuantityError', { quantity: quantityOfMedicine?.[PharmacyFields.quantity] })}
                      </div>
                    ) : null}
                  </div>
                  <div className="medicine-price">
                    <div>{t('price')}</div>
                    <div>
                      {numberWithCommaNormalizer(
                        selectedMedicineStrength[documentId]?.[PharmacyFields.quantity] *
                          selectedMedicineStrength[documentId]?.[PharmacyFields.price],
                      )}{' '}
                      ֏
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="medicine-pay-container">
        <MButton
          text={t('payWithPrice', { price: numberWithCommaNormalizer(totalPrice) })}
          className="w-100"
          disabled={!!errors.size || !isMedicineChose}
          onClick={() => {
            if (!errors.size) {
              setIsTermsModalOpen(true);
            }
          }}
        />
      </div>
    </div>
  );
};

export default PharmacyOffer;
