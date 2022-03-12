import {
  Center,
  Container,
  Group,
  Notification,
  Text,
  Title,
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { useState } from 'react/cjs/react.development';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useNotifications } from '@mantine/notifications';
import Page from '../components/Page';
import FileList from '../components/FileList';

import { getFiles } from '../api/file';

export const dropzoneChildren = (status) => (
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
  const a = async () => {
    console.log(await getFiles(1));
  };
  a();

  // console.log(process.env.NEXT_PUBLIC_API_URL);
  // console.log(getFiles(1));
  // const a = getFiles(1);
  // console.log(await getFiles(1));

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
            uploadedFiles.forEach(async (file) => {
              const formdata = new FormData();
              formdata.append('name', file.name);
              formdata.append(
                'project',
                '932603d2-2d5f-45a0-b05e-9f5fa607f500'
              );
              formdata.append('file', file, file.name);

              const requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow',
              };

              await fetch('http://localhost:8000/api/files/', requestOptions);
              setIsLoading(false);

              notifications.showNotification({
                title: 'Files uploaded successfully',
                icon: <BsFillCheckCircleFill size={20} />,
                color: 'green',
                autoClose: 3000,
              });
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

export const getServerSideProps = async () => {
  // console.log(process.env.NEXT_PUBLIC_API_URL);
  // console.log(getFiles(1));
  const allFiles = await getFiles(1);
  console.log(allFiles);

  return {
    props: {
      files: allFiles,
    },
  };
};
