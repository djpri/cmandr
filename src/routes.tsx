import { Spinner } from "@chakra-ui/react";
import { lazy, ReactNode, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "views/Home";
import Loading from "views/Loading";
import LoginRedirect from "views/login-redirect";

const UserLayout = lazy(() => import("./components/layout/UserLayout"));
const Dashboard = lazy(() => import("./views/Dashboard"));
const AllCommands = lazy(() => import("./views/commands/AllCommands"));
const CommandCategory = lazy(() => import("./views/commands/CommandCategory"));
const AllLinks = lazy(() => import("./views/links/AllLinks"));
const LinkCategory = lazy(() => import("./views/links/LinkCategory"));
const AllSnippetsPage = lazy(() => import("./views/snippets/AllSnippets"));
const SnippetCategoryPage = lazy(
  () => import("./views/snippets/SnippetCategory")
);
const AddSnippetPage = lazy(() => import("./views/snippets/AddSnippetPage"));

export type entityRoute = "commands" | "links" | "snippets";

export const basicRouter = createBrowserRouter([
  {
    path: "/login-redirect",
    element: <LoginRedirect />,
  },
]);

const WithUserLayout = ({ component }: { component: ReactNode }) => (
  <Suspense fallback={<Loading />}>
    <UserLayout>
      <Suspense fallback={<Spinner size="lg" />}>{component}</Suspense>
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
    path: "/login-redirect",
    element: <LoginRedirect />,
  },
  {
    path: "/dashboard",
    element: <WithUserLayout component={<Dashboard />} />,
  },
  {
    path: "/commands",
    element: <WithUserLayout component={<AllCommands />} />,
  },
  {
    path: "/commands/:id",
    element: <WithUserLayout component={<CommandCategory />} />,
  },
  {
    path: "/links",
    element: <WithUserLayout component={<AllLinks />} />,
  },
  {
    path: "/links/:id",
    element: <WithUserLayout component={<LinkCategory />} />,
  },
  {
    path: "/snippets",
    element: <WithUserLayout component={<AllSnippetsPage />} />,
  },
  {
    path: "/snippets/:id",
    element: <WithUserLayout component={<SnippetCategoryPage />} />,
  },
  {
    path: "/snippets/add",
    element: <WithUserLayout component={<AddSnippetPage />} />,
  },
]);
