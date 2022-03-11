import {
  createStyles,
  AppShell,
  Header,
  Navbar,
  Burger,
  MediaQuery,
  Anchor,
  Center,
} from '@mantine/core';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  res_navbar: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  navbar: { padding: '1rem 0 4rem 0' },
  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  link: {
    fontSize: '1.5rem',
    margin: '0 2.5rem',
    color: 'white',
  },
}));

const Page = ({ children }) => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      style={{ paddingTop: '2rem' }}
      fixed
      navbarOffsetBreakpoint="sm"
      header={
        <Header height={50} className={classes.navbar}>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              mr="xl"
            />
          </MediaQuery>
          <Center>
            <div className={classes.links}>
              <Anchor className={classes.link}>Home</Anchor>
              <Anchor className={classes.link}>Features</Anchor>
              <Anchor className={classes.link}>Pricing</Anchor>
            </div>
          </Center>
        </Header>
      }
      navbar={
        <Navbar
          className={classes.res_navbar}
          width={{ base: '100%', sm: 0 }}
          hidden={!opened}
        >
          <Anchor className={classes.link}>Home</Anchor>
          <Anchor className={classes.link}>Features</Anchor>
          <Anchor className={classes.link}>Pricing</Anchor>
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
};

export default Page;
