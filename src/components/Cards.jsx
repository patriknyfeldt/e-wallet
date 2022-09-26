import Card from "./Card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cards = () => {
    const { cards, activeCard } = useSelector((state) => state.user)
    const navigate = useNavigate();

    return ( 
       <>
       {activeCard &&
       <div className="activeCard">
          <h3>Active Card</h3>
          <Card {...activeCard}/>
       </div>
        }
        <button className="addCardBtn" onClick={() => {navigate('/addcard')}}>Add Card</button>
       {cards.length > 0  && 
       <div className="notActiveCards">
          <h3>Your Cards</h3>
          {cards.map((card, i) => {
            return !card.active && <Card key={i} {...card}/>
          })}
       </div>
       }
       </>
     );
}
 
export default Cards;