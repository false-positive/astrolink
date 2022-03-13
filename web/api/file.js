/* eslint-disable camelcase */
import makeRequest, { makeNonJsonRequest } from './request';

export const fromApiFiles = ({
  query_id,
  last_modified,
  created_at,
  ...rest
}) => ({
  id: query_id,
  lastModified: last_modified,
  createdAt: created_at,
  ...rest,
});
export const toApiFiles = ({ id, lastModified, createdAt, ...rest }) => ({
  query_id: id,
  last_modified: lastModified,
  created_at: createdAt,
  ...rest,
});

export const getFiles = async (projectId) => {
  const response = await makeRequest(`/projects/${projectId}/files`);
  const apiFiles = await response.json();
  return apiFiles.map(fromApiFiles);
};

export const getFile = async (projectId, fileId) => {
  const response = await makeRequest(`/projects/${projectId}/files/${fileId}`);
  if (response.ok) {
    const apiFile = await response.json();
    return fromApiFiles(apiFile);
  }
  const errors = await response.json();
  throw errors;
};

export const uploadFile = (projectId, file, filename) => {
  const formdata = new FormData();
  formdata.append('name', filename || file.name);
  formdata.append('project', projectId);
  formdata.append('file', file, file.name);
  formdata.append('mimetype', file.type || 'application/octet-stream');

  return makeNonJsonRequest(`/projects/${projectId}/files`, {
    method: 'POST',
    body: formdata,
  });
};

export const deleteFile = async (projectId, fileId) => {
  const response = makeRequest(`/projects/${projectId}/files/${fileId}`, {
    method: 'DELETE',
  });
  return response.status === 204;
};

export const deleteRevision = async (projectId, fileId, revisionId) => {
  const response = makeRequest(
    `/projects/${projectId}/files/${fileId}/revisions/${revisionId}`,
    {
      method: 'DELETE',
    }
  );
  return response.status === 204;
};
