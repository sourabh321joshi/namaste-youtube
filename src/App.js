import { Provider } from "react-redux";
import { Suspense, lazy, useEffect } from "react";
import Body from "./components/Body";
import store from "./utils/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";

const MainContainer = lazy(() => import("./components/MainContainer"));
const WatchPage = lazy(() => import("./components/WatchPage"));
const SearchResultsPage = lazy(() => import("./components/SearchResultsPage"));

const appRouter = createBrowserRouter([{
  path:  "/",
  element: <Body/>,
  children:[
    {
      path:"/",
      element:<MainContainer/>,
    },
    {
      path:"watch",
      element:<WatchPage/>
    },
    {
      path: "results",
      element: <SearchResultsPage />,
    }

  ]
}]);

const ThemeWrapper = () => {
  const isDarkMode = useSelector((state) => state.app.darkMode);

  useEffect(() => {
    document.body.className = isDarkMode ? "bg-[#0f0f0f] text-white" : "bg-white text-black";
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <RouterProvider router={appRouter} />
    </Suspense>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ThemeWrapper />
    </Provider>
  );
}

export default App;
