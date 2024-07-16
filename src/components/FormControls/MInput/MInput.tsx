import { useTranslation } from 'react-i18next';
import './index.scss';
import { type ChangeEvent, type FC, type InputHTMLAttributes, useLayoutEffect, useRef, useState } from 'react';
import classnames from 'classnames';

interface IMInput extends InputHTMLAttributes<HTMLInputElement> {
  value: string | number;
  isDisabled?: boolean;
  label?: string;
  regexp?: RegExp;
  className?: string;
  warning?: boolean;
  suffix?: string;
}

const inputPadding = 20 as const;
const suffixGap = 5 as const;

const MInput: FC<IMInput> = ({ value, onChange, suffix, placeholder, label, className, regexp, warning, ...props }) => {
  const { t } = useTranslation();
  const suffixRef = useRef<HTMLSpanElement>(null);

  const [inputRightPadding, setInputRightPadding] = useState<number>(0);

  useLayoutEffect(() => {
    const suffixWidth = suffixRef.current?.offsetWidth;
    setInputRightPadding(suffix && suffixWidth ? suffixWidth + (inputPadding + suffixGap) : inputPadding);
  }, [suffix]);

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
        style={{
          // padding: inputPadding,
          paddingRight: inputRightPadding,
        }}
        {...props}
      />
      {suffix ? (
        <div className="input-fake-value-wrapper" style={{ gap: suffixGap, padding: 10 }}>
          <span className="input-fake-value">{value || placeholder}</span>
          <span ref={suffixRef} className="suffix">
            {suffix}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default MInput;
