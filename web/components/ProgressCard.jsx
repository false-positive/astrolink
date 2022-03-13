import { Card, Group, useAccordionState } from '@mantine/core';
import { useMemo } from 'react';
import MilestoneAccordion from './MilestoneAccordion';
import MilestoneProgress from './MilestoneProgress';
import ProjectProgress from './ProjectProgress';

const ProgressCard = ({ milestones }) => {
  const [accordionState, accordionHandlers] = useAccordionState({});
  const activeMilestone = useMemo(() => {
    const activeIdx = Object.values(accordionState).findIndex((x) => x);
    return activeIdx >= 0 ? milestones[activeIdx] : null;
  }, [accordionState, milestones]);
  return (
    <Group sx={{ width: '100%', flex: 3, alignItems: 'flex-start' }}>
      <Card
        px={10}
        py={35}
        shadow="xl"
        withBorder
        sx={{ width: '100%', flex: 1 }}
      >
        <Card.Section>
          <MilestoneAccordion
            state={accordionState}
            onChange={accordionHandlers.setState}
            milestones={milestones}
          />
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
