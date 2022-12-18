import { FetchData, Data } from "@components/Type";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState<Data[]>([]);
  const [page, setPage] = useState(1);

  // TODO: api호출시 로딩 표시
  const fetchData = async () => {
    const { data } = await axios.get(`https://picsum.photos/v2/list?page=${page}`);

    const homeItems = data.map((el: FetchData) => ({
      imageId: el.id,
      name: `Photo by ${el.author}`,
      url: el.download_url,
      thumbnail: el.download_url,
    }));

    console.log("data", data);
    console.log("homeItems", homeItems);
    setData(homeItems);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>홈</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data &&
          data.map((el) => (
            <div key={el.imageId}>
              <Link to={`/detail/${el.imageId}`} state={{ itemImage: el.url }}>
                <div>
                  <img src={el.thumbnail} alt={`이미지-${el.imageId}`} style={{ width: "100px" }} />
                </div>
              </Link>
            </div>
          ))}
      </div>

      <button onClick={fetchData}>Generate</button>
    </div>
  );
}

export default Home;
