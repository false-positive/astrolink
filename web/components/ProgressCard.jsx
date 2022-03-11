import { Accordion, Card, Group, Text, useAccordionState } from '@mantine/core';
import { useMemo } from 'react';
import MilestoneProgress from './MilestoneProgress';
import ProjectProgress from './ProjectProgress';
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
  const [accordionState, accordionHandlers] = useAccordionState({});
  const activeMilestone = useMemo(() => {
    const activeIdx = Object.values(accordionState).findIndex((x) => x);
    return activeIdx >= 0 ? milestones[activeIdx] : null;
  }, [accordionState, milestones]);
  return (
    <Group sx={{ width: '100%', flex: 1, alignItems: 'flex-start' }}>
      <Card
        px={10}
        py={35}
        shadow="xl"
        withBorder
        sx={{ width: '100%', flex: 1 }}
      >
        <Card.Section>
          <Accordion
            state={accordionState}
            onChange={accordionHandlers.setState}
          >
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
      <Card shadow="xl" withBorder sx={{ width: '100%', flex: 1 }}>
        <Card.Section>
          {activeMilestone ? (
            <MilestoneProgress milestone={activeMilestone} />
          ) : (
            <ProjectProgress milestones={milestones} />
          )}
        </Card.Section>
      </Card>
    </Group>
  );
};

export default ProgressCard;
