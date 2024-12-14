import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import { Timer } from "./components/Timer";
import { DateTime } from "luxon";
import "./app.css";

export default function App() {
  return (
    <>
    <Router
      root={(props) => (
        <>
          <Nav />
          <Suspense>{props.children}</Suspense>
          <Timer />
        </>
      )}
    >
      <FileRoutes />
    </Router>
    </>
  );
}
