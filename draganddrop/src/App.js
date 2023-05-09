import { useState } from "react";
import "./App.css";

function App() {
    const [cardList, setCardsList] = useState([
        { id: 1, order: 3, text: "КАРТОЧКА 3" },
        { id: 2, order: 1, text: "КАРТОЧКА 1" },
        { id: 3, order: 2, text: "КАРТОЧКА 2" },
        { id: 4, order: 4, text: "КАРТОЧКА 4" },
    ]);
    const [currentCard, setCurrentCard] = useState(null);

    const dragStartHandler = (e, card) => {
        console.log(card, "drag");
        setCurrentCard(card);
    };
    const dragEndHandler = (e) => {
        e.target.style.background = "white";
    };
    const dragOverHandler = (e) => {
        e.preventDefault();
        e.target.style.background = "lightgray";
    };
    const dropHandler = (e, card) => {
        e.preventDefault();
        setCardsList(
            cardList.map((item) => {
                if (item.id === card.id) {
                    return { ...item, order: currentCard.order };
                }
                if (item.id === currentCard.id) {
                    return { ...item, order: card.order };
                }
                return item;
            })
        );
        e.target.style.background = "white";
    };

    const sortCards = (a, b) => {
        if (a.order > b.order) {
            return 1;
        } else {
            return -1;
        }
    };

    return (
        <div className="app">
            {cardList.sort(sortCards).map((card) => (
                <div
                    key={card.id}
                    className="card"
                    draggable={true}
                    onDragStart={(e) => dragStartHandler(e, card)}
                    onDragLeave={(e) => dragEndHandler(e)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropHandler(e, card)}>
                    {card.text}
                </div>
            ))}
        </div>
    );
}

export default App;
