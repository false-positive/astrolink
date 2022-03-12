import makeRequest, { makeNonJsonRequest } from './request';

// eslint-disable-next-line camelcase
export const fromApiFiles = ({ query_id, ...rest }) => ({
  // eslint-disable-next-line camelcase
  id: query_id,
  ...rest,
});
export const toApiFiles = ({ id, ...rest }) => ({
  query_id: id,
  ...rest,
});

export const getFiles = async (projectId) => {
  const response = await makeRequest(`/projects/${projectId}/files`);
  const apiFiles = await response.json();
  return apiFiles.map(fromApiFiles);
};

export const uploadFile = (projectId, file) => {
  const formdata = new FormData();
  formdata.append('name', file.name);
  formdata.append('project', projectId);
  formdata.append('file', file, file.name);
  formdata.append('mimetype', file.type || 'application/octet-stream');

  return makeNonJsonRequest(`/projects/${projectId}/files`, {
    method: 'POST',
    body: formdata,
  });
};
