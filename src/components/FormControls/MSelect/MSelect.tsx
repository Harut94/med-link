import { type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
// import { useController, useFormContext } from 'react-hook-form';
import Select, {
  components,
  type SingleValue,
  type DropdownIndicatorProps,
  type GroupBase,
  type OptionProps,
} from 'react-select';
// import { type TOption } from '../../../modules/pharmacy/data/packagesTypes.ts';
import './index.scss';
import classnames from 'classnames';

export type TOption = { value: number; label: string };

export type TOptions = TOption[];

interface IMSelect<T> {
  selectedValue: TOption;
  options: T[];
  isDisabled?: boolean;
  label?: string;
  classNames?: Record<string, string>;
  onChange: (value: SingleValue<TOption>) => void;
  singleOption?: boolean;
}

const MSelect = <T,>({
  selectedValue,
  options,
  isDisabled,
  label,
  classNames = {},
  onChange,
  singleOption,
}: IMSelect<T>) => {
  const { t } = useTranslation();

  const onChangeHandler = (value: SingleValue<TOption>) => {
    onChange(value);
  };

  return (
    <div className="select-wrapper">
      <div className={classnames('select-label', { disabled: { isDisabled } })}>{label}</div>
      <Select
        components={{
          DropdownIndicator: singleOption ? () => null : DropdownIndicator,
          // @ts-ignore
          Option,
        }}
        // @ts-ignore
        options={options}
        // @ts-ignore
        onChange={onChangeHandler}
        isDisabled={isDisabled}
        value={selectedValue}
        classNames={{
          container: () => 'modal-select-container',
          control: () => classnames('modal-select-control'),
          indicatorSeparator: () => 'modal-select-indicator-separator',
          valueContainer: () => 'modal-value-container',
          menu: () => 'modal-select-menu',
          menuList: () => 'modal-select-menu-list',
          ...classNames,
        }}
        //{...restField}
      />
      {/*<div className="error-message">{error?.message}</div>*/}
    </div>
  );
};

const DropdownIndicator = ({
  selectProps: { menuIsOpen },
}: DropdownIndicatorProps<TOption, boolean, GroupBase<TOption>>): ReactElement => (
  <div>
    {menuIsOpen ? (
      <img src="/images/down-arrow.svg" alt="" className="rotated-arrow" />
    ) : (
      <img src="/images/down-arrow.svg" alt="" className="arrow" />
    )}
  </div>
);

const Option = (props: OptionProps) => (
  <components.Option {...props}>
    <div className="flex space-between">
      <div>{props.label}</div>
      {props.isSelected ? <img src="/images/checkmark.svg" alt="" /> : null}
    </div>
  </components.Option>
);

export default MSelect;
