import { Title, Text, Center, Container, Button } from '@mantine/core';
import Page from '../../components/Page';
import UserSidebar from '../../components/UserSidebar';
import FileSidebar from '../../components/FileSidebar';
import MilestoneAccordion from '../../components/MilestoneAccordion';

export default function Home({ project, users, files }) {
  return (
    <Page>
      <UserSidebar users={users} />
      <FileSidebar files={files} />

      <Center>
        <Container size="md">
          <Center style={{ margin: '5rem 0 2rem 0' }}>
            <Title order={1}>{project.name}</Title>
          </Center>
          <Text size="lg" mb="5rem">
            {project.description}
          </Text>

          <Button size="md" mb="2rem">
            Create New Milestone
          </Button>

          <MilestoneAccordion
            // state={accordionState}
            // onChange={accordionHandlers.setState}
            milestones={project.milestones}
          />

          {/* <ProgressCard milestones={projects[0].milestones} /> */}
        </Container>
      </Center>
    </Page>
  );
}

export const getServerSideProps = () => {
  return {
    props: {
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
      project: {
        id: 0,
        name: 'Project 1',
        description: 'This is Project 1',
        milestones: [
          {
            id: 0,
            name: 'Milestone 1',
            description: 'Milestone 1 description',
            tasks: [
              {
                id: 0,
                name: 'Task 1',
                description: 'Task 1 description',
                completed: true,
              },
              {
                id: 1,
                name: 'Task 2',
                description: 'Task 2 description',
                completed: false,
              },
              {
                id: 2,
                name: 'Task 3',
                description: 'Task 3 description',
                completed: true,
              },
            ],
          },
          {
            id: 1,
            name: 'Milestone 2',
            description: 'Milestone 2 description',
            tasks: [
              {
                id: 0,
                name: 'Task 1',
                description: 'Task 1 description',
                completed: false,
              },
              {
                id: 1,
                name: 'Task 2',
                description: 'Task 2 description',
                completed: false,
              },
              {
                id: 2,
                name: 'Task 3',
                description: 'Task 3 description',
                completed: false,
              },
            ],
          },
        ],
      },
    },
  };
};
