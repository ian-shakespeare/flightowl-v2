/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import Home from "./Home";
import { Route, Router, Routes } from "@solidjs/router";

render(
  () => (
    <Router>
      <Routes>
        <Route path="/" component={Home} />
      </Routes>
    </Router>
  ),
  document.getElementById("root")!
);
