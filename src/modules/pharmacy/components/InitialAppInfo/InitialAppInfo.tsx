import { useTranslation } from 'react-i18next';
import './index.scss';
import MButton from '../../../../components/FormControls/MButton/MButton.tsx';
import { type FC } from 'react';
import MPhoneButton from '../../../../components/FormControls/MPhoneButton/MPhoneButton.tsx';

interface IInitialAppInfo {
  onClose: () => void;
}

const InitialAppInfo: FC<IInitialAppInfo> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="initial-info-container">
      {/*<MSelect options={[]} name="asd" />*/}
      <div className="initial-info-content">
        <div className="initial-info-logo-description">
          <div className="initial-info-armed-logo">
            <img src="/images/armed.svg" alt="" />
          </div>
          <div className="initial-info-title">{t('firstPageTitle')}</div>
        </div>
        <div>
          <div className="initial-info-item">
            <img src="/images/market-cart.svg" alt="" />
            <div>{t('buyMedicineOnline')}</div>
          </div>
          <div className="initial-info-item m-t-16">
            <img src="/images/green-marker.svg" alt="" />
            <div>{t('takeFromPharmacy')}</div>
          </div>
          <div className="initial-info-item m-t-16">
            <img src="/images/gift.svg" alt="" />
            <div>{t('takeGift')}</div>
          </div>
        </div>
        <MButton
          text="goToMyPrescription"
          onClick={() => {
            onClose();
          }}
          className="w-100 m-t-24"
        />
        <MPhoneButton text="connectUs" className="w-100 m-t-16" />
      </div>
      <div className="initial-info-footer">
        <div className="label">{t('partnerPharmacies')}</div>
        <div className="initial-info-pharmacies">
          <div className="initial-info-footer-item">
            <div className="footer-image-container alfa-logo">
              <img src="/images/Alfa_logo.png" alt="" />
            </div>
          </div>
          <div className="initial-info-footer-item">
            <div className="footer-image-container asteria-logo">
              <img src="/images/asteria-info-small-logo.svg" alt="" />
              {/*<div className="footer-soon">{t('soon')}</div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialAppInfo;
