﻿namespace JocSah.Server.ChessLogic
{
    public class Pawn : Piece
    {

        public override PieceType Type => PieceType.Pawn;
        public override Player Color { get; }

        private readonly Direction forward;

        public Pawn(Player color)
        {
            Color = color;
            if(color == Player.White)
            {
                forward = Direction.North;
            }
            else if (color == Player.Black)
            {
                forward = Direction.South;
            }
        }

        public override Piece Copy()
        {
            Pawn copy = new Pawn(Color);
            copy.HasMoved = HasMoved;
            return copy;
        }

        public static bool CanMoveTo(Position pos, Board board)
        {
            return Board.IsInside(pos) && board.IsEmpty(pos);
        }

        public bool CanCaptureAt(Position pos, Board board) { 
            if(!Board.IsInside(pos) || board.IsEmpty(pos))  return false;
            
            return board[pos].Color != Color;
        }

        private IEnumerable<Move> ForwardMoves(Position from, Board board)
        {
            Position oneMovePos = from + forward;

            if (CanMoveTo(oneMovePos, board))
            {
                yield return new NormalMove(from, oneMovePos);

                Position twoMovePos = oneMovePos + forward;

                if (!HasMoved && CanMoveTo(twoMovePos, board))
                {
                    yield return new NormalMove(from, twoMovePos);
                }
            }
        }

        private IEnumerable<Move> DiagonalMoves(Position from, Board board)
        {

            foreach (Direction dir in new Direction[] { Direction.West, Direction.East })
            {
                Position to = from + forward + dir;

                if (CanCaptureAt(to, board))
                {
                    yield return new NormalMove(from, to);
                }
            }
        }

        public override IEnumerable<Move> GetMoves(Position from, Board board)
        {
            return ForwardMoves(from, board).Concat(DiagonalMoves(from,board));
        }
    }
}
