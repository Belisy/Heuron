import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "@pages/Detail";
import Home from "@pages/Home";
import { ErrorBoundary } from "react-error-boundary";
import NotFound from "@pages/NotFound";
import ErrorFallback from "@components/ErrorFallback";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
