import { useTranslation } from 'react-i18next';
import { type FC, type ReactElement } from 'react';
import classnames from 'classnames';
import './index.scss';

interface IMButton {
  text: string;
  success?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  icon?: ReactElement;
}

const MPhoneButton: FC<IMButton> = ({ text, success, className, disabled, onClick, icon }) => {
  const { t } = useTranslation();

  return (
    <button className={classnames('phone-button-container', className)} disabled={disabled} onClick={onClick}>
      <a href="tel:+37494741775">
        <div className={classnames({ 'button-text flex content-center': !success, success })}>
          <div className="flex p-r-4 items-center">
            <img src="/images/phone.svg" alt="" />
          </div>
          <div className="flex items-center">{t(text)}</div>
        </div>
      </a>
    </button>
  );
};

export default MPhoneButton;
