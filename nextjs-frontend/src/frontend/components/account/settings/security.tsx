import { FormLabel, Switch } from '@mui/material';

const Security = (): JSX.Element => {
  return (
    <>
      <FormLabel>
                Account Privacy {'(Public) '}
      </FormLabel>
      <Switch defaultChecked={true} />
    </>
  )
}

export default Security;