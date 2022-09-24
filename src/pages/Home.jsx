import '../styles/Home.scss'
import Cards from '../components/Cards'
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
    
    const navigate = useNavigate();
    const { user, cards, activeCard } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
        if(!user){
            dispatch(getUser())
        }
    }, [user])
    console.log(cards)
    console.log(activeCard)
    return ( 
        <>
        <p>Home</p>
        {user &&  <p>{user.name.first}</p>}
        <Cards {...user}/>
        <button className="addCardBtn" onClick={() => {navigate('/addcard')}}>Add Card</button>
        </>
     );
}
 
export default Home;