import './index.scss';
import { type FC } from 'react';

const MRadio: FC<{ selectedValue: boolean; value: string; onChange: (value: string) => void }> = ({
  selectedValue,
  value,
  onChange,
}) => (
  <div className="radio-container">
    <input type="radio" checked={selectedValue} value={value} onChange={(event) => onChange(event.target.value)} />
  </div>
);

export default MRadio;
