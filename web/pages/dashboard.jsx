import { Container, Group } from '@mantine/core';
import Page from '../components/Page';
import ProjectCard from '../components/ProjectCard';

const DashboardPage = ({ projects }) => {
  return (
    <Page>
      <Container pt={25}>
        <Group position="center" direction="column" spacing="lg">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Group>
      </Container>
    </Page>
  );
};

export default DashboardPage;

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
    },
  };
};
