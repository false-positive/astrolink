import { Divider, Menu } from '@mantine/core';
import { useRouter } from 'next/router';
import { Download, Files, Trash, Upload } from 'tabler-icons-react';
import { deleteFile } from '../api/file';
import StyledLink from './StyledLink';

const FileMenu = ({ file }) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm('Delete file?')) {
      deleteFile(file.project, file.id);
      router.push(router.asPath, null, { scroll: false });
    }
  };

  const downloadUrl = `${process.env.NEXT_PUBLIC_API_URL}/projects/${file.project}/files/${file.id}/download`;
  const allFilesUrl = `/projects/${file.project}/files`;

  return (
    <Menu>
      <Menu.Label>File</Menu.Label>
      <Menu.Item component="a" href={downloadUrl} icon={<Download size={14} />}>
        Download
      </Menu.Item>
      <Menu.Item icon={<Upload size={14} />}>Upload new revision</Menu.Item>
      <Menu.Item
        component={StyledLink}
        href={allFilesUrl}
        icon={<Files size={14} />}
      >
        All files from project
      </Menu.Item>
      <Divider />
      <Menu.Label>Danger zone</Menu.Label>
      <Menu.Item color="red" icon={<Trash size={14} />} onClick={handleDelete}>
        Delete file
      </Menu.Item>
    </Menu>
  );
};

export default FileMenu;
