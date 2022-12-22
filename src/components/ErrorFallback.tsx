import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorFallback({ error }: { error: any }) {
  const navigate = useNavigate();
  return (
    <div>
      {error.message && <h1>Error: {error.message}</h1>}

      <div>아래 버튼을 눌러 홈으로 이동하세요.</div>
      <button onClick={() => navigate("/")}>Try again</button>
    </div>
  );
}

export default ErrorFallback;
