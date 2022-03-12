import { Center, Title } from '@mantine/core';
import { useMemo } from 'react';

const ProjectProgress = ({ milestones }) => {
  // NOTE: only reason this should re-render is because milestone changes, so there is no need to useMemo
  const milestonesMax = milestones.length;
  const tasks = milestones.reduce(
    (ts, milestone) => [...ts, ...milestone.tasks],
    []
  );
  const tasksDone = tasks.filter((t) => t.completed).length / tasks.length;

  const fmt = useMemo(
    () => new Intl.NumberFormat('bg-BG', { maximumFractionDigits: 2 }).format,
    []
  );

  return (
    <Center>
      <Title>
        {fmt(tasksDone)}/{milestonesMax}
      </Title>
    </Center>
  );
};

export default ProjectProgress;
