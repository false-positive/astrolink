import { Accordion, Text, TypographyStylesProvider } from '@mantine/core';
import TasksTimeline from './TasksTimeline';

const AccordionLabel = ({ label, description }) => (
  <div>
    <Text>{label}</Text>
    <Text size="sm" color="dimmed" weight={400}>
      {description}
    </Text>
  </div>
);

const MilestoneAccordion = ({ state, onChange, milestones }) => {
  return (
    <Accordion state={state} onChange={onChange}>
      {milestones.map((milestone) => (
        <Accordion.Item
          key={milestone.id}
          label={
            <AccordionLabel
              label={milestone.name}
              description={milestone.description}
            />
          }
        >
          <TasksTimeline tasks={milestone.tasks} />
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default MilestoneAccordion;
