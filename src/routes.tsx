import { Spinner } from "@chakra-ui/react";
import UserLayout from "components/layout/UserLayout";
import { FC, lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "views/Home";
import Loading from "views/Loading";

const Dashboard = lazy(() => import("./views/Dashboard"));
const AllCommands = lazy(() => import("./views/commands/AllCommands"));
const CommandCategory = lazy(() => import("./views/commands/CommandCategory"));
const AllLinks = lazy(() => import("./views/links/AllLinks"));
const LinkCategory = lazy(() => import("./views/links/LinkCategory"));

const SpinnerFallback: FC = () => (
  <UserLayout>
    <Spinner />
  </UserLayout>
);

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
      <Suspense fallback={<SpinnerFallback />}>
        <AllCommands />
      </Suspense>
    ),
  },
  {
    path: "/commands/:id",
    element: (
      <Suspense fallback={<SpinnerFallback />}>
        <CommandCategory />
      </Suspense>
    ),
  },
  {
    path: "/links",
    element: (
      <Suspense fallback={<SpinnerFallback />}>
        <AllLinks />
      </Suspense>
    ),
  },
  {
    path: "/links/:id",
    element: (
      <Suspense fallback={<SpinnerFallback />}>
        <LinkCategory />
      </Suspense>
    ),
  },
]);
