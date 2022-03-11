import { Card } from '@mantine/core';

const ProgressCard = ({ milestones }) => {
  return (
    <Card shadow="xs">
      <Card.Section>
        <pre>{JSON.stringify(milestones, null, 2)}</pre>
      </Card.Section>
    </Card>
  );
};

export default ProgressCard;
