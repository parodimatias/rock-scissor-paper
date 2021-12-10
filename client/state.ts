const state = {
  data: {
    computerMoves: [],
    humanMoves: [],
    winner: [],
    list: [{}],
  },
  listeners: [],
  init() {
    const localData = localStorage.getItem("data");
    if (localData !== null) {
      state.setState(JSON.parse(localData));
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
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
  addItem(item) {
    this.data.list.push(item);
  },
  addPlayerGame(move) {
    this.data.humanMoves.push(move);
    state.getWinner();
  },
  addComputerGame(move: "rock" | "scissor" | "paper") {
    this.data.computerMoves.push(move);
    state.getWinner();
  },
  getResult(player: "computer" | "human") {
    state.getWinner();
    const winnerArr = state.getState().winner;
    let humanWins = 0;
    let computerWins = 0;
    winnerArr.forEach((element) => {
      if (element == "human") humanWins++;
      if (element == "computer") computerWins++;
    });
    if (player == "computer") {
      return computerWins;
    }
    if (player == "human") {
      return humanWins;
    }
  },
  getWinner() {
    const lastState = state.getState();
    let winner = [];

    for (let i = 0; i < this.data.computerMoves.length; i++) {
      if (
        lastState.computerMoves[i] == "scissor" &&
        lastState.humanMoves[i] == "scissor"
      ) {
        winner[i] = "tie";
      }
      if (
        lastState.computerMoves[i] == "rock" &&
        lastState.humanMoves[i] == "rock"
      ) {
        winner[i] = "tie";
      }
      if (
        lastState.computerMoves[i] == "paper" &&
        lastState.humanMoves[i] == "paper"
      ) {
        winner[i] = "tie";
      }
      if (
        lastState.computerMoves[i] == "paper" &&
        lastState.humanMoves[i] == "rock"
      ) {
        winner[i] = "computer";
      }
      if (
        lastState.computerMoves[i] == "paper" &&
        lastState.humanMoves[i] == "scissor"
      ) {
        winner[i] = "human";
      }
      if (
        lastState.computerMoves[i] == "scissor" &&
        lastState.humanMoves[i] == "rock"
      ) {
        winner[i] = "human";
      }
      if (
        lastState.computerMoves[i] == "scissor" &&
        lastState.humanMoves[i] == "paper"
      ) {
        winner[i] = "computer";
      }
      if (
        lastState.computerMoves[i] == "rock" &&
        lastState.humanMoves[i] == "paper"
      ) {
        winner[i] = "human";
      }
      if (
        lastState.computerMoves[i] == "rock" &&
        lastState.humanMoves[i] == "scissor"
      ) {
        winner[i] = "computer";
      }
    }
    state.setState({ ...lastState, winner: winner });
  },
  foundLastWinner() {
    const lastState = state.getState();
    const winners = lastState.winner;
    return winners[winners.length - 1];
  },
};
export { state };
