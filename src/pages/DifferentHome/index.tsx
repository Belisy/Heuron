import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPicsumList } from "@axios/index";
import chunk from "@utils/chunk";
import ErrorFallback from "@components/ErrorFallback";
import Loding from "@components/Loding";
import { FetchData, Data } from "@components/Type";

function DifferentHome() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page] = useState(1);
  const [homeDataList, setHomeDataList] = useState<Data[]>([]);

  const newDataList = chunk(homeDataList, 3);

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
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isError) {
    return <ErrorFallback error={isError} />;
  }
  if (isLoading) {
    return <Loding />;
  }
  return (
    <>
      <h1>홈</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {newDataList &&
          newDataList.map((row, i) => (
            <tr key={row.length + i}>
              {row.map((item) => (
                <td key={item.imageId}>
                  <Link to={`/detail/${item.imageId}`} state={{ itemImage: item.url }}>
                    <div>
                      <img src={item.thumbnail} alt={`이미지-${item.imageId}`} loading="lazy" />
                    </div>
                  </Link>
                </td>
              ))}
            </tr>
          ))}
      </div>
    </>
  );
}

export default DifferentHome;
