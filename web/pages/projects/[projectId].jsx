import { Title, Text, Center, Container, Button } from '@mantine/core';
import Page from '../../components/Page';
import UserSidebar from '../../components/UserSidebar';
import FileSidebar from '../../components/FileSidebar';
import MilestoneAccordion from '../../components/MilestoneAccordion';

export default function Home({ project, users, files, projects }) {
  return (
    <Page>
      <UserSidebar users={users} />
      <FileSidebar files={files} />

      <Center>
        <Container size="md">
          <Center style={{ margin: '5rem 0 2rem 0' }}>
            <Title order={1}>{project.title}</Title>
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
            milestones={projects[0].milestones}
          />

          {/* <ProgressCard milestones={projects[0].milestones} /> */}
        </Container>
      </Center>
    </Page>
  );
}

export const getStaticProps = () => {
  return {
    props: {
      projects: [
        {
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
        {
          id: 1,
          name: 'Project 2',
          description: 'This is Project 2',
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
      ],
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
        title: 'Test Project',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis expedita officiis facilis amet ipsa eum nisi at exercitationem in, voluptatum dolores corrupti, quidem rerum illum fugit perspiciatis corporis dolorum ea!Lorem, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed in doloremque, tempore repudiandae itaque odio iusto illo nobis voluptatem reprehenderit voluptates ipsum et unde alias eligendi labore blanditiis beatae magnam.',
      },
    },
  };
};
