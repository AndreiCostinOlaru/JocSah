﻿namespace JocSah.Server.ChessLogic
{
    public class NormalMove: Move
    {
        public override MoveType Type => MoveType.Normal;
        public override Position FromPos { get; };
        public override Position ToPos { get; }

        public NormalMove(Position fromPos, Position toPos)
        {
            FromPos = fromPos;
            ToPos = toPos;
        }
        
        public override void Execute(Board board)
        {
            Piece piece = board[FromPos];
            board[ToPos] = piece;
            board[FromPos] = null;
            piece.HasMoved = true;
        }
    }
}
