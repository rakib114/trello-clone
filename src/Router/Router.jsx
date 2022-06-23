import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardDetail from "../pages/BoardDetail";
import BoardsHome from "../pages/BoardsHome";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoardsHome />} />
        <Route path="/:boardId" element={<BoardDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
