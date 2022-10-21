import { useEffect } from 'react';

export const useEscPress = callback => {
  useEffect(() => {
    const onEscPress = e => {
      const code = e.code;
      if (code !== 'Escape') return;
      callback();
    };
    document.addEventListener('keydown', onEscPress);

    return () => {
      document.removeEventListener('keydown', onEscPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
