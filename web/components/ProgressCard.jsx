import { Accordion, Card, Text } from '@mantine/core';
import TasksTimeline from './TasksTimeline';

const AccordionLabel = ({ label, description }) => (
  <div>
    <Text>{label}</Text>
    <Text size="sm" color="dimmed" weight={400}>
      {description}
    </Text>
  </div>
);

const ProgressCard = ({ milestones }) => {
  return (
    <Card shadow="xl" withBorder sx={{ width: '100%', flex: 1 }}>
      <Card.Section>
        <Accordion>
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
      </Card.Section>
    </Card>
  );
};

export default ProgressCard;
