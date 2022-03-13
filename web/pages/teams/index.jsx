import Cookies from 'js-cookie';
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
import { getProject, setProject } from '../../api/project';
import UsersRow from '../../components/UsersRow';
import Page from '../../components/Page';
import ProjectCard from '../../components/ProjectCard';
import withAuth from '../../lib/withAuth';

const MyTeams = ({ teams, projects }) => {
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
      {teams.map((team, i) => (
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

            <Group
              position="center"
              direction="column"
              spacing="lg"
              style={{ width: '100%' }}
            >
              {projects[i].map((project) => (
                <div key={project.id} style={{ width: '100%' }}>
                  <ProjectCard style={{ width: '100%' }} project={project} />
                </div>
              ))}
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

export const getServerSideProps = withAuth(async ({ req, res }) => {
  const token = Cookies.get('token');

  const user = await getUser(token);

  const projects = [];

  const teams = await Promise.all(
    user.team_set.map(async (team) => {
      const teamApi = await getTeam(team.uuid);

      const newTeam = {
        ...team,
        ...teamApi,
      };

      // projects.push(
      projects.unshift(
        await Promise.all(
          newTeam.projects.map(async (project) => {
            const projectApi = await getProject(project.id);
            return {
              ...project,
              ...projectApi,
            };
          })
        )
      );
      // );

      // .map(async (project) => {
      //   const projectApi = await getTeam(project.id);
      //   return {
      //     ...project,
      //     ...projectApi,
      //   };
      // });

      return newTeam;
    })
  );

  return {
    props: {
      teams,
      projects,
    },
  };
});
