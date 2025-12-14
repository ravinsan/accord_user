import { createBrowserRouter } from "react-router";
import UserDashboard from "./page/dashboard/UserDashboard";
import UserProfile from "./page/profile/UserProfile";
import MasterLayout from "./MasterLayout";
import Login from "./page/login/Login";
import TemplateUsage from "./page/actionBoard/TemplateUsage";
import { TeamplateUsageCreate } from "./page/actionBoard/TeamplateUsageCreate";
import { ActionTask } from "./page/actionBoard/ActionTask";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MasterLayout/>,
    children: [
      {
         index: true,
         element: <UserDashboard/>
      },
      {
        path: "profile",
        element: <UserProfile/>
      },
      {
        path: "template-usage",
        element: <TemplateUsage/>
      },
      {
        path: "template-usage-create",
        element: <TeamplateUsageCreate/>
      },
      {
        path: "action-tasks",
        element: <ActionTask/>
      },
      {
        path: "*",
        element: <div>404 Not Found</div>
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>
  },
]);
export default Router;
