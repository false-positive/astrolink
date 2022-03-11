import { createStyles, Paper } from '@mantine/core';

const useStyles = createStyles((_theme, params, _getRef) => {
  return {
    sidebar: {
      position: 'fixed',
      zIndex: '1',
      top: '100px',
      [params.side]: '10px',
      overflowX: 'hidden',
    },
  };
});

const Sidebar = ({ side = 'left', children }) => {
  const { classes } = useStyles({ side });
  return (
    <Paper className={classes.sidebar} p="md" shadow="sm" withBorder>
      {children}
    </Paper>
  );
};

export default Sidebar;
