import { Divider, Menu, Modal } from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Download, Trash } from 'tabler-icons-react';
import { deleteFile, deleteRevision } from '../api/file';
import FileUploadDropzone from './FileUploadDropzone';

const RevisionMenu = ({ revision, project, file }) => {
  const [openedRevise, setOpenedRevise] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm('Delete revision?')) {
      deleteRevision(project, file, revision.revision);
      router.push(router.asPath, null, { scroll: false });
    }
  };

  const downloadUrl = `${process.env.NEXT_PUBLIC_API_URL}/projects/${project}/files/${file}/revisions/${revision.revision}/download`;

  return (
    <>
      <Modal
        size="md"
        centered
        opened={openedRevise}
        onClose={() => setOpenedRevise(false)}
        title="Create New Milestone"
      >
        <FileUploadDropzone filename={revision.name} />
      </Modal>
      <Menu>
        <Menu.Label>File</Menu.Label>
        <Menu.Item
          component="a"
          href={downloadUrl}
          icon={<Download size={14} />}
        >
          Download
        </Menu.Item>
        <Divider />
        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          color="red"
          icon={<Trash size={14} />}
          onClick={handleDelete}
        >
          Delete revision
        </Menu.Item>
      </Menu>
    </>
  );
};

export default RevisionMenu;
