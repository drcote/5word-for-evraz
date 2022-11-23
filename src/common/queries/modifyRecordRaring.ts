import { ListEntityTypeResponse, loadFormDigest, queryFetchWithJson } from "..";

export const modifyRecordRaring = async (
  baseUrl: string,
  listId: string,
  body: any,
  itemId: number
) => {
  const requestUrl = `${baseUrl}/_api/Web/Lists(guid'${listId}')/items(${itemId})`;
  const fetchTypeResponse = await queryFetchWithJson<ListEntityTypeResponse>(
    `${baseUrl}/_api/Web/Lists(guid'${listId}')/`
  );
  const digest = await loadFormDigest(baseUrl);
  await fetch(requestUrl, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "content-type": "application/json;odata=verbose",
      "X-RequestDigest": digest.d.GetContextWebInformation.FormDigestValue,
      "X-HTTP-Method": "MERGE",
      "IF-MATCH": "*"
    },
    body: JSON.stringify({
      __metadata: { type: fetchTypeResponse.d.ListItemEntityTypeFullName },
      Title: body.userEmail,
      Time: body.time,
      isWin: body.isWin,
      Group: body.group,
      Date: body.date,
    }),
  });
};
