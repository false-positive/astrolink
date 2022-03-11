import { Avatar } from '@mantine/core';

const UserAvatar = ({ username, ...props }) => {
  return (
    <Avatar radius="xl" color="grape" {...props}>
      {username.charAt(0).toUpperCase()}
    </Avatar>
  );
};

export default UserAvatar;
