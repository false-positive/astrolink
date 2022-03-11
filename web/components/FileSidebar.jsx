import { Box, createStyles, Group } from '@mantine/core';
import { AiFillFileText } from 'react-icons/ai';
import Sidebar from './Sidebar';

const useStyles = createStyles((theme, _params, getRef) => {
  const fileboxColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1];
  return {
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
const FileSidebar = ({ files }) => {
  const { classes } = useStyles();
  return (
    <Sidebar side="right">
      <Group direction="column">
        {files.map((file) => (
          <Box className={classes.filebox} key={file.id}>
            <Box as="span" sx={{ display: 'inline' }} px={2}>
              <AiFillFileText className={classes.fileicon} />
            </Box>
            {file.name}
          </Box>
        ))}
      </Group>
    </Sidebar>
  );
};

export default FileSidebar;
