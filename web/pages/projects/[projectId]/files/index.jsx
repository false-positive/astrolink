import { Center, Container, Title } from '@mantine/core';
import Page from '../../../../components/Page';
import FileList from '../../../../components/FileList';

import { getFiles } from '../../../../api/file';
import FileUploadDropzone from '../../../../components/FileUploadDropzone';

const AllFiles = ({ files }) => {
  return (
    <Page>
      <Container size="lg">
        <Center style={{ margin: '2rem 0 3rem 0', width: '100%' }}>
          <Title order={1}>All Files</Title>
        </Center>

        <FileUploadDropzone />
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
      files,
    },
  };
};
