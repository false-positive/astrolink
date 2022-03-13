import {
  Button,
  Center,
  Container,
  Group,
  Input,
  Modal,
  Text,
  Textarea,
  TextInput,
  Title,
  TypographyStylesProvider,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { setProject } from '../../api/project';
import { getTeam } from '../../api/team';
import Page from '../../components/Page';
import UsersRow from '../../components/UsersRow';
import withAuth from '../../lib/withAuth';

const TeamDetailPage = ({ team }) => {
  const [opened, setOpened] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    await setProject(router.query.teamId, data);

    setOpened(false);
    router.push(router.asPath, null, { scroll: false });
    reset();
  };

  return (
    <Page>
      <Container pt={25}>
        <Title>{team.name}</Title>
        {/* <Text pb={15}>{team.description}</Text> */}
        <TypographyStylesProvider pb={15}>
          <div dangerouslySetInnerHTML={{ __html: team.description }} />
        </TypographyStylesProvider>
        <UsersRow users={team.members} />
      </Container>
      <Container pt={25}>
        <Title order={2}>Projects</Title>

        <Button size="md" mb="2rem" mt="2rem" onClick={() => setOpened(true)}>
          Create Project
        </Button>

        <Modal
          size="md"
          centered
          opened={opened}
          onClose={() => setOpened(false)}
          title="Create New Project"
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
                Create Project
              </Input>
            </Center>
          </form>
        </Modal>

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

export const getServerSideProps = withAuth(async ({ params }) => {
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
});
