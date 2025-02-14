import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import { Button } from "antd";

import BaoMatPage from "./BaoMat";

function App() {
  useEffect(() => {
    // axios.get('/api')
    //   .then(function (response) {
    //     console.log(response)
    //   })
  }, [])

  return (
    <BaoMatPage />
  );
}

export default App;