import {
  Box,
  Button,
  Center,
  Container,
  Group,
  Text,
  Title,
} from '@mantine/core';
import { Download, Upload } from 'tabler-icons-react';
import FileList from '../components/FileList';
import FileMenu from '../components/FileMenu';
import Page from '../components/Page';

const FileDetailPage = ({ file }) => {
  return (
    <Page>
      <Center>
        <Container>
          <Center sx={{ margin: '5rem 0 2rem 0' }}>
            <Group position="apart" sx={{ width: '90vw' }}>
              <Group spacing="md" sx={{ alignItems: 'flex-end' }}>
                <Title order={1}>{file.name}</Title>
                <Text size="xl" color="dimmed" weight={400}>
                  uploaded by{' '}
                  <Text component="span" size="lg" weight={600}>
                    Kerzoken
                  </Text>
                </Text>
              </Group>
              <FileMenu file={file} />
            </Group>
          </Center>

          <Group position="right">
            <Button leftIcon={<Download />}>Download</Button>
            <Button variant="outline" leftIcon={<Upload />}>
              Upload new revision
            </Button>
          </Group>

          <Text size="lg">File description</Text>

          <Box pt={52}>
            <Title order={2} pb={15}>
              Revisions
            </Title>
            <FileList files={file.revisions} />
          </Box>
        </Container>
      </Center>
    </Page>
  );
};

export default FileDetailPage;

export const getServerSideProps = () => {
  return {
    props: {
      file: {
        name: 'filosofiq_definicii.org',
        project: 'f35ecdf6-ab2c-4a20-a31e-3d285349b633',
        file: '/files/Team/Project%201/filosofiq_definicii.org',
        revisions: [
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
            id: 3,
            name: 'File 5',
            lastModified: '2020-01-04',
          },
          {
            id: 3,
            name: 'File 6',
            lastModified: '2020-01-04',
          },
          {
            id: 3,
            name: 'File 7',
            lastModified: '2020-01-04',
          },
        ],
      },
    },
  };
};
