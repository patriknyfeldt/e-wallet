import visaLogo from '../images/visa-logo.png'
import mastercardLogo from '../images/mastercard-logo.png'
import amexLogo from '../images/american-express-logo.png'
import chip from '../images/chip.png'
import blip from '../images/blip.png'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveCard } from '../redux/userSlice'
import SyncIcon from '@mui/icons-material/Sync';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import OpenWithOutlinedIcon from '@mui/icons-material/OpenWithOutlined';
const Card = (props) => {
    const { active, cardHolder, cardNumber, cvv, month, year, vendor } = props;
    const { activeCard } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [logo, setLogo] = useState()
    const [showBack, setShowBack] = useState(false);
    useEffect(() => {
        if(activeCard){
            setShowBack(false)
        }
        switch(vendor){
            case 'Visa':
                setLogo(visaLogo)
                break;
            case 'Mastercard':
                setLogo(mastercardLogo)
                break;
            case 'AmericanExpress':
                setLogo(amexLogo)
                break
        }
    }, [activeCard, vendor])
    
    const handleCardClick = () => {
        if(!active){
            dispatch(setActiveCard(props))
           
        }
        else{
            setShowBack(!showBack)
        }
    }

    return (
        <div className={`card ${vendor}`} onClick={handleCardClick}>
            <div className='filter'>
            {active? 
                <>
                    <SyncIcon className='flipIcon'/>
                    <p>Click to flip card</p>
                </>:
                <>
                    <div className='openBox'>
                    <OpenWithOutlinedIcon className='openIcon'/>
                    <p>Click to open card</p>
                    </div>
                    <div className="deleteBox" >
                    <DeleteOutlinedIcon className='deleteIcon' />
                    <p>DELETE</p>
                    </div>
                </>
                }
                </div>
            {!showBack? 
            <>
            <img className='logo' src={logo} alt={`${vendor} logo`} />
            <div className='icons'>
            <img className="chip" src={chip} alt="chip image" />
            <img className="blip" src={blip} alt="tap to pay icon" />
            </div>
            <p className="cardNumber">{cardNumber}</p>
            <div className='textBox'>
                <div className='textGroup'>
                    <p className="cardLabel">CARDHOLDER NAME</p>
                    <p className="cardHolder">{cardHolder.toUpperCase()}</p>
                </div>
                <div className='textGroup'>
                    <p className="cardLabel">VALID THRU</p>
                    <p className="validThru">{month}/{year}</p>
                </div>
            </div>
            </>:
            <>
                <div className='magStripe'></div>
                <div className='cvv'>
                    <p>{cvv}</p>
                </div>
            </>
        }
        </div>
     );
}
 
export default Card;