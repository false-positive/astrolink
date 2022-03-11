import { Center, Title } from '@mantine/core';

const MilestoneProgress = ({ milestone }) => {
  // NOTE: only reason this should re-render is because milestone changes, so there is no need to useMemo
  const tasksMax = milestone.tasks.length;
  const tasksDone = milestone.tasks.filter((t) => t.completed).length;

  return (
    <Center>
      <Title>
        {tasksDone}/{tasksMax}
      </Title>
    </Center>
  );
};

export default MilestoneProgress;
