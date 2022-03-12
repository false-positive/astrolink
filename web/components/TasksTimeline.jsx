import { Text, Timeline } from '@mantine/core';
import { useMemo } from 'react';

const TasksTimeline = ({ tasks }) => {
  const active = useMemo(
    () => tasks.findIndex((t) => !t.completed) - 1,
    [tasks]
  );
  return (
    <Timeline active={active} bulletSize={24} lineWidth={2}>
      {tasks.map((task, id) => (
        <Timeline.Item
          key={id}
          // bullet={task.completed && <span />}
          title={task.name}
        >
          <Text color="dimmed" size="sm">
            {task.description}
          </Text>
          <Text size="xs" mt={4}>
            2 hours ago
          </Text>
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default TasksTimeline;
