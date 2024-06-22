import { useTranslation } from 'react-i18next';
import './index.scss';

const PharmacyNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="pharmacy-not-found-container">
      <div className="content">
        <img src="/images/pharmacy-not-found.svg" alt="" />
        <div className="description">{t('pharmacyNotFound')}</div>
      </div>
    </div>
  );
};

export default PharmacyNotFound;
