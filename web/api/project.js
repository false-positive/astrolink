import { fromApiTeamShallow, toApiTeamShallow } from './converters/team';
import { fromApiFiles, toApiFiles } from './file';
import makeRequest from './request';

// eslint-disable-next-line camelcase
const fromApiProject = ({ uuid, team, files, ...rest }) => ({
  id: uuid,
  // eslint-disable-next-line camelcase
  files: files.map(fromApiFiles),
  team: fromApiTeamShallow(team),
  ...rest,
});
const toApiProject = ({ id, team, files, ...rest }) => ({
  uuid: id,
  files: files.map(toApiFiles),
  team: toApiTeamShallow(team),
  ...rest,
});

export const getProject = async (projectId) => {
  const response = await makeRequest(`/projects/${projectId}`);
  const apiProject = await response.json();
  return fromApiProject(apiProject);
};

export const setProject = async (teamId, project) => {
  const response = await makeRequest(`/projects`, {
    method: 'POST',
    body: JSON.stringify({
      ...project,
      team: teamId,
    }),
  });
};
