import makeRequest, { makeNonJsonRequest } from './request';

// eslint-disable-next-line camelcase
export const fromApiFiles = ({ pk, query_id, ...rest }) => ({
  id: pk,
  // eslint-disable-next-line camelcase
  queryId: query_id,
  ...rest,
});
export const toApiFiles = ({ queryId, ...rest }) => ({
  pk: rest.id,
  query_id: queryId,
  ...rest,
});

export const getFiles = async (projectId) => {
  const response = await makeRequest(`/projects/${projectId}/files`);
  const apiFiles = await response.json();
  return apiFiles.map((rest) => ({ ...rest, id: rest.pk }));
};

export const uploadFile = (projectId, file) => {
  const formdata = new FormData();
  formdata.append('name', file.name);
  formdata.append('project', projectId);
  formdata.append('file', file, file.name);
  formdata.append('mimetype', file.type);

  return makeNonJsonRequest(`/projects/${projectId}/files`, {
    method: 'POST',
    body: formdata,
  });
};
