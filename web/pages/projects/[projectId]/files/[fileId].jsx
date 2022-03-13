import {
  Box,
  Button,
  Center,
  Container,
  Group,
  Modal,
  Text,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import { Download, Upload } from 'tabler-icons-react';
import { getFile } from '../../../../api/file';
import FileList from '../../../../components/FileList';
import FileMenu from '../../../../components/FileMenu';
import FileUploadDropzone from '../../../../components/FileUploadDropzone';
import Page from '../../../../components/Page';
import RevList from '../../../../components/RevList';
import getDateWords from '../../../../lib/utils/getDateWords';

const FileDetailPage = ({ file }) => {
  const [openedRevise, setOpenedRevise] = useState(false);
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
            <Button
              variant="outline"
              leftIcon={<Upload />}
              onClick={() => setOpenedRevise(true)}
            >
              Upload new revision
            </Button>
          </Group>

          <Modal
            size="md"
            centered
            opened={openedRevise}
            onClose={() => setOpenedRevise(false)}
            title="Create New Milestone"
          >
            <FileUploadDropzone filename={file.name} />
          </Modal>

          <Box px={10}>
            <Text color="dimmed" size="lg">
              Uploaded At {getDateWords(new Date(file.lastModified))}
            </Text>
            <Text color="dimmed" size="lg">
              Last Modified {getDateWords(new Date(file.lastModified))}
            </Text>
          </Box>

          <Box pt={52}>
            <Title order={2} pb={15}>
              Revisions
            </Title>
            <RevList
              revisions={file.revisions}
              file={file.id}
              project={file.project}
            />
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
