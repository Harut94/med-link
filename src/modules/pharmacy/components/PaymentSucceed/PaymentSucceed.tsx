import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useStatement from '../../hooks/useStatement.tsx';
import useDictionary from '../../hooks/useDictionary.ts';
import { DictionaryTypes } from '../../data/dictionaryEnum.ts';
import useDictionaryByKey from '../../hooks/useDictionaryByKey.ts';
import { PharmacyFields } from '../../data/pharmacyEnums.ts';
import { useEffect, useState } from 'react';
import classnames from 'classnames';
import MButton from '../../../../components/FormControls/MButton/MButton.tsx';
import { dateFormatter } from '../../../../utils/normalizers.ts';

import './index.scss';
import '../PrescriptionItem/index.scss';
import { useQueryParams } from '../../../../hooks/useQueryParams.ts';
import useDownloadStatement from '../../hooks/useDownloadStatement.ts';
import Footer from '../../../../components/Footer/Footer.tsx';

const PaymentSucceed = () => {
  const { t } = useTranslation();
  const { statement } = useStatement();
  const { downloadStatement, loading } = useDownloadStatement();
  const [medicineConditionIsOpen, setMedicineConditionIsOpen] = useState(false);
  const [paymentStatement, setPaymentStatement] = useState(false);

  const { searchParams } = useQueryParams();
  useDictionary(DictionaryTypes.RequestStatusDictionary);

  const status = useDictionaryByKey(
    statement[PharmacyFields.paymentDetails]?.[PharmacyFields.status] as number,
    DictionaryTypes.RequestStatusDictionary,
  );

  useEffect(() => {
    if (searchParams.success === 'True') {
      toast(
        <div className="flex items-center">
          <img src="/images/success-icon.svg" alt="" />
          <div className="m-l-8">{t('paymentSuccess')}</div>
        </div>,
        {
          autoClose: 2000,
          hideProgressBar: true,
          position: 'top-center',
          type: 'success',
        },
      );
    } else if (searchParams.success === 'False') {
      toast(
        <div className="flex items-center">
          <img src="/images/error-icon.svg" alt="" />
          <div className="m-l-8">{searchParams.error}</div>
        </div>,
        {
          autoClose: 2000,
          hideProgressBar: true,
          position: 'top-center',
          type: 'error',
        },
      );
    }
  }, []);

  return (
    <div className="payment-succeed-container">
      <div className="payment-succeed-wrapper">
        {searchParams.success === 'True' ? (
          <>
            <div className="payment-succeed-title">
              {t('paymentSucceedTitle', {
                address: statement[PharmacyFields.paymentDetails]?.[PharmacyFields.address],
                pharmacy: statement[PharmacyFields.paymentDetails]?.[PharmacyFields.pharmacy],
              })}
            </div>
            <div className="payment-pharmacy-condition">{t('pharmacyTakeCondition')}</div>
            <div className="medicine-info">
              <div className="medicine-info-container">
                <div className="medicine-info-container-header">
                  <div className={classnames('medicine-info-container-title', { ellipsis: !medicineConditionIsOpen })}>
                    {t('pharmacyCondition')}
                  </div>
                  <div
                    className="medicine-info-container-action cursor"
                    onClick={() => setMedicineConditionIsOpen((prevState) => !prevState)}
                  >
                    {t(medicineConditionIsOpen ? 'close' : 'more')}
                  </div>
                </div>
                <div className={classnames({ 'medicine-invisible': !medicineConditionIsOpen })}>
                  {statement[PharmacyFields.medicaments]?.map((medicament, i) => (
                    <div className="medicine-type" key={i}>
                      <div className="medicine-type-name">{medicament?.[PharmacyFields.name]}</div>
                      <div className="medicine-type-description-container">
                        {medicament?.[PharmacyFields.description]}
                      </div>
                    </div>
                  ))}
                  <MButton
                    text="downloadCondition"
                    onClick={() => {
                      downloadStatement(statement[PharmacyFields.paymentDetails]![PharmacyFields.requestId]);
                    }}
                    className="w-100 m-t-16"
                    icon={<img src="/images/download.svg" alt="" />}
                    // disabled={loading}
                  />
                </div>
              </div>
            </div>
          </>
        ) : null}
        <div className="payment-statement">
          <div className="payment-statement-container">
            <div className="payment-statement-container-header">
              <div className={classnames('payment-statement-container-title', { ellipsis: !paymentStatement })}>
                {t('paymentStatement')}
              </div>
              {searchParams.success === 'True' ? (
                <div
                  className="payment-statement-container-action cursor"
                  onClick={() => setPaymentStatement((prevState) => !prevState)}
                >
                  {t(paymentStatement ? 'close' : 'more')}
                </div>
              ) : null}
            </div>
            <div
              className={classnames({ 'medicine-invisible': !paymentStatement && searchParams.success !== 'False' })}
            >
              <div className="p-t-4">
                <div className="flex space-between m-t-12">
                  <div className="payment-statement-label">{t('status')}</div>
                  <div className="payment-statement-middle-line">
                    <div />
                  </div>
                  <div className="payment-statement-label-right">{status}</div>
                </div>
                <div className="flex space-between m-t-12">
                  <div className="payment-statement-label">{t('price')}</div>
                  <div className="payment-statement-middle-line">
                    <div />
                  </div>
                  <div className="payment-statement-label-right">
                    {statement[PharmacyFields.paymentDetails]?.[PharmacyFields.price]} ֏
                  </div>
                </div>
                <div className="flex space-between m-t-12">
                  <div className="payment-statement-label">{t('date')}</div>
                  <div className="payment-statement-middle-line">
                    <div />
                  </div>
                  <div className="payment-statement-label-right">
                    {dateFormatter(statement[PharmacyFields.paymentDetails]?.[PharmacyFields.date] as string)}
                  </div>
                </div>
                <div className="flex space-between m-t-12">
                  <div className="payment-statement-label">{t('orderId')}</div>
                  <div className="payment-statement-middle-line">
                    <div />
                  </div>
                  <div className="payment-statement-label-right">
                    {statement[PharmacyFields.paymentDetails]?.[PharmacyFields.requestId]}
                  </div>
                </div>
                <div className="flex space-between m-t-12">
                  <div className="payment-statement-label">{t('approvalCode')}</div>
                  <div className="payment-statement-middle-line">
                    <div />
                  </div>
                  <div className="payment-statement-label-right">
                    {statement[PharmacyFields.paymentDetails]?.[PharmacyFields.approvalCode]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSucceed;
