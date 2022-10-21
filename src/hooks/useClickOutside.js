import { useEffect, useRef } from 'react';

export const useClickOutside = callback => {
  const domNode = useRef();

  useEffect(() => {
    const handleClickOutside = e => {
      if (!domNode.current?.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return domNode;
};
