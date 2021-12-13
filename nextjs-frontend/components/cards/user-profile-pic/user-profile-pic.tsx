import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { downloadImage } from '../../../services/front-end-services/image-service';
import { authenticatedUser } from '../../../services/front-end-services/auth/auth-service';

export default function UserProfilePic() {

  const [imageUrl, setImageUrl] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      if (imageUrl != null) return;
      const user = await authenticatedUser();
      if (user == null) return;
      const usersAvatar = await downloadImage('resources', `avatars/${user.id}`);
      if (usersAvatar.data == null) return;
      const objectURL: string = URL.createObjectURL(usersAvatar.data);
      setImageUrl(objectURL);
    })();
  });


  return (
    <Card sx={{maxWidth: 70}}>
      <div>
      </div>
    </Card>
  )
}
