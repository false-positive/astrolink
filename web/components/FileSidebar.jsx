import { Box, createStyles, Group } from '@mantine/core';
import { AiFillFileText } from 'react-icons/ai';
import Sidebar from './Sidebar';

const useStyles = createStyles((theme, _params, _getRef) => {
  const fileboxColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1];
  return {
    filebox: {
      cursor: 'pointer',
      background: fileboxColor,
      width: '25rem',
      padding: '0.5rem 0.75rem 0.5rem 0.75rem',
      fontSize: '1.1rem',
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
  const getDateWords = (date) => {
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const { classes } = useStyles();
  return (
    <Sidebar side="right">
      <Group direction="column">
        {files.map((file) => (
          <Box className={classes.filebox} key={file.id}>
            <Group
              direction="column"
              position="apart"
              spacing="xs"
              style={{ width: '100%' }}
            >
              <div>
                <Box as="span" sx={{ display: 'inline' }} px={2}>
                  <AiFillFileText className={classes.fileicon} />
                </Box>
                {file.name}
              </div>
              Last Modified {getDateWords(new Date(file.lastModified))}
            </Group>
          </Box>
        ))}
      </Group>
    </Sidebar>
  );
};

export default FileSidebar;
