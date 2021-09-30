import { AppRouteNames } from "@/router";

interface NavLink {
  name: AppRouteNames;
  title: string;
  link: string;
  authorized: "all" | "auth" | "guest";
}

export default NavLink;
