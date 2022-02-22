import { ChangeEvent, useEffect, useRef } from 'react';
import { AllowedExtensions } from '../../../models/constants';

interface Props {
  onFileSelected: (files: FileList | null) => Promise<void>;
  onError: (error: string) => void;
  allowedExtensions: AllowedExtensions[];
  show: boolean;
  maxFiles: number;
  minFiles: number;
  maxFileSizeInBytes: number
}

export default function NoobFilePicker(props: Props): JSX.Element {
  const {onFileSelected, allowedExtensions, show, maxFileSizeInBytes, minFiles, maxFiles, onError} = props;
  const acceptedExtensions = allowedExtensions.join(',');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!show) return;
    inputRef.current?.click()
  }, [show]);

  function validate(files: FileList | null): string | undefined {
    if (minFiles > 0 && (files == null || files.length === 0 )) return `At least ${minFiles} required!`;
    if (files != null && files.length > maxFiles) return `Cannot select more than ${maxFiles} files!`;
    if (files == null) return;
    for(let i = 0; i < files.length; i ++) {
      if (files[i].size > maxFileSizeInBytes) return `Max allowed file size is ${maxFileSizeInBytes} bytes`;
      if (allowedExtensions.every((x)=> !files[i].name.endsWith(x))) return `Allowed file types are ${acceptedExtensions}.`;
    }
  }

  function onFilesSelected(event: ChangeEvent<HTMLInputElement>): void {
    const files = event.target.files;
    const error = validate(files);
    if (error != null) {
      onError(error);
    } else {
      onFileSelected(files);
    }
  }

  return <input type="file" ref={inputRef} style={{display: 'none'}} onChange={onFilesSelected} accept={acceptedExtensions}/>
}
