import { Text, Title } from '@mantine/core';

const WebsiteTitle = ({ order, fontSize }) => {
  return (
    <Title order={order} sx={{ fontSize }}>
      <Text
        component="span"
        variant="gradient"
        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
        sx={{ fontSize }}
      >
        Astro
      </Text>
      Link
    </Title>
  );
};

export default WebsiteTitle;
