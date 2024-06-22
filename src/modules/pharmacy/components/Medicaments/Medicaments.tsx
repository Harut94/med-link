import { PharmacyFields } from '../../data/pharmacyEnums.ts';
import { langKeyAdapter } from '../../../../utils/normalizers.ts';
import MRadio from '../../../../components/FormControls/MRadio/MRadio.tsx';
import { type IMedicament } from '../../data/packagesTypes.ts';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { type IGroupMedicament } from '../PharmacyOffer/PharmacyOffer.tsx';
import { useRecoilState } from 'recoil';
import { selectedMedicineAtom } from '../../store/store.ts';

const Medicaments: FC<{ medicaments: IGroupMedicament; documentId: string }> = ({ medicaments, documentId }) => {
  const { i18n } = useTranslation();

  const [selectedMedicine, setSelectedMedicine] = useRecoilState(selectedMedicineAtom);

  const handleRadioChange = (value: string) => {
    const selectedMedicament = medicaments[PharmacyFields.medicaments]!.find(
      (medicament) => medicament[PharmacyFields.code] === value,
    )!;
    const newSelectedMedicine = { ...selectedMedicine };
    newSelectedMedicine[documentId] = selectedMedicament;

    setSelectedMedicine(newSelectedMedicine);
  };

  return (
    <>
      {medicaments[PharmacyFields.medicaments]?.map((medicament: IMedicament, i: number) => {
        const languageKey = langKeyAdapter[i18n.language] as keyof (typeof medicament)[PharmacyFields.producer];

        return (
          <div className="flex space-between m-t-16" key={i}>
            <div className="medicine-item-label items-center">{medicament[PharmacyFields.producer][languageKey]}</div>
            <div className="medicine-item-middle-line">
              <div />
            </div>
            <div className="medicine-item-label-right flex">
              <div className="flex items-center m-r-8">{medicament[PharmacyFields.price]} ֏</div>
              <MRadio
                selectedValue={medicament[PharmacyFields.code] === selectedMedicine[documentId]?.[PharmacyFields.code]}
                value={medicament[PharmacyFields.code]}
                onChange={handleRadioChange}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Medicaments;
