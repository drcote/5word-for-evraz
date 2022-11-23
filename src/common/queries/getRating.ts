import { IRatingDto, queryFetchWithJson } from "..";

interface IGetRating {
  d: {
    results: {
      Title: string;
      Time: number;
      isWin: boolean;
      Group: string;
      Date: Date;
      ID: number;
    }[];
    __next: string | undefined;
  };
}

export const getRating = async (
  baseUrl: string,
  listId: string
): Promise<IRatingDto[]> => {
  let url = `${baseUrl}/_api/Web/Lists(guid'${listId}')/items`;

  let arr: IRatingDto[] = [];

  while (url !== "") {
    const itemsResponse = await queryFetchWithJson<IGetRating>(url);
    const result = itemsResponse.d.results.map((item) => ({
      userEmail: item.Title,
      time: item.Time,
      isWin: item.isWin,
      group: item.Group,
      date: new Date(item.Date),
      id: item.ID
    }));
    arr.push(...result);
    url = itemsResponse.d.__next ? itemsResponse.d.__next : "";
  }
  return arr;
};
