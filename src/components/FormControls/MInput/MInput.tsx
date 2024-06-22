import { useTranslation } from 'react-i18next';
import './index.scss';
import { type ChangeEvent, type FC, type InputHTMLAttributes } from 'react';
import classnames from 'classnames';

interface IMInput extends InputHTMLAttributes<HTMLInputElement> {
  value: string | number;
  isDisabled?: boolean;
  label?: string;
  regexp?: RegExp;
  className?: string;
  warning?: boolean;
}

const MInput: FC<IMInput> = ({ value, onChange, placeholder, label, className, regexp, warning, ...props }) => {
  const { t } = useTranslation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (regexp) {
      if (event.target.value.match(regexp) || !event.target.value) {
        void onChange?.(event);
      }
    } else {
      void onChange?.(event);
    }
  };

  return (
    <div className={classnames('input-wrapper', className, { warning })}>
      <div className="input-label">{label}</div>
      <input
        className={classnames('input')}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        {...props}
      />
    </div>
  );
};

export default MInput;
