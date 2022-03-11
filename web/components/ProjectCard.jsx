import { Card, Text, Title } from '@mantine/core';

const ProjectCard = ({ project }) => {
  return (
    <Card shadow="sm">
      <Card.Section p="lg">
        <Title>{project.name}</Title>
        <Text>{project.description}</Text>
      </Card.Section>
    </Card>
  );
};

export default ProjectCard;
