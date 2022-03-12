import { fromApiUser, toApiUser } from '../user';

export const fromApiTeamShallow = ({ uuid, members, ...rest }) => ({
  ...rest,
  members: members.map(fromApiUser),
  id: uuid,
});
export const toApiTeamShallow = ({ id, members, ...rest }) => ({
  ...rest,
  members: members.map(toApiUser),
  uuid: id,
});
