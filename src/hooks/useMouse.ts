import { useCallback, useState } from "react";

function useMouse() {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false); // 마우스 다운(누른)상태 여부
  const [isRight, setIsRight] = useState<boolean | null>(null); // 마우스 클릭-오른쪽:true, 왼쪽:false
  const [mouseDownClientX, setMouseDownClientX] = useState<number | null>(null); // 마우스 다운시 x좌표

  // 타입 e: React.MouseEvent<HTMLElement, MouseEvent> => e.witch에 대한 타입 설정해서 넣어주기
  const onMouseDownFunc = useCallback((e: any) => {
    e.preventDefault();
    setIsMouseDown(true);
    setMouseDownClientX(e.clientX);
    // 브라우저별 마우스 오른쪽 클릭 인식 firefox, Safari, Chrome, Opera || IE, Opera
    setIsRight(("which" in e && e.which === 3) || ("button" in e && e.button === 2));
  }, []);

  const onMouseUpFunc = useCallback((e: any) => {
    setIsMouseDown(false);
    setIsRight(null);
    setMouseDownClientX(null);
  }, []);

  return { onMouseDownFunc, onMouseUpFunc, isMouseDown, isRight, mouseDownClientX };
}

export default useMouse;
