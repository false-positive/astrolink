import {
  fromApiProjectShallow,
  toApiProjectShallow,
} from './converters/project';
import { getFiles } from './file';
import makeRequest from './request';
import { fromApiUser, toApiUser } from './user';

// eslint-disable-next-line camelcase
export const fromApiTeam = ({ uuid, project_set, members, ...rest }) => ({
  ...rest,
  members: members.map(fromApiUser),
  // eslint-disable-next-line camelcase
  projects: project_set.map(fromApiProjectShallow),
  id: uuid,
});
export const toApiTeam = ({ id, projects, members, ...rest }) => ({
  ...rest,
  members: members.map(toApiUser),
  project_set: projects.map(toApiProjectShallow),
  uuid: id,
});

export const getTeam = async (uuid) => {
  const response = await makeRequest(`/teams/${uuid}`);
  const apiTeam = await response.json();
  return fromApiTeam(apiTeam);
};

export const setTeam = async (team) => {
  let apiTeam = toApiTeam(team);
  const { uuid } = apiTeam;
  const response = await makeRequest(`/teams/${uuid}`, {
    method: 'PATCH',
    body: JSON.stringify(apiTeam),
  });
  if (response.ok) {
    apiTeam = await response.json();
    return fromApiTeam(team);
  }
  const errors = await response.json();
  throw errors;
};
