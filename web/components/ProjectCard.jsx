import {
  Box,
  Card,
  Group,
  Title,
  TypographyStylesProvider,
  UnstyledButton,
} from '@mantine/core';
import UsersRow from './UsersRow';
import MilestoneAccordion from './MilestoneAccordion';
import StyledLink from './StyledLink';

const ProjectCard = ({ project }) => {
  return (
    <Card shadow="sm" style={{ width: '100%' }}>
      <Card.Section p="lg">
        <Group position="apart" grow>
          <Box>
            <UnstyledButton
              component={StyledLink}
              href={`/projects/${project.id}`}
              sx={{ textDecoration: 'none' }}
            >
              <Title>{project.name}</Title>
            </UnstyledButton>
            <TypographyStylesProvider pb="1rem">
              <div dangerouslySetInnerHTML={{ __html: project.description }} />
            </TypographyStylesProvider>
            <UsersRow users={project.team.members} />
          </Box>
          <Box sx={{ width: '100%' }}>
            <MilestoneAccordion milestones={project.milestones} />
          </Box>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default ProjectCard;
