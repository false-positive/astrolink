import {
  createStyles,
  Title,
  Text,
  Center,
  Container,
  Group,
  Button,
  Paper,
  Box,
} from '@mantine/core';
import Link from 'next/link';
import Page from '../components/Page';
import UserAvatar from '../components/UserAvatar';
import { AiFillFileText } from 'react-icons/ai';
import Sidebar from '../components/Sidebar';
const useStyles = createStyles((theme, _params, getRef) => {
  const fileboxColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1];
  return {
    container: {
      padding: '1rem',
      color: 'white',
    },
    title: {
      fontSize: '5rem',
      fontWeight: '500',
      borderRadius: '0.5rem',
      color: 'white',
      padding: '0.5rem 3rem',
      border: '1px solid white',
      borderRadius: '1rem',
      marginTop: '4rem',
      background: theme.fn.rgba(theme.colors.violet[1], 0.25),
    },

    userbar: {
      width: '17rem',
      position: 'fixed',
      zIndex: '1',
      top: '100px',
      left: '10px',
      overflowX: 'hidden',
    },

    filebar: {
      position: 'fixed',
      zIndex: '1',
      top: '100px',
      right: '10px',
      overflowX: 'hidden',
      padding: '1rem 0',
    },
    filebox: {
      cursor: 'pointer',
      background: fileboxColor,
      width: '100%',
      padding: '0.2rem 0.4rem',
      borderRadius: '0.5rem',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    fileicon: {
      marginRight: '0.2rem',
    },
  };
});

export default function Home() {
  const { classes } = useStyles();
  return (
    <Page>
      <Sidebar side="left">
        <Group direction="column">
          <Group direction="row">
            <UserAvatar username="Денис Мирчев"></UserAvatar>
            <p>Развигор Разпоповничев</p>
          </Group>
          <Group direction="row">
            <UserAvatar username="Денис Мирчев"></UserAvatar>
            <p>Денис Мирчев</p>
          </Group>
          <Group direction="row">
            <UserAvatar username="Денис Мирчев"></UserAvatar>
            <p>Денис Мирчев</p>
          </Group>
          <Group direction="row">
            <UserAvatar username="Денис Мирчев"></UserAvatar>
            <p>Денис Мирчев</p>
          </Group>
        </Group>
      </Sidebar>

      <Sidebar side="right">
        <Group direction="column">
          <Box className={classes.filebox}>
            <Box as="span" sx={{ display: 'inline' }} px={2}>
              <AiFillFileText className={classes.fileicon} />
            </Box>
            Test.txt
          </Box>
          <Box className={classes.filebox}>
            <Box as="span" sx={{ display: 'inline' }} px={2}>
              <AiFillFileText className={classes.fileicon} />
            </Box>
            Some File.txt
          </Box>
          <Box className={classes.filebox}>
            <Box as="span" sx={{ display: 'inline' }} px={2}>
              <AiFillFileText className={classes.fileicon} />
            </Box>
            Some File.txt
          </Box>
        </Group>
      </Sidebar>

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
