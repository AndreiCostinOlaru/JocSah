﻿namespace JocSah.Server.ChessLogic
{
    public abstract class Move
    {
        public abstract MoveType Type { get; }
        public abstract Position FromPos { get; }
        public abstract Position ToPos { get; }

        public abstract void Execute(Board board);

        public virtual bool IsLegal(Board board)
        {
            if (board[FromPos] != null)
            {
                Player player = board[FromPos].Color;
                Board boardCopy = board.Copy();
                Execute(boardCopy);
                return !boardCopy.IsInCheck(player);
            }
            else
            {
                return false;
            }
        }
    }
}
