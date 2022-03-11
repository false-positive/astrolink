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
              name: 'Milestone 1',
              description: 'Milestone 1 description',
              tasks: [
                {
                  name: 'Task 1',
                  description: 'Task 1 description',
                  completed: false,
                },
                {
                  name: 'Task 2',
                  description: 'Task 2 description',
                  completed: false,
                },
                {
                  name: 'Task 3',
                  description: 'Task 3 description',
                  completed: false,
                },
              ],
            },
          ],
        },
        {
          id: 1,
          name: 'Project 2',
          description: 'This is Project 2',
          milestones: [
            {
              name: 'Milestone 1',
              description: 'Milestone 1 description',
              tasks: [
                {
                  name: 'Task 1',
                  description: 'Task 1 description',
                  completed: false,
                },
                {
                  name: 'Task 2',
                  description: 'Task 2 description',
                  completed: false,
                },
                {
                  name: 'Task 3',
                  description: 'Task 3 description',
                  completed: false,
                },
              ],
            },
          ],
        },
      ],
    },
  };
};
