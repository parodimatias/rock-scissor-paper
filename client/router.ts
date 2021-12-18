import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/insert-name", component: "insert-name" },
  { path: "/join-room", component: "join-room" },
  { path: "/game-room", component: "game-room" },
  { path: "/game-room-two", component: "game-room-two" },
  { path: "/game-room-two-bis", component: "game-room-two-bis" },
  { path: "/game-room-three", component: "game-room-three" },
  { path: "/game-results", component: "game-results" },
  { path: "/rejected-page", component: "rejected-page" },
]);
