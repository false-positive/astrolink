import makeRequest from './request';
import { fromApiTeam, toApiTeam } from './team';

// eslint-disable-next-line camelcase
const fromApiProject = ({ uuid, team, file_set, ...rest }) => ({
  id: uuid,
  // eslint-disable-next-line camelcase
  files: file_set,
  team: fromApiTeam(team),
  ...rest,
});
const toApiProject = ({ id, team, files, ...rest }) => ({
  uuid: id,
  file_set: files,
  team: toApiTeam(team),
  ...rest,
});

export const getProject = async (projectId) => {
  const response = await makeRequest(`/projects/${projectId}`);
  const apiProject = await response.json();
  return fromApiProject(apiProject);
};

export const setProject = async (project) => {
  toApiProject(project);
};
