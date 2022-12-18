import axios from "axios";
import React, { MouseEventHandler, useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";

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

function Detail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotationAngle, setRotationAngle] = useState<number>(0); // 회전각도
  const [size, setSize] = useState<number>(1); // 사이즈 변경 값 (scale)
  const [isMouseDown, setIsMouseDown] = useState(false); // 마우스 다운상태 여부
  const [isRight, setIsRight] = useState(false); // 마우스 오른쪽 클릭여부 (false:왼쪽클릭상태)

  const [mouseDownClientX, setMouseDownClientX] = useState(0); // 마우스 다운시 x좌표
  const [mouseDownClientY, setMouseDownClientY] = useState(0); // 마우스 다운시 y좌표
  const [mouseUpClientX, setMouseUpClientX] = useState(0);
  const [mouseUpClientY, setMouseUpClientY] = useState(0);

  const [page, setPage] = useState(1); // 추후 무한스크롤 구현용
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

  const onMouseDownFunc = useCallback((e: any) => {
    // 타입 e: React.MouseEvent<HTMLElement, MouseEvent>
    setIsMouseDown(true);
    // firefox, Safari, Chrome, Opera
    // IE, Opera
    setMouseDownClientX(e.clientX);
    setMouseDownClientY(e.clientY);

    setIsRight(("which" in e && e.which === 3) || ("button" in e && e.button === 2));
    // const isRight = ("which" in e && e.which === 3) || ("button" in e && e.button === 2);

    // isRight && setRotationAngle((angle) => (angle + 1) % 360); // 오른쪽 클릭시
    // isRight || setSize((value) => value + 0.05); // 왼쪽 클릭시
  }, []);
  // 모바일 버전으로 하면 오른쪽클릭시 메뉴창 뜸

  const onMouseMoveFunc = useCallback(
    (e: any) => {
      if (!isMouseDown) {
        return;
      }
      if (isRight) {
        isRight && setRotationAngle((angle) => (angle + 1) % 360); // 오른쪽 클릭시
      }
      if (!isRight) {
        isRight || setSize((value) => value + 0.05); // 왼쪽 클릭시
      }
      console.log("sjdklf", isRight);
      console.log(e.clientX, e.clientY);
      const a = mouseDownClientX - e.clientX > 0 ? true : false; // true: 마우스 왼쪽으로 이동중
    },
    [isMouseDown, isRight, mouseDownClientX],
  );

  const onMouseUpFunc = useCallback((e: any) => {
    setIsMouseDown(false);
  }, []);

  const onClickFunc = useCallback((e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    const offSetX = e.offsetX;
    const offSetY = e.offsetY;
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
        onMouseMove={onMouseMoveFunc}
        onMouseUp={onMouseUpFunc}
        onClick={onClickFunc}
        style={{ background: "pink" }}
      />
    </>
  );
}

export default Detail;
