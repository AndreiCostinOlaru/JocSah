import './Piece.css'

function Piece({ rank, file, piece }) {
  
    const className = `piece ${piece} p-${file}${rank}`;

    return (
        <div className={className} draggable={true}/>
    );
}

export default Piece;
