import { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { useEscPress } from '../hooks/useEscPress';
import { useClickOutside } from '../hooks/useClickOutside';

import s from '../styles/components/Select.module.scss';

const Select = ({ options, onChange }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedOptionIdx, setHighlightedOptionIdx] = useState(0);
  const inputRef = useRef();

  const openOptions = () => {
    setIsOpen(true);
  };
  // const toggleOptions = () => setIsOpen(prevState => !prevState);
  const closeOptions = () => {
    setIsOpen(false);
    setHighlightedOptionIdx(0);
    inputRef.current.blur();
  };
  useEscPress(closeOptions);
  const selectRef = useClickOutside(closeOptions);

  const onChangeInput = e => {
    const value = e.target.value;
    setQuery(value);
  };

  const onChooseValue = idx => {
    const chosenOption = filteredOptions.at(idx);
    onChange(chosenOption.value);
    setQuery(chosenOption.label);
    closeOptions();
  };

  // useEffect(() => {
  //   const handleKeyboardEvents = e => {
  //     if (!selectRef.current.contains(e.target)) return;
  //     // e.preventDefault();

  //     switch (e.code) {
  //       case 'Space':
  //       case 'Enter':
  //       case 'NumpadEnter':
  //         toggleOptions();
  //         const valueIdx = options.findIndex(option => option.value === value);
  //         if (highlightedOptionIdx !== valueIdx && !isOpen)
  //           onChooseValue(highlightedOptionIdx);
  //         break;
  //       case 'ArrowUp':
  //       case 'ArrowDown':
  //       case 'Tab': {
  //         inputRef.current.blur();
  //         setHighlightedOptionIdx(prevState => {
  //           const newIdx = prevState + (e.code === 'ArrowUp' ? -1 : 1);
  //           if (newIdx >= 0 && newIdx < filteredOptions.length) {
  //             return newIdx;
  //           }
  //           return prevState;
  //         });

  //         break;
  //       }
  //       default:
  //     }
  //   };
  //   document.addEventListener('keydown', handleKeyboardEvents);
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyboardEvents);
  //   };
  // }, []);

  const filteredOptions = useMemo(
    () =>
      options.filter(({ label }) =>
        label.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [options, query],
  );

  return (
    <div tabIndex="0" ref={selectRef}>
      <input
        type="text"
        ref={inputRef}
        value={query}
        onClick={openOptions}
        onChange={onChangeInput}
        className={s.input}
      />
      {isOpen && (
        <ul className={s.list}>
          {filteredOptions.map(({ label, value }, idx) => (
            <li
              key={value}
              onClick={() => onChooseValue(idx)}
              onMouseEnter={() => setHighlightedOptionIdx(idx)}
              tabIndex={0}
              className={`${s.item} ${
                idx === highlightedOptionIdx ? s.itemActive : ''
              }`}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
