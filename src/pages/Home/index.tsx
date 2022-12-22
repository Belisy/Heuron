import React, { useCallback, useState } from "react";
import chunk from "@utils/chunk";
import HomeWrapper from "@pages/Home/styles";
import ErrorFallback from "@components/ErrorFallback";
import InfiniteScroll from "@components/InfiniteScroll";
import Loding from "@components/Loding";
import { Data } from "@components/Type";

function Home() {
  const [homeDataList, setHomeDataList] = useState<Data[]>([]);
  const [page, setPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setPageFunc = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);
  const setHomeDataListFunc = useCallback((newList: Data[]) => {
    setHomeDataList((prev) => [...prev, ...newList]);
  }, []);

  const newDataList = chunk(homeDataList, 3);

  if (isError) {
    return <ErrorFallback error={isError} />;
  }
  if (isLoading) {
    return <Loding />;
  }
  return (
    <HomeWrapper>
      <h1>Heuron Image Gallery</h1>
      <table>
        {newDataList && (
          <InfiniteScroll
            page={page}
            setPageFunc={setPageFunc}
            newDataList={newDataList}
            setHomeDataListFunc={setHomeDataListFunc}
          />
        )}
      </table>
    </HomeWrapper>
  );
}

export default Home;
