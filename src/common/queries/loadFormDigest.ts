export const loadFormDigest = async (baseUrl: string) => {
  const formDigestResponse = await fetch(baseUrl + "/_api/contextinfo", {
    method: 'POST', cache: 'no-cache',
    headers: {
      "accept": "application/json; odata=verbose",
      "content-type": "application/json;odata=verbose"
    }
  });
  const formDigest = await formDigestResponse.json();
  return formDigest;
}