import './index.scss';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="flex items-center">{t('forQuestionsCall')}</div>
      <a href="tel:+37494741775">+ 374 94 74 17 75</a>
    </footer>
  );
};

export default Footer;
