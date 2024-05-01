const onDragStart = (e, data) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', data);
    setTimeout(() => e.target.style.display = 'none', 0)

   
}




const onDragEnd = (e) => {
   e.target.style.display = 'block'
}



function Piece({ rank, file, piece }) {
  
    const className = `piece ${piece} p-${file}${rank}`;
    const data = `${piece},${file},${rank}`;

    const handleDragStart = (e) => {
        onDragStart(e, data); 
    };

    return (
        <div className={className} draggable={true} onDragStart={handleDragStart} onDragEnd={onDragEnd} />
    );
}

export default Piece;
