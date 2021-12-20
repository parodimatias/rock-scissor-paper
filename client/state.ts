const API_BASE_URL = "https://mp-rock-scissor-paper.herokuapp.com/";
import { rtdb } from "./rtdb";
import * as _map from "lodash/map";
import { onValue, ref, get } from "firebase/database";
import { Router } from "@vaadin/router";
const state = {
  data: {
    lastWinner: "",
    name: "",
    playerOne: {},
    playerTwo: {},
    playerOneMoves: [],
    playerOneLastMove: "",
    playerTwoLastMove: "",
    playerTwoMoves: [],
    playerOneWins: 0,
    playerTwoWins: 0,
    rtId: "",
    roomId: "",
  },
  listeners: [],
  init() {
    const localData = localStorage.getItem("data");
    if (localData !== null) {
      state.setState(JSON.parse(localData));
    }
    const cs = this.getState();
    if (cs.rtId) {
      this.listener();
    }
  },
  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("data", JSON.stringify(state.getState()));
    console.log("el state cambio", this.data);
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
  unsubscribe() {
    this.listeners.pop();
  },
  addPlayerGame(move) {
    const cs = state.getState();
    const rtId = cs.rtId;
    const userId = cs.userId;
    fetch(API_BASE_URL + "/play-move", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rtId,
        userId,
        move,
      }),
    })
      .then((response) => response.json())
      .then((res) => {});
  },

  getWinnerAndScore() {
    const cs = state.getState();
    cs.playerOneWins = 0;
    cs.playerTwoWins = 0;
    for (let i = 0; i < cs.playerOneMoves.length; i++) {
      if (cs.playerOneMoves[i] == "empty" && cs.playerTwoMoves[i] != "empty") {
        cs.playerTwoWins++;
        cs.lastWinner = cs.playerTwo.name;
      }
      if (cs.playerOneMoves[i] != "empty" && cs.playerTwoMoves[i] == "empty") {
        cs.playerOneWins++;
        cs.lastWinner = cs.playerOne.name;
      }
      if (cs.playerOneMoves[i] == "empty" && cs.playerTwoMoves[i] == "empty") {
        cs.lastWinner = "tie";
      }

      if (cs.playerOneMoves[i] == "scissor" && cs.playerTwoMoves[i] == "rock") {
        cs.playerTwoWins++;
        cs.lastWinner = cs.playerTwo.name;
      }
      if (
        cs.playerOneMoves[i] == "scissor" &&
        cs.playerTwoMoves[i] == "paper"
      ) {
        cs.playerOneWins++;
        cs.lastWinner = cs.playerOne.name;
      }
      if (cs.playerOneMoves[i] == "paper" && cs.playerTwoMoves[i] == "rock") {
        cs.playerOneWins++;
        cs.lastWinner = cs.playerOne.name;
      }
      if (
        cs.playerOneMoves[i] == "paper" &&
        cs.playerTwoMoves[i] == "scissor"
      ) {
        cs.playerTwoWins++;
        cs.lastWinner = cs.playerTwo.name;
      }
      if (cs.playerOneMoves[i] == "rock" && cs.playerTwoMoves[i] == "scissor") {
        cs.playerOneWins++;
        cs.lastWinner = cs.playerOne.name;
      }
      if (cs.playerOneMoves[i] == "rock" && cs.playerTwoMoves[i] == "paper") {
        cs.playerTwoWins++;
        cs.lastWinner = cs.playerTwo.name;
      }
      if (cs.playerOneMoves[i] == "rock" && cs.playerTwoMoves[i] == "rock") {
        cs.lastWinner = "tie";
      }
      if (cs.playerOneMoves[i] == "paper" && cs.playerTwoMoves[i] == "paper") {
        cs.lastWinner = "tie";
      }
      if (
        cs.playerOneMoves[i] == "scissor" &&
        cs.playerTwoMoves[i] == "scissor"
      ) {
        cs.lastWinner = "tie";
      }
    }
    state.setState(cs);
  },
  askNewRoom(callback) {
    const cs = state.getState();
    cs.playerOneWins = 0;
    cs.playerTwoWins = 0;
    const userId = cs.userId;
    const name = cs.name;
    fetch(API_BASE_URL + "/rooms", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        cs.roomId = data.roomId;
        cs.rtId = data.rtId;
        this.setState(cs);
        state.listener();
        callback();
      })
      .catch((error) => {
        alert("User not found");
      });
  },
  accessToRoom(callback) {
    const cs = state.getState();
    const roomId = cs.roomId;
    const userId = cs.userId;
    fetch(API_BASE_URL + "/rooms/" + roomId, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    })
      .then((response) => {
        if (response.status == 401) {
          Router.go("/rejected-page");
        } else if (response.status == 404) {
          alert("user not found");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        cs.rtId = data.rtId;
        this.setState(cs);
        state.update();
        state.listener();
        callback();
      })
      .catch((e) => {});
  },
  signIn(callback) {
    const cs = this.getState();
    const name = cs.name;
    fetch(API_BASE_URL + "/signin", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        cs.userId = data.userId;
        this.setState(cs);
        callback();
      });
  },
  confirmPlayGame() {
    const cs = state.getState();
    const rtId = cs.rtId;
    const userId = cs.userId;
    fetch(API_BASE_URL + "/play", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rtId,
        userId,
      }),
    })
      .then((response) => response.json())
      .then((res) => {});
  },
  update() {
    const cs = this.getState();
    const rtId = cs.rtId;
    const roomRef = ref(rtdb, `rooms/${rtId}`);
    get(roomRef).then((snapshot) => {
      const data = snapshot.val();
      cs.playerOne = data.playerOne;
      cs.playerTwo = data.playerTwo;
      if (typeof cs.playerOne.moves != "undefined") {
        cs.playerOneMoves = _map(cs.playerOne.moves);
      }
      if (typeof cs.playerTwo != "undefined") {
        if (typeof cs.playerTwo.moves != "undefined") {
          cs.playerTwoMoves = _map(cs.playerTwo.moves);
        }
      }
      this.setState(cs);
      this.getWinnerAndScore();
    });
  },
  listener() {
    const cs = this.getState();
    const rtId = cs.rtId;
    const roomRef = ref(rtdb, `rooms/${rtId}`);
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      cs.playerOne = data.playerOne;
      cs.playerTwo = data.playerTwo;
      if (typeof cs.playerOne.moves != "undefined") {
        cs.playerOneMoves = _map(cs.playerOne.moves);
      }
      if (typeof cs.playerTwo != "undefined") {
        if (typeof cs.playerTwo.moves != "undefined") {
          cs.playerTwoMoves = _map(cs.playerTwo.moves);
        }
      }
      this.setState(cs);
    });
  },
  unconfirmGamePlay() {
    const cs = state.getState();
    const rtId = cs.rtId;
    const userId = cs.userId;
    fetch(API_BASE_URL + "/unplay", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rtId,
        userId,
      }),
    })
      .then((response) => response.json())
      .then((res) => {});
  },
};

export { state };
