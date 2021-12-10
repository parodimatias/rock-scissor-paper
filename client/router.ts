import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/insert-name", component: "insert-name" },
  { path: "/join-room", component: "join-room" },
]);
