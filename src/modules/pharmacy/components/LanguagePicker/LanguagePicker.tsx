import React, { useState, useRef, useEffect } from 'react';
import './index.scss';
import hyFlag from '/images/hy-flag.svg';
import enFlag from '/images/en-flag.svg';
import ruFlag from '/images/ru-flag.svg';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

interface Language {
  code: string;
  img: string;
}

const languages: Language[] = [
  { code: 'hy', img: hyFlag },
  { code: 'ru', img: ruFlag },
  { code: 'en', img: enFlag },
];

const LanguagePicker: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { i18n } = useTranslation();

  const selectedLanguage = i18n.language;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="language-picker-container flex cursor" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex m-r-8">
          <img src={`/images/${selectedLanguage}-flag.svg`} alt="" />
        </div>
        <div className="language-picker-open-close flex">
          {isOpen ? <img src="/images/language-opened.svg" alt="" /> : <img src="/images/language-closed.svg" alt="" />}
        </div>
      </div>
      <div className={classnames('dropdown-content', { 'visibility-hidden': !isOpen })}>
        <ul>
          {languages.map((language) => {
            if (language.code !== selectedLanguage) {
              return (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <li
                  key={language.code}
                  onClick={() => {
                    setIsOpen(false);
                    void i18n.changeLanguage(language.code);
                  }}
                  className="cursor"
                >
                  <img src={language.img} alt="" />
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default LanguagePicker;
