using JocSah.Server.ChessLogic;

namespace JocSah.Server
{
    public static class CurrentGame
    {
        public static GameState gameState;
        public static Position selectedPosition = null;
        public static String[,] highlights = new String[8, 8];
        public static readonly Dictionary<Position, Move> moveCache = new Dictionary<Position, Move>();
    }
}
