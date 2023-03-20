import { Spinner } from "@chakra-ui/react";
import UserLayout from "components/layout/UserLayout";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "views/Home";
import Loading from "views/Loading";
const Dashboard = lazy(() => import("./views/Dashboard"));
const AllCommands = lazy(() => import("./views/AllCommands"));
const CommandCategory = lazy(() => import("./views/CommandCategory"));
const AllLinks = lazy(() => import("./views/AllLinks"));
const LinkCategory = lazy(() => import("./views/LinkCategory"));

// wrap all elements in suspense
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<Loading />}>
        <Dashboard />
      </Suspense>
    ),
  },
  {
    path: "/commands",
    element: (
      <Suspense fallback={<UserLayout><Spinner/></UserLayout>}>
        <AllCommands />
      </Suspense>
    ),
  },
  {
    path: "/commands/:id",
    element: (
      <Suspense fallback={<UserLayout><Spinner/></UserLayout>}>
        <CommandCategory />
      </Suspense>
    ),
  },
  {
    path: "/links",
    element: (
      <Suspense fallback={<UserLayout><Spinner/></UserLayout>}>
        <AllLinks />
      </Suspense>
    ),
  },
  {
    path: "/links/:id",
    element: (
      <Suspense fallback={<UserLayout><Spinner/></UserLayout>}>
        <LinkCategory />
      </Suspense>
    ),
  },
]);
