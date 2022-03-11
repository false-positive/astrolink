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
              formdata.append('project', '1');
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

export const getStaticProps = () => {
  return {
    props: {
      files: [
        {
          id: 0,
          name: 'File 1',
          lastModified: '2020-01-01',
        },
        {
          id: 1,
          name: 'File 2',
          lastModified: '2020-01-02',
        },
        {
          id: 2,
          name: 'File 3',
          lastModified: '2020-01-03',
        },
        {
          id: 3,
          name: 'File 4',
          lastModified: '2020-01-04',
        },
        {
          id: 4,
          name: 'File 5',
          lastModified: '2020-01-04',
        },
        {
          id: 5,
          name: 'File 6',
          lastModified: '2020-01-04',
        },
        {
          id: 6,
          name: 'File 7',
          lastModified: '2020-01-04',
        },
      ],
    },
  };
};
