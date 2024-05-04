using JocSah.Server.ChessLogic;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;
using System.Globalization;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace JocSah.Server
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChessController : ControllerBase
    {

        // GET: api/<ChessController>

        [HttpGet("/chess")]
        public IActionResult GetHighlight()
        {
            for (int i = 0; i < 8; i++)
            {
                for (int j = 0; j < 8; j++)
                {
                    CurrentGame.highlights[i, j] = " ";
                }
            }
           
            return Ok(StringMatrixToJSon(CurrentGame.highlights));
        }

        [HttpGet("/chess/initialize")]
        public IActionResult Initialize()
        {
            CurrentGame.gameState = new GameState(Board.Initial(), Player.White);
            return Ok("Game state initialized successfully");
        }

        [TypeConverter(typeof(PosConverter))]
        public class Pos
        {
            public int Row { get; set; }
            public int Column { get; set; }

            public static bool TryParse(string s, out Pos result)
            {
                result = null;

                var parts = s.Split(',');
                if (parts.Length != 2)
                {
                    return false;
                }

                int row, column;
                if (int.TryParse(parts[0], out row) &&
                    int.TryParse(parts[1], out column))
                {
                    result = new Pos() { Row = row, Column = column };
                    return true;
                }
                return false;
            }
        }


        class PosConverter : TypeConverter
        {
            public override bool CanConvertFrom(ITypeDescriptorContext context, Type sourceType)
            {
                if (sourceType == typeof(string))
                {
                    return true;
                }
                return base.CanConvertFrom(context, sourceType);
            }

            public override object ConvertFrom(ITypeDescriptorContext context,
                CultureInfo culture, object value)
            {
                if (value is string)
                {
                    Pos pos;
                    if (Pos.TryParse((string)value, out pos))
                    {
                        return pos;
                    }
                }
                return base.ConvertFrom(context, culture, value);
            }
        }

        [HttpPost("/chess/selectpiece")]
        public IActionResult SelectPiece([FromBody] Pos position)
        {
            if (position == null)
            {
                return BadRequest("Invalid request body");
            }
            for (int i = 0; i < 8; i++)
            {
                for (int j = 0; j < 8; j++)
                {
                    CurrentGame.highlights[i, j] = " ";
                }
            }

            if (CurrentGame.gameState == null)
            {
                CurrentGame.gameState = new GameState(Board.Initial(), Player.White);
            }
            CurrentGame.selectedPosition = new Position(position.Row, position.Column);
            IEnumerable<Move> moves = CurrentGame.gameState.LegalMovesForPiece(CurrentGame.selectedPosition);

            if (moves.Any())
            {
                CacheMoves(moves);
                ShowHighlights(moves);
            }

            return Ok(StringMatrixToJSon(CurrentGame.highlights));
        }

        // POST api/<ChessController>
        [HttpPost("/chess/move")]
        public IActionResult MakeMove([FromBody] Pos position)
        {
            Position toPos = new Position(position.Row, position.Column);
            CurrentGame.selectedPosition = null;
            for (int i = 0; i < 8; i++)
            {
                for (int j = 0; j < 8; j++)
                {
                    CurrentGame.highlights[i, j] = " ";
                }
            }

            if (CurrentGame.moveCache.TryGetValue(toPos, out Move move))
            {
                CurrentGame.gameState.MakeMove(move);
            }
            return Ok(StringMatrixToJSon(BoardToString(CurrentGame.gameState.Board)));
        }

        [HttpGet("/chess/gameover")]
        public IActionResult GetResult()
        {
            if(CurrentGame.gameState != null && CurrentGame.gameState.Result != null)
            {
                return Ok(JsonSerializer.Serialize(CurrentGame.gameState.Result));
            }
            return Ok("null");
        }
        private void CacheMoves(IEnumerable<Move> moves)
        {
            CurrentGame.moveCache.Clear();

            foreach (Move move in moves)
            {

                CurrentGame.moveCache[move.ToPos] = move;
            }
        }

        private void ShowHighlights(IEnumerable<Move> moves)
        {
            foreach (Position to in CurrentGame.moveCache.Keys)
            {
                CurrentGame.highlights[to.Row, to.Column] = "1";
            }
        }

        private String[,] BoardToString(Board board)
        {
            String[,] stringMatrix = new string[8, 8];

            for (int row = 0; row < 8; row++)
            {
                for (int col = 0; col < 8; col++)
                {
                    if (!board.IsEmpty(new Position(row, col)))
                    {
                        Piece piece = board[row, col];
                        char color = piece.Color == Player.White ? 'w' : 'b';

                        char pieceType;
                        if (piece.GetType() == typeof(Pawn)) pieceType = 'p';
                        else if (piece.GetType() == typeof(Rook)) pieceType = 'r';
                        else if (piece.GetType() == typeof(Knight)) pieceType = 'n';
                        else if (piece.GetType() == typeof(Bishop)) pieceType = 'b';
                        else if (piece.GetType() == typeof(Queen)) pieceType = 'q';
                        else if (piece.GetType() == typeof(King)) pieceType = 'k';
                        else pieceType = ' ';

                        stringMatrix[7-row, col] = $"{color}{pieceType}";
                    }
                    else
                    {
                        stringMatrix[7-row, col] = " ";
                    }
                }
            }

            return stringMatrix;
        }


        private String StringMatrixToJSon(String[,] matrix)
        {
            List<List<string>> stringList = new List<List<string>>();

            for (int i = 0; i < matrix.GetLength(0); i++)
            {
                List<string> rowList = new List<string>();

                for (int j = 0; j < matrix.GetLength(1); j++)
                {
                    rowList.Add(matrix[i, j]);
                }

                stringList.Add(rowList);
            }

            string json = JsonSerializer.Serialize(stringList);
            return json;
        }
    }

    
}
