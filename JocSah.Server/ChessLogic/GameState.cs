namespace JocSah.Server.ChessLogic
{
    public class GameState
    {
        public Board Board { get; }
        public Player CurrentPlayer { get; private set; }

        public GameState(Board board, Player currentPlayer)
        {
            Board = board;
            CurrentPlayer = currentPlayer;
        }

        public IEnumerable<Move> LegalMovesForPiece(Position pos)
        {
            if (Board.IsEmpty(pos) || Board[pos].Color != CurrentPlayer)
            {
                return Enumerable.Empty<Move>();
            }

            Piece piece = Board[pos];
            return piece.GetMoves(pos, Board);
        }

        public void MakeMove(Move move) { 

            move.Execute(Board);
            CurrentPlayer = CurrentPlayer.Opponent();
        }
    }
}
