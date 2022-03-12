import { Group } from '@mantine/core';
import Sidebar from './Sidebar';
import UserAvatar from './UserAvatar';

const UserSidebar = ({ users }) => {
  return (
    <Sidebar side="left">
      <Group direction="column">
        {users.map((user) => (
          <Group direction="row" key={user.uuid}>
            <UserAvatar
              username={`${user.firstName} ${user.lastName}`}
            ></UserAvatar>
            <p>{`${user.firstName} ${user.lastName}`}</p>
          </Group>
        ))}
      </Group>
    </Sidebar>
  );
};

export default UserSidebar;
