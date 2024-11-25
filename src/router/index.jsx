import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import RootLayout from "../RootLayout";
import MovieListPage from "../pages/MovieListPage";
import MovieListpageList from "../components/MovieListpageList";
import MovieDetailPage from "../pages/MovieDetailPage";
import TherPage from "../pages/TherPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "movieListPage",
        element: <MovieListPage />,
        children: [
          { path: "movieListPageList", element: <MovieListpageList /> },
          { path: "movieListPageList/:postId", element: <MovieListpageList /> },
        ],
      },
      // {
      //   path: "movieDetailPage",
      //   element: <MovieDetailPage />,
      //   children: [
      //     { path: "movieDetail", element: <MovieDetail /> },
      //   ],
      // },
      {
        path: "MovieDetailPage", element: <MovieDetailPage />
      },
      { path: "TherPage", element: <TherPage /> },
    ],
  },
]);

export default router;
