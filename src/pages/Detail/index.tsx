import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getPicsumList } from "@axios/index";
import useCanvas from "@hooks/useCanvas";
import useMouse from "@hooks/useMouse";
import { canvasMaxHeight, canvasMaxWidth } from "@utils/canvas";
import { Canvas } from "@pages/Detail/styles";
import ErrorFallback from "@components/ErrorFallback";
import Loding from "@components/Loding";
import { FetchData } from "@components/Type";

function Detail() {
  const { imageId } = useParams();
  const location = useLocation();
  const [itemImage, setItemImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(Math.ceil(Number(imageId) / 6)); // url직접 입력시 페이지

  const { onMouseDownFunc, onMouseUpFunc, isMouseDown, isRight, mouseDownClientX } = useMouse();
  const { canvasRef, setCanvasSize, setCanvasRotationAngle, handleCanvasDraw } = useCanvas(itemImage, isRight);

  // TODO: fetchData함수 useFetchData.ts파일에 담아서 재활용 예정
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const getDataList = await getPicsumList(page);
      const detailData = getDataList.filter((el: FetchData) => el.id === imageId)[0];
      const detailUrl = detailData.download_url;
      setItemImage(detailUrl);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      throw error;
    }
  }, [page, imageId]);

  useEffect(() => {
    if (!location.state) {
      // url직접입력시
      fetchData();
    } else {
      setPage(location.state.page);
      setItemImage(location.state.itemImage);
    }
  }, [location.state, fetchData, itemImage]);

  useEffect(() => {
    handleCanvasDraw();
  }, [handleCanvasDraw]);

  // TODO: onMouseMoveFunc함수는 모듈화 예정
  const onMouseMoveFunc = useCallback(
    (e: any) => {
      if (!isMouseDown) {
        return;
      }

      const isMouseMovingLeft = mouseDownClientX && mouseDownClientX - e.clientX > 0 ? true : false; // true: 마우스 왼쪽으로 이동중

      // 오른쪽 클릭시 (회전)
      if (isRight) {
        console.log("회전", mouseDownClientX, "현재", e.clientX);
        if (isMouseMovingLeft) {
          // 마우스 왼쪽 이동중
          setCanvasRotationAngle((angle) => (angle - 1) % 360);
        } else {
          // 마우스 오른쪽 이동중
          setCanvasRotationAngle((angle) => (angle + 1) % 360);
        }
      }

      // 왼쪽 클릭시 (확대/축소)
      if (!isRight) {
        if (isMouseMovingLeft) {
          // 마우스 왼쪽 이동중 (축소)
          setCanvasSize((value) => (value - 0.05 < 0.1 ? 0.1 : value - 0.05)); // 음수값은 이미지가 역전되기 때문
        } else {
          // 마우스 오른쪽 이동중 (확대)
          setCanvasSize((value) => (value + 0.05 > 10 ? 10 : value + 0.05));
        }
      }
    },
    [isMouseDown, isRight, mouseDownClientX, setCanvasRotationAngle, setCanvasSize],
  );

  if (isError) {
    return <ErrorFallback error={isError} />;
  }
  if (isLoading) {
    return <Loding />;
  }
  return (
    <Canvas
      ref={canvasRef}
      width={canvasMaxWidth}
      height={canvasMaxHeight}
      onContextMenu={(e) => e.preventDefault()}
      onMouseDown={onMouseDownFunc}
      onMouseMove={onMouseMoveFunc}
      onMouseUp={onMouseUpFunc}
    />
  );
}

export default Detail;
