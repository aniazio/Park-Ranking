import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.module.css";
import RankingSite from "./Components/ranking/RankingSite";
import RootLayout from "./Components/RootLayout";
import ParkSite from "./Components/park-page/ParkSite";
import ParkForm from "./Components/park-page/ParkForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <RankingSite /> },
      { path: "/:id", element: <ParkSite /> },
      { path: "/new", element: <ParkForm park={null} /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
