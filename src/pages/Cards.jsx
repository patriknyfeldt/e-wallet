import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";


const Cards = () => {
    const { user, cards } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
            dispatch(getUser())
    }, [])
    console.log(user)
    return ( 
        <>
            {user && <p>{user.name.first}</p>}
        </>
     );
}
 
export default Cards;