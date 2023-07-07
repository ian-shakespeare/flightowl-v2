/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import { MetaProvider } from "@solidjs/meta";
import { Route, Router, Routes } from "@solidjs/router";
import Home from "./routes/Home";
import Login from "./routes/Login";
import { AuthProvider } from "./contexts/auth";
import Flights from "./routes/Flights";

render(
  () => (
    <Router>
      <MetaProvider>
        <AuthProvider user={null}>
          <Routes>
            <Route path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/flights" component={Flights} />
          </Routes>
        </AuthProvider>
      </MetaProvider>
    </Router>
  ),
  document.getElementById("root")!
);
