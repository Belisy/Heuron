import { useRef, useState } from "react";
import { canvasMaxHeight, canvasMaxWidth, imageHeight, imageWidth } from "@utils/canvas";

function useCanvas(itemImage: string, isRight: boolean | null) {
  const [canvasRotationAngle, setCanvasRotationAngle] = useState<number>(0); // 회전각도
  const [canvasSize, setCanvasSize] = useState<number>(1); // 사이즈 변경 값 (scale)
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleCanvasDraw = () => {
    const image = new Image();
    image.src = itemImage;
    image.onload = () => {
      const context = canvasRef.current?.getContext("2d");
      context?.clearRect(0, 0, canvasMaxWidth, canvasMaxHeight);
      context?.save();
      context?.setTransform(1, 0, 0, 1, 0, 0);
      context?.translate(canvasMaxWidth / 2, canvasMaxHeight / 2);

      if (isRight) {
        // 마우스 오른쪽: 회전
        handleCanvasRotate(image, context);
      } else {
        // 마우스 왼쪽: 사이즈 변경
        handleCanvasScale(image, context);
      }
    };
  };

  // 회전
  const handleCanvasRotate = (image: HTMLImageElement, context: CanvasRenderingContext2D | null | undefined) => {
    context?.scale(canvasSize, canvasSize);
    context?.rotate((Math.PI / 180) * canvasRotationAngle);
    context?.drawImage(image, -imageWidth / 2, -imageHeight / 2, imageWidth, imageHeight);
    context?.restore();
  };

  // 사이즈 변경
  const handleCanvasScale = (image: HTMLImageElement, context: CanvasRenderingContext2D | null | undefined) => {
    context?.rotate((Math.PI / 180) * canvasRotationAngle);
    context?.scale(canvasSize, canvasSize);
    context?.drawImage(image, -imageWidth / 2, -imageHeight / 2, imageWidth, imageHeight);
    context?.restore();
  };

  return {
    canvasRef,
    canvasSize,
    setCanvasSize,
    setCanvasRotationAngle,
    handleCanvasDraw,
  };
}

export default useCanvas;
