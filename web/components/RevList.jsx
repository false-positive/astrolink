import { Box, createStyles, Group, Text } from '@mantine/core';
import { AiFillFileText } from 'react-icons/ai';
import getDateWords from '../lib/utils/getDateWords';
import RevisionMenu from './RevisionMenu';

const useStyles = createStyles((theme, _params, _getRef) => {
  const fileboxColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1];
  return {
    filebox: {
      cursor: 'pointer',
      background: fileboxColor,
      width: '100%',
      padding: '0.5rem 0.75rem 0.5rem 0.75rem',
      fontSize: '1.3rem',
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

const RevList = ({ revisions, project, file, lastModified = true }) => {
  const { classes } = useStyles();

  return (
    <Group>
      {revisions.map((revision) => (
        <Box className={classes.filebox} key={revision.revision}>
          <Group position="apart" spacing="xs" style={{ width: '100%' }}>
            <div>
              <Box as="span" sx={{ display: 'inline' }} px={2}>
                <AiFillFileText className={classes.fileicon} />
              </Box>
              {revision.name}
            </div>
            {lastModified && (
              <Text color="dimmed" size="sm">
                Last Modified {getDateWords(new Date(revision.last_modified))}
              </Text>
            )}
            <RevisionMenu revision={revision} file={file} project={project} />
          </Group>
        </Box>
      ))}
    </Group>
  );
};

export default RevList;
