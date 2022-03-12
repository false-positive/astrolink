import { Card, Center, Title } from '@mantine/core';

const FileCard = () => {
  return (
    <Card
      px={10}
      py={35}
      shadow="xl"
      withBorder
      sx={{ width: '100%', flex: 1 }}
    >
      <Card.Section>
        <Center>
          <Title>stuff.txt</Title>
        </Center>
      </Card.Section>
    </Card>
  );
};

export default FileCard;
