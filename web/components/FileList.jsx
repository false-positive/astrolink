import { Box, createStyles, Group, Text, UnstyledButton } from '@mantine/core';
import { AiFillFileText } from 'react-icons/ai';
import getDateWords from '../lib/utils/getDateWords';
import FileMenu from './FileMenu';
import StyledLink from './StyledLink';

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

const FileList = ({ files, lastModified = true }) => {
  const { classes } = useStyles();
  return (
    <Group>
      {files.map((file) => (
        <Box className={classes.filebox} key={file.id}>
          <Group position="apart" spacing="xs" style={{ width: '100%' }}>
            <div>
              <Box as="span" sx={{ display: 'inline' }} px={2}>
                <AiFillFileText className={classes.fileicon} />
              </Box>
              <UnstyledButton
                component={StyledLink}
                sx={{ textDecoration: 'none' }}
                href={`/projects/${file.project}/files/${file.id}/`}
              >
                {file.name}
              </UnstyledButton>
            </div>
            {lastModified && (
              <Text color="dimmed" size="sm">
                Last Modified {getDateWords(new Date(file.lastModified))}
              </Text>
            )}
            <FileMenu file={file} />
          </Group>
        </Box>
      ))}
    </Group>
  );
};

export default FileList;
