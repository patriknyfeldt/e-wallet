import Card from "./Card";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Cards = () => {
    const { cards, activeCard } = useSelector((state) => state.user)
    return ( 
       <>
       {activeCard &&
       <div className="activeCard">
         <Card {...activeCard}/>
       </div>
    }
       {cards.length > 0  && 
       <div className="notActiveCards">
        {cards.map((card, i) => {
            return !card.active && <Card key={i} {...card}/>
        })}
       </div>
       }
       </>
     );
}
 
export default Cards;