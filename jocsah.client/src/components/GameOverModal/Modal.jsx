import { useState, useEffect } from "react";
import "./Modal.css";

function Modal({winner, reason}) {
    const [modal, setModal] = useState(true);

    const toggleModal = () => {
        setModal(!modal);
    };

    useEffect(() => {
        if (modal) {
            document.body.classList.add('active-modal');
        } else {
            document.body.classList.remove('active-modal');
        }

        return () => {
            document.body.classList.remove('active-modal');
        };
    }, [modal]); 

    return (
        <>
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2>{reason}</h2>
                        {reason == "Stalemate" ? <p>It's a draw!</p> : <p>Winner is {winner}!</p>}
                        
                        <p>
                            If you want to play again refresh the page :)
                        </p>
                        <button className="close-modal" onClick={toggleModal}>
                            X
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
