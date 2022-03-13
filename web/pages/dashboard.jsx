import { Container, Group } from '@mantine/core';
import { getProjects } from '../api/project';
import Page from '../components/Page';
import ProjectCard from '../components/ProjectCard';
import withAuth from '../lib/withAuth';

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

export const getServerSideProps = withAuth(async () => {
  const projects = await getProjects();
  return {
    props: {
      projects,
    },
  };
});
