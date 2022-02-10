import { SvgIcon, SvgIconProps } from '@mui/material';
import * as React from 'react';

export default function MessageIcon(props: SvgIconProps): JSX.Element {
  return (
    <SvgIcon {...props}>
      <path d="M20 1H4C1.8 1 0 2.8 0 5V15C0 17.2 1.8 19 4 19V22C4 22.9 5.1 23.3 5.7 22.7L9.4 19H20C22.2 19 24 17.2 24 15V5C24 2.8 22.2 1 20 1ZM14 13H8C7.4 13 7 12.6 7 12C7 11.4 7.4 11 8 11H14C14.6 11 15 11.4 15 12C15 12.6 14.6 13 14 13ZM16 9H8C7.4 9 7 8.6 7 8C7 7.4 7.4 7 8 7H16C16.6 7 17 7.4 17 8C17 8.6 16.6 9 16 9Z" fill="white" />
    </SvgIcon>
  );
}
