import Image, { ImageProps } from 'next/image';
import { RootState, useAppSelector } from '../../redux-store/redux-store';

interface Props extends Omit<ImageProps, 'src'> {
  blobSelector: (rootState: RootState) => string | undefined;
  defaultImage?: string;
}

export default function ReduxCachedBlobImage(props: Props): JSX.Element {
  const {blobSelector, defaultImage, ...others} = props;
  const blob = useAppSelector(blobSelector);
  if (blob == null && defaultImage == null) return <></>;
  if (blob == null) return <Image src={defaultImage as string} {...others} />;
  return <Image layout="fill" src={blob as string} {...others} />;
}
