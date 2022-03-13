import { Group, Text } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { useNotifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CircleCheck } from 'tabler-icons-react';
import { uploadFile } from '../api/file';

export const dropzoneChildren = () => (
  <Group
    position="center"
    spacing="xl"
    style={{ minHeight: 220, pointerEvents: 'none' }}
  >
    <div>
      <Text size="xl" inline>
        Drag images here or click to select files
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        Attach as many files as you like.
      </Text>
    </div>
  </Group>
);

const FileUploadDropzone = ({ filename }) => {
  const router = useRouter();
  const notifications = useNotifications();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dropzone
      loading={isLoading}
      onDrop={(uploadedFiles) => {
        setIsLoading(true);
        uploadedFiles.forEach(async (file, i) => {
          const response = await uploadFile(
            router.query.projectId,
            file,
            filename
          );
          if (response.ok) {
            notifications.showNotification({
              title: `File ${file.name} uploaded successfully`,
              icon: <CircleCheck size={20} />,
              color: 'green',
              autoClose: 3000,
            });
            router.push(router.asPath, null, { scroll: false });
          }
          if (i === uploadedFiles.length - 1) {
            setIsLoading(false);
          }
        });
      }}
      mb={50}
      // onReject={(uploadedFiles) =>
      //   console.log('rejected files', uploadedFiles)
      // }
      // maxSize={3 * 1024 ** 2}
    >
      {dropzoneChildren}
    </Dropzone>
  );
};

export default FileUploadDropzone;
