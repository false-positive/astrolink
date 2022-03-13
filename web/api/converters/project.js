// eslint-disable-next-line camelcase
export const fromApiProjectShallow = ({ uuid, ...rest }) => ({
  // eslint-disable-next-line camelcase
  ...rest,
  id: uuid,
});
export const toApiProjectShallow = ({ id, ...rest }) => ({
  uuid: id,
  ...rest,
});
