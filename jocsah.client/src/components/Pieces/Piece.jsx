const onDragStart = (e, data) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', data);
    setTimeout(() => e.target.style.display = 'none', 0)
}


const onDragEnd = (e) => { e.target.style.display = 'block'}

function Piece({ rank, file, piece, onClick }) {
  
    let className = `piece ${piece} p-${file}${rank}`;
    const data = `${piece},${file},${rank}`;
    if (piece === ' ') {
        className+=' empty'
    }
    const handleDragStart = (e) => {
        onDragStart(e, data); 
    };

    const handleOnClick = (e) => {
        onClick(e, rank, file);
    }

    return (
        <div className={className} draggable={true} onDragStart={handleDragStart} onDragEnd={onDragEnd} onClick={handleOnClick} />
    );
}

export default Piece;
