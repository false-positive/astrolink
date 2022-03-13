import Cookies from 'cookies';
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
} from '@mantine/core';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import getUser from '../../api/token';
import { getTeam } from '../../api/team';
import { setProject } from '../../api/project';
import UsersRow from '../../components/UsersRow';
import Page from '../../components/Page';

const MyTeams = ({ teams }) => {
  const [opened, setOpened] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    await setProject(selectedTeam, data);

    setOpened(false);
    router.push(router.asPath, null, { scroll: false });
    reset();
  };

  return (
    <Page>
      {teams.map((team) => (
        <div key={team.uuid}>
          <Container pt={25}>
            <Title>{team.name}</Title>
            <Text pb={15}>{team.description}</Text>
            <UsersRow users={team.members} />
          </Container>
          <Container pt={25}>
            <Title order={2}>Projects</Title>

            <Button
              size="xs"
              mb="2rem"
              mt="1rem"
              onClick={() => {
                setOpened(true);
                setSelectedTeam(team.uuid);
              }}
            >
              Create Project
            </Button>

            <Group position="center" direction="column" spacing="lg">
              <Text>TODOOOOO.....</Text>
              {/* {team.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))} */}
            </Group>
          </Container>
        </div>
      ))}
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
    </Page>
  );
};

export default MyTeams;

export const getServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('token');

  const user = await getUser(token);

  const teams = await Promise.all(
    user.team_set.map(async (team) => {
      const teamApi = await getTeam(team.uuid);

      return {
        ...team,
        ...teamApi,
      };
    })
  );

  return {
    props: {
      teams,
    },
  };
};
