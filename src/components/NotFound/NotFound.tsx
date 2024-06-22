import { useTranslation } from 'react-i18next';
import './index.scss';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-text-logo">
          <img src="/images/404.svg" alt="" />
          <div>{t('notFoundPage')}</div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
