import { Center, Container, createStyles, Title } from '@mantine/core';
import Page from '../components/Page';
import FileList from '../components/FileList';

const AllFiles = ({ files }) => {
  return (
    <Page>
      <Container size="lg">
        <Center style={{ margin: '2rem 0 3rem 0', width: '100%' }}>
          <Title order={1}>All Files</Title>
        </Center>
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
  };
};
