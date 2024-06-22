import { useTranslation } from 'react-i18next';
import { type FC, type ReactElement } from 'react';
import './index.scss';
import classnames from 'classnames';

interface IMButton {
  text: string;
  success?: boolean;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
  icon?: ReactElement;
}

const MButton: FC<IMButton> = ({ text, success, className, disabled, onClick, icon }) => {
  const { t } = useTranslation();

  return (
    <button className={classnames('button-container', className)} disabled={disabled} onClick={onClick}>
      <div className={classnames({ 'button-text flex content-center': !success, success })}>
        {success ? <img src="/images/success.svg" alt="" /> : t(text)}
        {icon && <div className="flex p-l-4">{icon}</div>}
      </div>
    </button>
  );
};

export default MButton;
