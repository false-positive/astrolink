import { Card, Text, Title } from '@mantine/core';
import UsersRow from './UsersRow';

const ProjectCard = ({ project }) => {
  return (
    <Card shadow="sm">
      <Card.Section p="lg">
        <Title>{project.name}</Title>
        <Text>{project.description}</Text>
      </Card.Section>
      <Card.Section px="lg" pb="xl">
        <UsersRow users={['asd', 'dfg af', 'dkgj srf']} />
      </Card.Section>
    </Card>
  );
};

export default ProjectCard;
