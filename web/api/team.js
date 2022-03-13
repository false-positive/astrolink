import {
  fromApiProjectShallow,
  toApiProjectShallow,
} from './converters/project';
import makeRequest from './request';
import { fromApiUser, toApiUser } from './user';

export const fromApiTeam = ({ uuid, project_set, members, ...rest }) => ({
  ...rest,
  members: members.map(fromApiUser),
  projects: project_set.map(fromApiProjectShallow),
  id: uuid,
});
export const toApiTeam = ({ id, project_set, members, ...rest }) => ({
  ...rest,
  members: members.map(toApiUser),
  project: project_set.map(toApiProjectShallow),
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
