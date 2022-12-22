import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getPicsumList } from "@axios/index";
import { Data, FetchData } from "@components/Type";
// import Loding from "@components/Loding";
// import ErrorFallback from "@components/ErrorFallback";

function InfiniteScroll({
  page,
  setPageFunc,
  newDataList,
  setHomeDataListFunc,
  setIsLoadingFunc,
  setIsErrorFunc,
}: {
  page: number;
  setPageFunc: () => void;
  newDataList: Data[][];
  setHomeDataListFunc: (dataList: Data[]) => void;
  setIsLoadingFunc: (value: boolean) => void;
  setIsErrorFunc: (value: boolean) => void;
}) {
  const targetRef = useRef(null);
  // const [homeDataList, setHomeDataList] = useState<Data[]>([]);
  // const [isError, setIsError] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // TODO: useFetchData.ts파일에 담아서 재활용
  const fetchData = async () => {
    try {
      // setIsLoading(true);
      const getDataList = await getPicsumList(page);
      const dataList = getDataList.map((el: FetchData) => ({
        imageId: el.id,
        name: `Photo by ${el.author}`,
        url: el.download_url,
        thumbnail: el.download_url,
      }));
      setHomeDataListFunc(dataList);
      // setIsLoading(false);
    } catch (error) {
      // setIsError(true);
      throw error;
    }
  };

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      fetchData();
    }
  }, [page]);

  const callback = ([entries]: IntersectionObserverEntry[]) => {
    if (entries.isIntersecting) {
      console.log("fetch");
      setPageFunc();
    }
  };

  useEffect(() => {
    if (!targetRef.current) return;
    const observer = new IntersectionObserver(callback, {
      threshold: 1,
    });
    observer.observe(targetRef.current);
  }, [targetRef]);

  // if (isError) {
  //   return <ErrorFallback error={isError} />;
  // }
  // if (isLoading) {
  //   return <Loding />;
  // }
  return (
    <>
      {newDataList &&
        newDataList.map((row, i) => (
          <tr key={row.length + i}>
            {row.map((item) => (
              <td key={item.imageId}>
                <Link to={`/detail/${item.imageId}`} state={{ itemImage: item.url, page: page }}>
                  <div>
                    <img src={item.thumbnail} alt={`이미지-${item.imageId}`} loading="lazy" />
                  </div>
                </Link>
              </td>
            ))}
          </tr>
        ))}
      <div className="target" ref={targetRef}>
        Loading...
      </div>
    </>
  );
}

export default InfiniteScroll;
