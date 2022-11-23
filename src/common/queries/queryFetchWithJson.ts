export const queryFetchWithJson = async <T>(requestUrl: string) => {
  const headers = { headers: { Accept: "application/json; odata=verbose", cache: "no-cache" } };
  const fetchResponse = await fetch(requestUrl, headers);
  let responseText: T;
  if (fetchResponse.ok) {
    try {
      responseText = await fetchResponse.json();
      return responseText as T;
    } catch (err: any) {
      
      const errorMessage = `Ошибка разбора результата запроса: ${requestUrl}
                                Ответ:
                                ${err}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

  } else {
    const resultText = await fetchResponse.text();
    throw new Error(resultText);
  }
}