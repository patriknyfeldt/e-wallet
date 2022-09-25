import '../styles/AddCard.scss'
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCard } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

const AddCard = () => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()     

    const { cards, user } = useSelector((state) => state.user)
    const onNavigate = (page) => {
        navigate(page)
    }
    const schema = yup.object().shape({
        cardNumber:yup.string()
        .required("Please add a card number")
        .matches(/^[0-9 ]+$/, "Must be only digits")
        .min(19, "Must be exactly 16 digits")
        .max(19, "Must be exactly 16 digits"),
        
        cardHolder: yup.string()
        .required("Go back to wallet to fetch cardholder"),
        
        cvv: yup.string()
        .required("Please add cvv number")
        .matches(/^[0-9 ]+$/, "Must be only digits")
        .min(3, "must be exactly 3 digits")
        .max(3, "Must be exactly 3 digits"),

        vendor: yup.string()
        .required("Please pic a vendor"),

        month: yup.string()
        .required("Please pic a month"),

        year: yup.string()
        .required("Please pic a year")
    })

    const defaultValues = {
        cardNumber: 'XXXX XXXX XXXX XXXX',
        cardHolder: user? `${user.name.first} ${user.name.last}`: '',
        cvv: 'XXX',
        vendor: '',
        month: '',
        year: ''
    }

    const { register, handleSubmit, setValue, getValues, reset, formState: {errors, isSubmitSuccessful} } = useForm({
        resolver: yupResolver(schema),
        defaultValues
    });

    const [currentValues, setCurrentvalues] = useState({...defaultValues, active: true});

    const onSubmit = (data) => {
        dispatch(addCard({...data, active: false}))
        setCurrentvalues({...defaultValues, active: true })
    }
    useEffect(() => {
        if(isSubmitSuccessful){
            reset()
        }
    }, [isSubmitSuccessful, reset])

    const clearOnFocus = (inputField) => {
        setCurrentvalues({...currentValues, [inputField]: ''})
        setValue(inputField, '')
    }

    const handleKeyDown = (e, inputType) => {
        let {value} = e.target;
        if(inputType === 'cardNumber'){
            if(value.length >= 19){
                e.preventDefault()
            }    
        }
        else if(inputType === 'cvv'){
            if(value.length >= 3){
                e.preventDefault()
            }
        }
        if(e.which === 8){
            e.preventDefault()
            setValue(inputType, value.slice(0,-1))
            setCurrentvalues({...currentValues, [inputType]: value.slice(0,-1)})
        }
    } 

    const handleInput = (e, inputType) => {
        let {value} = e.target
        let valueBefore = getValues(inputType)
        let latestValue = e.nativeEvent.data;
        
        if (!+latestValue){
            setValue(inputType, valueBefore)
        }

        else if ((inputType === 'cardNumber') && (value.length === 4 ||value.length === 9 || value.length === 14) ){
            setValue('cardNumber', value + ' ')
        }

        else{
            setValue(inputType, value)
        }
    }

    const handleFormInput = (e) => {
        const {name, value} = e.target;
        setCurrentvalues({...currentValues, [name]: value})
    }
    return ( 
        <>
        <div className="activeCard previewCard">
        <Card {...currentValues} />
        </div>

        <form onChange={(e) => handleFormInput(e)} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="cardNumber">CARD NUMBER</label>
            <input type="text" name="cardNumber" onKeyDown={(e) => handleKeyDown(e, 'cardNumber')} onFocus={() => clearOnFocus('cardNumber')} onInput={(e) => handleInput(e, 'cardNumber')} {...register("cardNumber")} />
            <p className="errorMsg" >{errors.cardNumber?.message}</p>
            <label htmlFor="cardHolder">CARDHOLDER NAME</label>
            <input type="text" name="cardHolder" readOnly {...register("cardHolder")}/>
            <p className="errorMsg" >{errors.cardHolder?.message}</p>
            <label htmlFor="cvv">CVV</label>
            <input type="text" name="cvv" onKeyDown={(e) => handleKeyDown(e, 'cvv')} onFocus={() => clearOnFocus('cvv')} onInput={(e) => {handleInput(e, 'cvv')}} {...register("cvv")} />
            <p className="errorMsg" >{errors.cvv?.message}</p>
            <label htmlFor="vendor">VENDOR</label>
            <select name="vendor" {...register("vendor")}>
                <option>Mastercard</option>
                <option>Visa</option>
                <option value="AmericanExpress">American Express</option>
            </select>
            <p className="errorMsg" >{errors.vendor?.message}</p>
            <div className="dateBox">
                <div className="dateGroup">
                    <label htmlFor="month">MM</label>
                    <select name="month" {...register("month")}>
                        {['01','02','03','04','05','06','07','08','09','11','12']
                        .map((month, i) => <option key={i}>{month}</option>)}
                    </select>
                    <p className="errorMsg" >{errors.month?.message}</p>
                </div>
                <p>/</p>
                <div className="dateGroup">
                    <label htmlFor="year">YY</label>
                    <select name="year" {...register("year")}>
                        {['22','23','24','25','26','27','28','29','30','31','32']
                        .map((year, i) => <option key={i}>{year}</option>)}
                    </select>
                    <p className="errorMsg" >{errors.year?.message}</p>
                </div>
            </div>
            <button className='submitBtn' type="submit">Submit</button>
        </form>
        <button className="walletBtn" onClick={() => onNavigate('/')}>View Wallet</button>        

        </>
     );
}
 
export default AddCard;