import { createStyles, Title, Text, Center, Container } from '@mantine/core';
import Page from '../components/Page';
import UserSidebar from '../components/UserSidebar';
import FileSidebar from '../components/FileSidebar';

const useStyles = createStyles((theme, _params, getRef) => {});

export default function Home({ project, users, files }) {
  // const { classes } = useStyles();
  return (
    <Page>
      <UserSidebar users={users} />
      <FileSidebar files={files} />

      <Center>
        <Container size="md">
          <Center style={{ margin: '5rem 0 2rem 0' }}>
            <Title order={1}>{project.title}</Title>
          </Center>
          <Text size="lg">{project.description}</Text>
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
          lastModified: '2020-01-01',
        },
        {
          id: 1,
          name: 'Some File.txt',
          lastModified: '2020-01-01',
        },
        {
          id: 2,
          name: 'Some File.txt',
          lastModified: '2020-01-01',
        },
      ],
      project: {
        id: 0,
        title: 'Test Project',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis expedita officiis facilis amet ipsa eum nisi at exercitationem in, voluptatum dolores corrupti, quidem rerum illum fugit perspiciatis corporis dolorum ea!Lorem, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed in doloremque, tempore repudiandae itaque odio iusto illo nobis voluptatem reprehenderit voluptates ipsum et unde alias eligendi labore blanditiis beatae magnam.',
      },
    },
  };
};
