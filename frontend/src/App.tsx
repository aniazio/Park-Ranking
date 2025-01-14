import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.module.css";
import RankingSite from "./Components/ranking/RankingSite";
import RootLayout from "./Components/RootLayout";
import ParkSite from "./Components/park-page/ParkSite";
import ParkForm from "./Components/park-page/ParkForm";
import ErrorPage from "./Components/commons/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <RankingSite /> },
      { path: "/:id", element: <ParkSite /> },
      {
        path: "/new",
        element: (
          <ParkForm park={null} setEditing={() => {}} setPark={() => {}} />
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
