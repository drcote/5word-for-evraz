import { queryFetchWithJson } from "./queryFetchWithJson";

export interface CurrentUserMinInfo {
  name: string;
  email: string;
}

interface IGetCurrentUser {
  d: {
    Title: string;
    Email: string;
  };
}

export const getCurrentUser = async (
  baseUrl: string
): Promise<CurrentUserMinInfo> => {
  let url = `${baseUrl}/_api/Web/CurrentUser`;
  const itemsResponse = await queryFetchWithJson<IGetCurrentUser>(url);
  const result = {
    name: itemsResponse.d.Title,
    email: itemsResponse.d.Email,
  };

  return result;
};