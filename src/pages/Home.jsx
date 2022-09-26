import '../styles/Home.scss'
import Cards from '../components/Cards'
import { useSelector, useDispatch } from "react-redux";
import { getUser, setActiveCard } from "../redux/userSlice";
import { useEffect } from 'react';

const Home = () => {
    const { user, cards, activeCard } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!user){
            dispatch(getUser())
        }
        else if(!activeCard && cards.length === 0){
            dispatch(setActiveCard(getRandomCard()))
        }
    }, [user])

    const getRandomNumber = (min, max) => {
        let number = ''
        if(min === 16 ||min === 3){
            for(let i = 0; i < min; i++){
                let x = Math.floor(Math.random() * 10);
                number += x
                if(i === 3 || i === 7 || i === 11){
                    number += ' '
                }
            }
            return number
        }
        else{
            number += Math.floor(Math.random() * (max - min + 1) ) + min
            return number;
        }
    }
    
    const getRandomVendor = () => {
        let x = getRandomNumber(1, 3)
        let vendor = ''
        switch(x){
            case '1': 
                vendor = 'Visa';
                break
            case '2':
                vendor = 'Mastercard';
                break
            case '3':
                vendor = 'AmericanExpress'
                break
            default: 
                vendor = ''
        }
        return vendor
    }
    
    const getRandomCard = () => {
        return {
            cardNumber: getRandomNumber(16, 16),
            cardHolder: `${user.name.first} ${user.name.last}`,
            cvv: getRandomNumber(3,3),
            vendor: getRandomVendor(),
            month: getRandomNumber(1, 12),
            year: getRandomNumber(22, 32),
            id: 0    
        }
    }
    
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