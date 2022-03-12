import {
  Title,
  Text,
  Center,
  Container,
  Button,
  Modal,
  TextInput,
  Textarea,
  Input,
} from '@mantine/core';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Page from '../../components/Page';
import UserSidebar from '../../components/UserSidebar';
import FileSidebar from '../../components/FileSidebar';
import MilestoneAccordion1 from '../../components/MilestoneAccordion1';
import { getMilestones, setMilestones } from '../../api/milestone';
import { getTasks } from '../../api/task';

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
          <Text size="lg" mb="5rem">
            {project.description}
          </Text>

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
                label="Description"
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

export const getServerSideProps = async ({ params }) => {
  const { projectId } = params;

  const milestones = await getMilestones(projectId);
  const response = await Promise.all(
    milestones.map(async (milestone) => {
      const tasks = await getTasks(projectId, milestone.id);
      return { ...milestone, tasks };
    })
  );

  return {
    props: {
      project: {
        id: 0,
        name: `Project`,
        description: 'This is a long description of the project. ',
        milestones: response,
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
      users: [
        {
          id: 0,
          firstName: 'Денис',
          lastName: 'Мирчев',
        },
        {
          id: 1,
          firstName: 'Божидар',
          lastName: 'Павлов',
        },
        {
          id: 2,
          firstName: 'Калоян',
          lastName: 'Миладинов',
        },
        {
          id: 3,
          firstName: 'Никола',
          lastName: 'Сачков',
        },
      ],
      files: [
        {
          id: 0,
          name: 'Test.txt',
          lastModified: '2020-01-01',
        },
        {
          id: 1,
          name: 'Some File.txt',
          lastModified: '2020-01-01',
        },
        {
          id: 2,
          name: 'Some File.txt',
          lastModified: '2020-01-01',
        },
      ],
    },
  };
};
