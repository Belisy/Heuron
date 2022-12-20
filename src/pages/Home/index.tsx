import ErrorFallback from "@components/ErrorFallback";
import { FetchData, Data } from "@components/Type";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPicsumList } from "@axios/index";

function Home() {
  const [homeDataList, setHomeDataList] = useState<Data[]>([]);
  const [page, setPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const getDataList = await getPicsumList(page);
      const dataList = getDataList.map((el: FetchData) => ({
        imageId: el.id,
        name: `Photo by ${el.author}`,
        url: el.download_url,
        thumbnail: el.download_url,
      }));
      setHomeDataList(dataList);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isError) {
    return <ErrorFallback error={isError} resetErrorBoundary={() => {}} />;
  }

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <div>
      <h1>홈</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {homeDataList &&
          homeDataList.map((el) => (
            <div key={el.imageId}>
              <Link to={`/detail/${el.imageId}`} state={{ itemImage: el.url }}>
                <div>
                  <img src={el.thumbnail} alt={`이미지-${el.imageId}`} style={{ width: "100px" }} />
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
