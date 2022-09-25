import '../styles/Home.scss'
import Cards from '../components/Cards'
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";
import { useEffect } from 'react';

const Home = () => {
    
    const { user, cards, activeCard } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
        if(!user){
            dispatch(getUser())
        }
    }, [user])
    // console.log(cards)
    // console.log(activeCard)
    return ( 
        <>
        {cards.length > 0 && !activeCard && 
        <div className='noActivatedCard'>
            <h3>Click on a card to active</h3>
        </div>}
        {user && <Cards {...user}/>}
        </>
     );
}
 
export default Home;