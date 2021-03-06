import { Avatar, AvatarsGroup, Box } from '@mantine/core';
import { useState } from 'react';
// import UserAvatar from './UserAvatar';

const UsersRow = ({ users }) => {
  const [showAll, setShowAll] = useState(false);

  const limit = showAll ? users.length : 5;
  const usernames = users.map(
    ({ firstName, lastName }) => `${firstName} ${lastName}`
  );

  return (
    <Box
      sx={{ overflowX: 'auto', cursor: 'pointer' }}
      onClick={() => setShowAll(!showAll)}
    >
      <AvatarsGroup limit={limit}>
        {usernames.map((user, i) => (
          <Avatar key={i} radius="xl" color="grape">
            {user.charAt(0).toUpperCase()}
          </Avatar>
        ))}
      </AvatarsGroup>
    </Box>
  );
};

export default UsersRow;
