import { Avatar } from '@mantine/core';

const UserAvatar = ({ username }) => {
  return (
    <Avatar radius="xl" color="grape">
      {username.charAt(0).toUpperCase()}
    </Avatar>
  );
};

export default UserAvatar;
