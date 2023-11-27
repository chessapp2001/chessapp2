
import React, { Component } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import "chessboard-element";
import web3 from "../../../ethereum/web3";
import chessinstance from "../../../ethereum/w_oxygen";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: new Chess(),
      isCheckmate: false,
      accountsInfo: null,
      ballanceInfo: null,
      showChessboard: false,
      isBoardFlipped: false,
      boardOrientation: "white",
      player1: "",
    };

    

    // this.safeGameMutate = this.safeGameMutate.bind(this);
    // this.makeRandomMove = this.makeRandomMove.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.Withdraw = this.Withdraw.bind(this);
    this.handleShowChessboard = this.handleShowChessboard.bind(this);
    this.toggleBoardOrientation = this.toggleBoardOrientation.bind(this);
  }

  


//   safeGameMutate(modify) {
//     this.setState((prevState) => {
//       const update = { ...prevState.game };
//       modify(update);
//       return { game: update };
//     });
//   }

//   makeRandomMove() {
//     const { game } = this.state;
//     const possibleMoves = game.moves();

//     if (game.game_over() || game.in_draw() || possibleMoves.length === 0) return;

//     if (game.in_checkmate()) {
//       this.setState({ isCheckmate: true });
//       return;
//     }

//     const randomIndex = Math.floor(Math.random() * possibleMoves.length);

//     this.safeGameMutate((game) => {
//       game.move(possibleMoves[randomIndex]);
//     });
//   }

  onDrop(source, target) {
    const { game } = this.state;
    const move = game.move({
      from: source,
      to: target,
      promotion: 'q',
    });

     if (move === null ) return false;
  //   const isWhiteTurn = game.turn() === 'w';
  // const isMoveByWhite = isWhiteTurn && this.state.boardOrientation === 'white';
  // const isMoveByBlack = !isWhiteTurn && this.state.boardOrientation === 'black';

  // if (!(isMoveByWhite || isMoveByBlack)) {
  //   // Ruch wykonany przez nieodpowiedniego gracza
  //   return false;
  // }

    if (game.in_checkmate()) {
      this.setState({ isCheckmate: true });
    }

    this.setState({ game: new Chess(game.fen()) });

    return true;
  }

  async Withdraw() {
    const accounts = await web3.eth.getAccounts();
    const balance = await chessinstance.methods.balance().call();
    this.setState({ accountsInfo: accounts, ballanceInfo: balance });
    await chessinstance.methods
      .WithdrawMoneyToWinner(accounts[0])
      .send({ gas: 20000000, from: accounts[0] });
    // Your withdrawal logic here
  }

  async handleShowChessboard() {
    const accounts = await web3.eth.getAccounts();
    // if(accounts[0]="0x0cfCc60D1FE009DD5Ce23189166f1C6Bd1074FA2")
    // this.setState({boardOrientation: "black"})
    // else
    // this.setState({boardOrientation: "white"})
    //await chessinstance.methods.PaybeforePlay().send({ gas:  20000000, from: accounts[0], value: 100000000000000000});;
    this.setState({ showChessboard: true });
  }

  toggleBoardOrientation() {
    this.setState((prevState) => ({
      boardOrientation: prevState.boardOrientation === "white" ? "black" : "white",
    }));
  }
  componentDidMount() {
    // Check for checkmate on mount
    const { game } = this.state;
    if (game.in_checkmate()) {
      this.setState({ isCheckmate: true });
    }
  }

  render() {
    const {
      isCheckmate,
      accountsInfo,
      ballanceInfo,
      showChessboard,
      game,
      boardOrientation,

    } = this.state;

    return (
      <div className="app">
        {isCheckmate ? (
          <div>
            <button className="button button1" onClick={this.Withdraw}>
              Wypłać swoją wygraną
            </button>
            {accountsInfo && (
              <div>
                <h2>Dane konta:</h2>
                <pre>{JSON.stringify(accountsInfo, null, 2)}</pre>
                <p>{ballanceInfo}</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            {showChessboard ? (
              <div>
                   <button onClick={this.toggleBoardOrientation}>
                  Toggle Board Orientation
                </button>
                <Chessboard
                  position={game.fen()}
                  onPieceDrop={this.onDrop}
                  boardOrientation={boardOrientation}
                 
                />
              </div>
            ) : (
              <button onClick={this.handleShowChessboard}>Zagraj w szachy</button>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;
