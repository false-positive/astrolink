import {
  Title,
  Center,
  Container,
  Button,
  Modal,
  TextInput,
  Textarea,
  Input,
  TypographyStylesProvider,
} from '@mantine/core';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Page from '../../../components/Page';
import UserSidebar from '../../../components/UserSidebar';
import FileSidebar from '../../../components/FileSidebar';
import { getProject } from '../../../api/project';
import { getMilestones, setMilestones } from '../../../api/milestone';
import { getTasks } from '../../../api/task';
import MilestoneAccordion1 from '../../../components/MilestoneAccordion1';
import withAuth from '../../../lib/withAuth';

export default function Home({ project, users, files }) {
  const [opened, setOpened] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    await setMilestones(router.query.projectId, data);

    setOpened(false);
    router.push(router.asPath, null, { scroll: false });
    reset();
  };

  return (
    <Page>
      <UserSidebar users={users} />
      <FileSidebar files={files} />

      <Center>
        <Container size="md" sx={{ width: '100%' }}>
          <Center style={{ margin: '5rem 0 2rem 0' }}>
            <Title order={1}>{project.name}</Title>
          </Center>
          <TypographyStylesProvider size="lg" mb="5rem">
            <div
              dangerouslySetInnerHTML={{ __html: project.description }}
            ></div>
          </TypographyStylesProvider>

          <Button size="md" mb="2rem" onClick={() => setOpened(true)}>
            Create New Milestone
          </Button>

          <Modal
            size="md"
            centered
            opened={opened}
            onClose={() => setOpened(false)}
            title="Create New Milestone"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                {...register('name')}
                name="name"
                label="Title"
                placeholder="Title"
                size="md"
                mb="1rem"
                required
              />
              <Textarea
                {...register('description')}
                name="description"
                placeholder="Description"
                label="Milestone Description"
                size="md"
                mb="4rem"
                required
              />
              <Center sx={{ height: '10px' }}>
                <Input component="button" size="lg" mb="2rem">
                  Create Milestone
                </Input>
              </Center>
            </form>
          </Modal>

          <MilestoneAccordion1 milestones={project.milestones} />
        </Container>
      </Center>
    </Page>
  );
}

export const getServerSideProps = withAuth(async ({ params }) => {
  const { projectId } = params;

  const milestones = await getMilestones(projectId);
  const response = await Promise.all(
    milestones.map(async (milestone) => {
      const tasks = await getTasks(projectId, milestone.id);

      return {
        ...milestone,
        tasks,
      };
    })
  );

  try {
    const project = await getProject(projectId);
    return {
      props: {
        users: project.team.members,
        files: project.files,
        project: {
          ...project,
          milestones: response,
        },
      },
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
});
