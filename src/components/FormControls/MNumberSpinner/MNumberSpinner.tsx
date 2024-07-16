import { useTranslation } from 'react-i18next';
import { type FC } from 'react';
import './index.scss';
import MInput from '../MInput/MInput.tsx';
import { NUMERIC_REGEXP } from '../../../utils/regex.ts';

interface MCheckbox {
  value: number;
  minimumNumber: number;
  maximumNumber: number;
  onChange: (value: number, type?: string) => void;
}

const MNumberSpinner: FC<MCheckbox> = ({ value, minimumNumber, maximumNumber, onChange }) => {
  const { t } = useTranslation();

  const changeHandler = (type: string) => () => {
    const minus = type === 'minus';
    const plus = type === 'plus';

    if (value === minimumNumber && minus) {
      return;
    }

    if (value === maximumNumber && plus) {
      return;
    }

    const newValue: number = minus ? +value - 1 : +value + 1;
    onChange?.(newValue, type);
  };

  return (
    <div className="number-spinner-wrapper flex">
      <div className="number-spinner cursor flex m-r-8" onClick={changeHandler('minus')}>
        <img
          src={
            +value === minimumNumber ? '/images/number-spinner-minus-disabled.svg' : '/images/number-spinner-minus.svg'
          }
          alt=""
        />
      </div>
      <MInput
        value={value}
        className="flex"
        regexp={NUMERIC_REGEXP(0, 10000000)}
        onChange={(event) => onChange(+event.target.value)}
        warning={!+value}
        suffix={t('count')}
      />
      <div className="number-spinner cursor flex m-l-8" onClick={changeHandler('plus')}>
        <img
          src={value >= maximumNumber ? '/images/number-spinner-plus-disabled.svg' : '/images/number-spinner-plus.svg'}
          alt=""
        />
      </div>
    </div>
  );
};

export default MNumberSpinner;
