import Image, { ImageProps } from 'next/image'
import { useEffect, useState } from 'react';
import { getImageSignedUrl, getPublicUrl } from '../../service-clients/image-service-client';


interface Props extends ImageProps {
  isPublicBucket: boolean;
  filePath: string;
  bucket: string;
}

export default function SupabaseImage(props: Props): JSX.Element {
  const {isPublicBucket, bucket, filePath, ...others} = props;
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    (async (): Promise<void> => {
      if (isPublicBucket) {
        const response = getPublicUrl(bucket, filePath);
        if (response.error) throw response.error;
        setUrl(response.publicURL);
      } else {
        const response = await getImageSignedUrl(bucket, filePath);
        if (response.error) throw response.error;
        setUrl(response.signedURL);
      }
    })()
  }, [isPublicBucket, bucket, filePath])
  if (url == null) return <></>;
  return <Image {...others} src={url}/>
}
