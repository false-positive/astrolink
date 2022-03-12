import makeRequest, { makeNonJsonRequest } from './request';

export const getFiles = async (_projectId) => {
  const response = await makeRequest('/files');
  const apiFiles = await response.json();
  return apiFiles.map((rest) => ({ ...rest, id: rest.pk }));
};

export const uploadFile = (projectId, file) => {
  const formdata = new FormData();
  formdata.append('name', file.name);
  formdata.append('project', projectId);
  formdata.append('file', file, file.name);

  return makeNonJsonRequest('/files', {
    method: 'POST',
    body: formdata,
  });
};
