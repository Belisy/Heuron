import axios from "axios";
import React, { MouseEventHandler, useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";

function Detail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState();
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [size, setSize] = useState<number>(1);

  const [page, setPage] = useState(1);
  const { imageId } = useParams();
  const location = useLocation();
  const { itemImage } = location.state;

  const canvasMaxWidth = 800;
  const canvasMaxHeight = 600;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    const image = new Image();
    image.src = itemImage;

    image.onload = () => {
      context?.clearRect(0, 0, canvasMaxWidth, canvasMaxHeight);

      context?.save();

      context?.setTransform(1, 0, 0, 1, 0, 0);
      context?.translate(400, 300);

      context?.rotate((Math.PI / 180) * rotationAngle);
      context?.drawImage(image, -300, -200, 600, 400);

      context?.restore();
    };
  }, [itemImage, rotationAngle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    const image = new Image();
    image.src = itemImage;

    image.onload = () => {
      context?.clearRect(0, 0, canvasMaxWidth, canvasMaxHeight);
      context?.save();
      context?.setTransform(1, 0, 0, 1, 0, 0);

      // context?.resetTransform();

      context?.translate(400, 300);
      context?.scale(size, size);
      context?.drawImage(image, -300, -200, 600, 400);

      context?.restore();

      console.log("사이즈", size);
    };
  }, [itemImage, size]);

  // 데이터 받기 (새로고침하면 데이터가 안나옴/ 해결방법 찾기
  // => (리덕스: data, detailData 각각 axios detailData는 새로운 상세페이지로 이동할때마다 초기화 후 데이터 넣기))
  // 1. props (새로고침하면 데이터 안나옴)
  // 2. context api
  // 3. redux toolkit
  // 4. react query

  // const { data: imageItem } = useQuery(["get-data"], () => axios.get(`https://picsum.photos/v2/list?page=${page}`));

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const onMouseDownFunc = useCallback((e: any) => {
    // firefox, Safari, Chrome, Opera
    // IE, Opera
    const isRight = ("which" in e && e.which === 3) || ("button" in e && e.button === 2);

    isRight && setRotationAngle((angle) => (angle + 1) % 360); // 오른쪽 클릭시
    isRight || setSize((value) => value + 0.05); // 왼쪽 클릭시
  }, []);

  return (
    <>
      <div>상세 페이지</div>
      <canvas
        ref={canvasRef}
        width={canvasMaxWidth}
        height={canvasMaxHeight}
        onContextMenu={(e) => e.preventDefault()}
        onMouseDown={onMouseDownFunc}
        style={{ background: "pink" }}
      />
    </>
  );
}

export default Detail;
