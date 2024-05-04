import Pieces from '../Pieces/Pieces'
import './Board.css'
import { useState,useEffect} from 'react'

function Board() {
    const [highlights, setHighlights] = useState(Array(8).fill(null).map(() => Array(8).fill(null)))

    useEffect(() => {
        fetchHighlights();
    }, []);
   
    const fetchHighlights = () => {
        fetch('chess')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(highlights => {
                setHighlights(highlights)
            })
            .catch(error => {
                console.error('Error fetching highlights:', error);
            });
    };
    const onPieceClick = async (e, r, c) => {
        try {
            
            const response = await fetch('/chess/selectpiece', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ row: 7-r, column: c })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const data = await response.json();
            setHighlights(data);
        }
        catch (error) {
            console.error('Error:', error);
        }
    };


    const getClassName = (i, j, h) => {
        let c = 'tile'

        c += (i + j) % 2 === 0 ? ' tile--dark' : ' tile--light'

        if (h === "1") {
            c += ' highlight'
        }

        return c
    }
    const ranks = Array(8).fill().map((x, i) => 7 - i)
    const files = Array(8).fill().map((x, i) => i)

    return (
        <div className="board">
            <div className="tiles">
                {ranks.map((rank, i) =>
                    files.map((file, j) =>
                      <div key={rank + "-" + file} className="tile">
                        <div key={rank + "-" + file} className={getClassName(9 - i, j, highlights[i][j])}></div>
                      </div>
                    )
                )}
            </div>
            <Pieces onPieceClick={(e, row, column) => onPieceClick(e, row, column)} resetHighlights={() => fetchHighlights()} />

        </div>
    );
}

export default Board;