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
import { getFile } from '../../../../api/file';
import FileList from '../../../../components/FileList';
import FileMenu from '../../../../components/FileMenu';
import Page from '../../../../components/Page';

const FileDetailPage = ({ file }) => {
  const downloadUrl = `${process.env.NEXT_PUBLIC_API_URL}/projects/${file.project}/files/${file.id}/download`;
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
                    Unknown
                  </Text>
                </Text>
              </Group>
              <FileMenu file={file} />
            </Group>
          </Center>

          <Group position="right">
            <Button component="a" href={downloadUrl} leftIcon={<Download />}>
              Download
            </Button>
            <Button variant="outline" leftIcon={<Upload />}>
              Upload new revision
            </Button>
          </Group>

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

export const getServerSideProps = async ({ params }) => {
  try {
    const { projectId, fileId } = params;
    const file = await getFile(projectId, fileId);
    return {
      props: {
        file,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};
