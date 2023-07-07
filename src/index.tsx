/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import { MetaProvider } from "@solidjs/meta";
import { Route, Router, Routes } from "@solidjs/router";
import Home from "./Home";
import Login from "./Login";
import { AuthProvider } from "./contexts/auth";

render(
  () => (
    <Router>
      <MetaProvider>
        <AuthProvider user={null}>
          <Routes>
            <Route path="/" component={Home} />
            <Route path="/login" component={Login} />
          </Routes>
        </AuthProvider>
      </MetaProvider>
    </Router>
  ),
  document.getElementById("root")!
);
