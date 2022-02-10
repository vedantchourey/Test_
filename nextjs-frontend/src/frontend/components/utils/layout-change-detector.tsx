import { useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { useAppDispatch } from '../../redux-store/redux-store';
import { updateScreenDimensions } from '../../redux-store/layout/layout-slice';

export default function LayoutChangeDetector(): JSX.Element | null {
  const appDispatch = useAppDispatch();

  const debounceCallback = useCallback(debounce(() => {
    appDispatch(updateScreenDimensions());
  }, 300), []);

  const handleWindowSizeChange = (): void => {
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
