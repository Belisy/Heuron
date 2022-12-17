import React from "react";

function ErrorFallback({ error, resetErrorBoundary }: { error: any; resetErrorBoundary: any }) {
  return (
    <div>
      <h1>Error: {error.message}</h1>

      <div>아래 버튼을 눌러 되돌아가세요.</div>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export default ErrorFallback;
