namespace JocSah.Server.ChessLogic
{
    public class Castle : Move
    {
        public override MoveType Type { get; }
        public override Position FromPos { get; }
        public override Position ToPos { get; }

        private readonly Direction kingMoveDir;
        private readonly Position rookFromPos;
        private readonly Position rookToPos;

        public Castle(MoveType type, Position kingPos)
        {
            Type = type;
            FromPos = kingPos;

            if(type == MoveType.CastleKS)
            {
                kingMoveDir = Direction.East;
                ToPos = new Position(kingPos.Row, 6);
                rookFromPos = new Position(kingPos.Row, 7);
                rookToPos = new Position(kingPos.Row, 5);
            }
            else if(type == MoveType.CastleQS) {
                kingMoveDir = Direction.West;
                ToPos = new Position(kingPos.Row, 2);
                rookFromPos = new Position(kingPos.Row, 0);
                rookToPos = new Position(kingPos.Row, 3);
            }
        }

        public override void Execute(Board board)
        {
            new NormalMove(FromPos, ToPos).Execute(board);
            new NormalMove(rookFromPos, rookToPos).Execute(board);
        }

        public override bool IsLegal(Board board)
        {
            if (board[FromPos] != null)
            {
                Player player = board[FromPos].Color;

                if (board.IsInCheck(player))
                {
                    return false;
                }

                Board copy = board.Copy();
                Position kingPosCopy = FromPos;

                for (int i = 0; i < 2; i++)
                {
                    new NormalMove(kingPosCopy, kingPosCopy + kingMoveDir).Execute(copy);
                    kingPosCopy += kingMoveDir;

                    if (copy.IsInCheck(player))
                    {
                        return false;
                    }
                }

                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
