import { createStyles, Title, Text, Center, Container } from '@mantine/core';
import Page from '../components/Page';
import UserSidebar from '../components/UserSidebar';
import FileSidebar from '../components/FileSidebar';

const useStyles = createStyles((theme, _params, getRef) => {});

export default function Home({ users, files }) {
  // const { classes } = useStyles();
  return (
    <Page>
      <UserSidebar users={users} />
      <FileSidebar files={files} />

      <Center>
        <Container size="md">
          <Center>
            <Title order={1}>This is h1 title</Title>
          </Center>
          <Text size="lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            debitis, quod nostrum in architecto sint sunt quo, delectus
            praesentium, dignissimos aliquid eligendi molestias voluptates? Vel
            consectetur iusto inventore! In, id?
          </Text>
        </Container>
      </Center>
    </Page>
  );
}

export const getStaticProps = () => {
  return {
    props: {
      users: [
        {
          id: 0,
          firstName: 'Денис',
          lastName: 'Мирчев',
        },
        {
          id: 1,
          firstName: 'Божидар',
          lastName: 'Павлов',
        },
        {
          id: 2,
          firstName: 'Калоян',
          lastName: 'Миладинов',
        },
        {
          id: 3,
          firstName: 'Никола',
          lastName: 'Сачков',
        },
      ],
      files: [
        {
          id: 0,
          name: 'Test.txt',
        },
        {
          id: 1,
          name: 'Some File.txt',
        },
        {
          id: 2,
          name: 'Some File.txt',
        },
      ],
    },
  };
};
