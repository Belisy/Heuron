import { SetStateAction, useState } from "react";
import { getPicsumList } from "@axios/index";
import { Data } from "@components/Type";

// TODO: Home페이지와 Detail페이지의 fetchData함수 이 파일에 옮겨서 모듈화 예정
async function useFetchData(dataList: SetStateAction<Data[]>) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1); // 추후 무한스크롤 구현용
  const [homeDataList, setHomeDataList] = useState<Data[]>([]);

  try {
    setIsLoading(true);
    const getDataList = await getPicsumList(page);

    // TODO: 아래 주석처리부분이 Home과 Detail 각 페이지에서 다른 부분
    // const dataList = getDataList.map((el: FetchData) => ({
    //   imageId: el.id,
    //   name: `Photo by ${el.author}`,
    //   url: el.download_url,
    //   thumbnail: el.download_url,
    // }));

    setHomeDataList(dataList);
    setIsLoading(false);
  } catch (error) {
    setIsError(true);
    throw error;
  }

  return { homeDataList, isLoading, isError };
}

export default useFetchData;
