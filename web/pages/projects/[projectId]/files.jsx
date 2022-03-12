import { Center, Container, Group, Text, Title } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { useState } from 'react/cjs/react.development';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useNotifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import Page from '../../../components/Page';
import FileList from '../../../components/FileList';

import { getFiles, uploadFile } from '../../../api/file';

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
        Attach as many files as you like, each file should not exceed 5mb
      </Text>
    </div>
  </Group>
);

const AllFiles = ({ files }) => {
  const router = useRouter();
  const notifications = useNotifications();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Page>
      <Container size="lg">
        <Center style={{ margin: '2rem 0 3rem 0', width: '100%' }}>
          <Title order={1}>All Files</Title>
        </Center>

        <Dropzone
          loading={isLoading}
          onDrop={(uploadedFiles) => {
            setIsLoading(true);
            uploadedFiles.forEach(async (file, i) => {
              const response = await uploadFile(router.query.projectId, file);
              if (response.ok) {
                notifications.showNotification({
                  title: `File ${file.name} uploaded successfully`,
                  icon: <BsFillCheckCircleFill size={20} />,
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
          {(status) => dropzoneChildren(status)}
        </Dropzone>

        <FileList files={files} />
      </Container>
    </Page>
  );
};

export default AllFiles;

export const getServerSideProps = async ({ params }) => {
  const { projectId } = params;
  const files = await getFiles(projectId);
  return {
    props: {
      files: files.reverse(),
    },
  };
};
