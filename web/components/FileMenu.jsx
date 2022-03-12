import { Divider, Menu } from '@mantine/core';
import { Download, Files, Trash, Upload } from 'tabler-icons-react';

const FileMenu = () => {
  return (
    <Menu>
      <Menu.Label>File</Menu.Label>
      <Menu.Item icon={<Download size={14} />}>Download</Menu.Item>
      <Menu.Item icon={<Upload size={14} />}>Upload new revision</Menu.Item>
      <Menu.Item icon={<Files size={14} />}>All files</Menu.Item>
      <Divider />
      <Menu.Label>Danger zone</Menu.Label>
      <Menu.Item color="red" icon={<Trash size={14} />}>
        Delete file
      </Menu.Item>
    </Menu>
  );
};

export default FileMenu;
