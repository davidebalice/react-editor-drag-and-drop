import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import CreateDesign from "./components/CreateDesign";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Templates from "./components/Templates";
import { ComponentsProvider } from "./context/ComponentsContext";
import Index from "./pages/Index";
import Layout from "./pages/Layout";
import Main from "./pages/Main";
import { token_decode } from "./utils/index";

const userInfo = token_decode(localStorage.getItem("token"));

const router = createBrowserRouter([
  {
    path: "/",
    element: userInfo ? <Layout /> : <Index />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/templates",
        element: <Templates />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
    ],
  },
  {
    path: "/design/create",
    element: userInfo ? <CreateDesign /> : <Navigate to="/" />,
  },
  {
    path: "/design/:design_id/edit",
    element: userInfo ? <Main /> : <Navigate to="/" />,
  },
]);

function App() {
  return (
    <ComponentsProvider>
      <RouterProvider router={router} />
    </ComponentsProvider>
  );
}

export default App;
