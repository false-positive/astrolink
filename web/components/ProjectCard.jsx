import { Box, Card, Group, Text, Title } from '@mantine/core';
import FileCard from './FileCard';
import ProgressCard from './ProgressCard';
import UsersRow from './UsersRow';
import FileList from './FileList';

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
      <Card.Section px="md" pb="xl">
        <Group position="apart" spacing="xs">
          <ProgressCard milestones={project.milestones} />
          <Group position="apart" spacing="xs" sx={{ width: '100%', flex: 1 }}>
            <FileCard />
            <Box sx={{ width: '100%', flex: 1 }}>
              <FileList
                files={project.files.slice(1, 5)}
                lastModified={false}
              />
            </Box>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default ProjectCard;
