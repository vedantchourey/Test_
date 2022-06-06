import Popover from '@mui/material/Popover';
import * as React from 'react';
import commonStyles from '../../styles/common.module.css';
import Heading from "../ui-components/typography/heading";

export default function BasicPopover(props:string) {
  
  const open = Boolean(props);
  console.log("Open: " +open)

  return (
      <Popover
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
       <div className={commonStyles.container}>
          <Heading divider heading={"Notifications"} />
        </div>
      </Popover>
  );
}