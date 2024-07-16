import { NumericFormat } from 'react-number-format';
import { useTranslation } from 'react-i18next';

import './index.scss';
import { type FC } from 'react';
import classnames from 'classnames';

interface IMPatternFormatInput {
  onChange?: (value: string) => void;
  format?: string;
  disabled?: boolean;
  numericFormat?: boolean;
  decimalScale?: number;
  value: number;
  regexp?: RegExp;
  className?: string;
  warning: boolean;
  suffix?: string;
}

const MPatternFormatInput: FC<IMPatternFormatInput> = ({
  onChange,
  format = '',
  numericFormat,
  decimalScale = 0,
  value,
  regexp,
  className,
  warning,
  suffix,
  ...props
}) => {
  const { t } = useTranslation();

  const handleChange = (value: string) => {
    if (regexp) {
      if (value.match(regexp) || !value) {
        void onChange?.(value);
      }
    } else {
      void onChange?.(value);
    }
  };

  return (
    <div className={classnames('input-wrapper', className, { warning })}>
      <NumericFormat
        className={classnames('input')}
        value={value}
        onValueChange={(values) => {
          handleChange(values.value);
        }}
        valueIsNumericString={true}
        // className={classnames('input', { 'with-error': error?.message })}
        // thousandSeparator=","
        decimalScale={decimalScale}
        suffix={suffix}
      />
      {/*<div className="error-message">{error?.message}</div>*/}
    </div>
  );
  // }

  // return (
  //   <div className="input-wrapper">
  //     <div className="input-label">{t(label)}</div>
  //     <PatternFormat
  //       {...props}
  //       format={format}
  //       value={value}
  //       onValueChange={(values) => {
  //         handleChange(values.value);
  //       }}
  //       valueIsNumericString={true}
  //       // className={classnames('input', { 'with-error': error?.message })}
  //       allowEmptyFormatting
  //     />
  //     {/*<div className="error-message">{error?.message}</div>*/}
  //   </div>
  // );
};

export default MPatternFormatInput;
