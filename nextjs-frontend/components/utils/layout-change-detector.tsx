import { useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { useAppDispatch } from '../../store/redux-store';
import { updateScreenDimensions } from '../../store/layout/layout-slice';

export default function LayoutChangeDetector() {
  const appDispatch = useAppDispatch();

  const debounceCallback = useCallback(debounce(() => {
    appDispatch(updateScreenDimensions());
  }, 300), []);

  const handleWindowSizeChange = () => {
    debounceCallback();
  };

  useEffect(() => {
    appDispatch(updateScreenDimensions());
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  return null;
}
