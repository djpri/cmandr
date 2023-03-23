import { Spinner } from "@chakra-ui/react";
import { FC, lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "views/Home";
import Loading from "views/Loading";

const UserLayout = lazy(() => import("components/layout/UserLayout"));
const Dashboard = lazy(() => import("./views/Dashboard"));
const AllCommands = lazy(() => import("./views/AllCommands"));
const CommandCategory = lazy(() => import("./views/CommandCategory"));
const AllLinks = lazy(() => import("./views/AllLinks"));
const LinkCategory = lazy(() => import("./views/LinkCategory"));

const SpinnerFallback: FC = () => (
  <Suspense fallback={<Loading />}>
    <UserLayout>
      <Spinner />
    </UserLayout>
  </Suspense>
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
