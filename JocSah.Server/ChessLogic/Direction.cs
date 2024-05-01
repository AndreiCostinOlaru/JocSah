namespace JocSah.Server.ChessLogic
{
    public class Direction
    {

        public readonly static Direction North = new Direction(-1, 0);
        public readonly static Direction South = new Direction(1, 0);
        public readonly static Direction East = new Direction(0, 1);
        public readonly static Direction West = new Direction(0, -1);
        public readonly static Direction NorthEast = North + East;
        public readonly static Direction SouthEast = South + East;
        public readonly static Direction NorthWest = North + West;
        public readonly static Direction SouthWest = South + West;


        public int RowDiff { get; }
        public int ColumnDiff { get; }

        public Direction(int rowDiff, int columnDiff)
        {
            RowDiff = rowDiff;
            ColumnDiff = columnDiff;
        }

        public static Direction operator +(Direction dir1 , Direction dir2)
        {
            return new Direction(dir1.RowDiff + dir2.RowDiff, dir1.ColumnDiff + dir2.ColumnDiff);
        }

        public static Direction operator * (int scalar, Direction dir)
        {
            return new Direction(scalar * dir.RowDiff, scalar * dir.ColumnDiff);
        }
    }
}
