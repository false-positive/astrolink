import { Card, Text, Title } from '@mantine/core';
import UsersRow from './UsersRow';

const ProjectCard = ({ project }) => {
  return (
    <Card shadow="sm" sx={{ width: '100%' }}>
      <Card.Section p="lg">
        <Title>{project.name}</Title>
        <Text>{project.description}</Text>
      </Card.Section>
      <Card.Section px="lg" pb="xl">
        <UsersRow
          users={Array.from({ length: 26 }, (_, i) =>
            String.fromCharCode(i + 65)
          )}
        />
      </Card.Section>
    </Card>
  );
};

export default ProjectCard;
