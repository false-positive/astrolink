// eslint-disable-next-line camelcase
export const fromApiProjectShallow = ({ uuid, ...rest }) => ({
  id: uuid,
  // eslint-disable-next-line camelcase
  ...rest,
});
export const toApiProjectShallow = ({ id, ...rest }) => ({
  uuid: id,
  ...rest,
});
