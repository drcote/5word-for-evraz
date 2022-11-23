import { loadFormDigest, queryFetchWithJson } from "..";

export interface ListEntityTypeResponse {
  d:{
      ListItemEntityTypeFullName: string;
  }
}

export const createNewRecordRating = async (baseUrl: string, listId: string, body: any) => {
  const requestUrl = `${baseUrl}/_api/Web/Lists(guid'${listId}')/items`;
  const fetchTypeResponse = await queryFetchWithJson<ListEntityTypeResponse>(`${baseUrl}/_api/Web/Lists(guid'${listId}')/`);
  const digest = await loadFormDigest(baseUrl);
  await fetch(requestUrl, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      "content-type": "application/json;odata=verbose",
      "X-RequestDigest": digest.d.GetContextWebInformation.FormDigestValue,
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "__metadata": { "type": fetchTypeResponse.d.ListItemEntityTypeFullName },
      "Title": body.userEmail,
      "Time": body.time,
      "isWin": body.isWin,
      "Group": body.group,
      "Date": body.date,
    })
  })
}