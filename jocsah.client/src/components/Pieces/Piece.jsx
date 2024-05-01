const onDragStart = (e, data) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', data);
    setTimeout(() => e.target.style.display = 'none', 0)
}


const onDragEnd = (e) => { e.target.style.display = 'block'}

function Piece({ rank, file, piece}) {
  
    let className = `piece ${piece} p-${file}${rank}`;
    const data = `${piece},${file},${rank}`;
    if (piece === ' ') {
        className+=' empty'
    }
    const handleDragStart = (e) => {
        onDragStart(e, data); 
    };

    const handleClick = (e) => {
        //send data to backend then from backend to board to higlight
        //onClick(data);
    };

    return (
        <div className={className} draggable={true} onDragStart={handleDragStart} onDragEnd={onDragEnd} onClick={handleClick} />
    );
}

export default Piece;
