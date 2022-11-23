import { IWordDto, queryFetchWithJson } from "..";

interface IGetAllWords {
  d: {
    results: {
      StartDate: Date;
      Group: string;
      Theme: string;
      Title: string;
    }[];
    __next: string | undefined;
  };
}

export const getAllWords = async (
  baseUrl: string,
  listId: string
): Promise<IWordDto[]> => {
  let url = `${baseUrl}/_api/Web/Lists(guid'${listId}')/items?$orderby=StartDate asc`;

  let arr: IWordDto[] = [];

  while (url !== "") {
    const itemsResponse = await queryFetchWithJson<IGetAllWords>(url);
    const result = itemsResponse.d.results.map((item) => ({
      word: item.Title,
      theme: item.Theme,
      group: item.Group,
      date: new Date(item.StartDate),
    }));
    arr.push(...result);
    url = itemsResponse.d.__next ? itemsResponse.d.__next : "";
  }
  return arr;
};
