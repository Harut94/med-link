import './index.scss';
import { useTranslation } from 'react-i18next';

const DesktopInformation = () => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="content">
        <div className="title">{t('desktopInformationTitle')}</div>
      </div>
    </div>
  );
};

export default DesktopInformation;
