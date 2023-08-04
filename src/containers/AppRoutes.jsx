import { Route, Routes } from "react-router";
import Layout from "./Layout";
import Home from "./Home";
import NotFound from "./NotFound";


export function MyRoutes() {

  return (
    <Routes>
      <Route exact path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
