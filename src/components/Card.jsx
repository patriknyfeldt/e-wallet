import visaLogo from '../images/visa-logo.png'
import mastercardLogo from '../images/mastercard-logo.png'
import amexLogo from '../images/american-express-logo.png'
import placeHolder from '../images/placeholder-logo.png'
import chip from '../images/chip.png'
import blip from '../images/blip.png'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveCard, deActivateCard, deleteCard } from '../redux/userSlice'
import SyncIcon from '@mui/icons-material/Sync';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
const Card = (props) => {
    const { id, active, cardHolder, cardNumber, cvv, month, year, vendor } = props;
    const { activeCard } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [logo, setLogo] = useState()
    const [showBack, setShowBack] = useState(false);
    useEffect(() => {
        if(activeCard){
            setShowBack(false)
        }
        switch(vendor){
            case '': 
                setLogo(placeHolder)
                break;
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
    
    const flipCard = () => {
        setShowBack(!showBack);
    }
    const activateCard = () => {
        console.log('card clicked')
            dispatch(setActiveCard(props))
    }
    const closeCard = () => {
        dispatch(deActivateCard())
    }
    const removeCard = () => {
        console.log('trying to delete')
        dispatch(deleteCard(id))
    }

    return (
        <div className={`card ${vendor}`}>
            <div className={id >= 0? 'filter' : 'previewFilter'}>
            {active? 
                <>
                    <div onClick={flipCard} className="flipBox">
                    <SyncIcon className='flipIcon'/>
                    <p>Click to flip card</p>
                    </div>
                    {id >= 0 && 
                        <div onClick={closeCard} className="closeBox">
                        <p>Close Card</p>
                        <KeyboardDoubleArrowDownIcon className='closeIcon' />
                        </div>
                    }
                </>:
                <>
                    <div onClick={activateCard} className='openBox'>
                        <KeyboardDoubleArrowUpIcon className='openIcon'/>
                        <p>Click to view card</p>
                    </div>
                    <div onClick={removeCard} className="deleteBox" >
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