import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCard } from "../redux/userSlice";


const AddCard = () => {
    const { cards } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const schema = yup.object().shape({
        cardNumber:yup.string()
                        .required("You must add a card number")
                        .matches(/^[0-9 ]+$/, "Must be only digits")
                        .min(19, "must be exactly 16 digits")
                        .max(19, "Must be exactly 16 digits"),
                        // .typeError('please enter a number'),
        cardHolder: yup.string()
                        .required(),
    })

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log('form submit')
        console.log(data)
        dispatch(addCard(data))
    }
    let [cardNumberInput, setCardNumberInput] = useState('')

    const handleKeyDown = (e) => {
        let {value} = e.target;
        if(e.which === 8){
            e.preventDefault()
            setCardNumberInput(cardNumberInput = value.slice(0,-1))
        }
        if(e.which === 32 || isNaN(String.fromCharCode(e.which))){
            e.preventDefault()
        }
    } 


    const handleInput = (e, inputType) => {
        const {value} = e.target
        switch(inputType) {
            case 'cardNumber':
                if(value.length === 4 || value.length === 9 || value.length === 14){
                    setCardNumberInput(cardNumberInput = value + ' ')
                    return
                }
                else{
                    setCardNumberInput(cardNumberInput = value)
                    return
                }
                
            case 'cardHolder':
                return console.log('cardHolder');
            case 'cvv':
              return console.log('cvv');
            default:
              return
          }
    }

    return ( 
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="cardNumber">CARD NUMBER</label>
            <input type="text" name="cardNumber" value={cardNumberInput} onInput={(e) => handleInput(e, 'cardNumber')} onKeyDown={(e) => handleKeyDown(e)} {...register("cardNumber")}/>
            <p>{errors.cardNumber?.message}</p>
            <label htmlFor="cardHolder">CARDHOLDER NAME</label>
            <input type="text" name="cardHolder" onInput={(e) => handleInput(e, 'cardHolder')} {...register("cardHolder")}/>
            <button type="submit">submit</button>
        </form>

        <div>{
            cards.length > 1? cards.map((card, i) => {
            return (
                <div key={i}>
                <p>{card.cardHolder}</p>
                <p>{card.cardNumber}</p>
                </div>
            )
        }):
            <div>
                <p>{cards[0].cardHolder}</p>
                <p>{cards[0].cardNumber}</p>
            </div>
        }</div>
        </>
     );
}
 
export default AddCard;