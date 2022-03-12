import { Container, Group, Text, Title } from '@mantine/core';
import { getTeam } from '../../api/team';
import Page from '../../components/Page';
import UsersRow from '../../components/UsersRow';

const TeamDetailPage = ({ team }) => {
  return (
    <Page>
      <Container pt={25}>
        <Title>{team.name}</Title>
        <Text pb={15}>{team.description}</Text>
        <UsersRow users={team.members} />
      </Container>
      <Container pt={25}>
        <Title order={2}>Projects</Title>
        <Group position="center" direction="column" spacing="lg">
          <Text>TODOOOOO.....</Text>
          {/* {team.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))} */}
        </Group>
      </Container>
    </Page>
  );
};

export default TeamDetailPage;

export const getServerSideProps = async ({ params }) => {
  const { teamId } = params;
  try {
    const team = await getTeam(teamId);
    return {
      props: {
        team,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};
