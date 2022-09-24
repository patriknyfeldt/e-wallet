import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk('user/getUser', async () => {
    const response = await fetch(`https://randomuser.me/api/`);
    const {results} = await response.json();
    return results[0]
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
            user: null,
            cards: [],
            activeCard: null,
            currentId: 0,
            status: ''
    },
    reducers: {
        addCard: (state, { payload }) => {
            state.cards = [...state.cards, {...payload, id: state.currentId}]
            state.currentId += 1;

        },
        setActiveCard: (state, {payload}) => {
            if(state.cards.length > 0){
                state.cards = state.cards.filter((card) => card.id !== payload.id)
            }
            if(state.activeCard){
            //   state.cards.push({...state.activeCard, active: false}) 
              state.cards = [...state.cards, {...state.activeCard, active: false}]
            }
            
            state.activeCard = {...payload, active: true}
        }

    },
    extraReducers: {
        [getUser.pending]: (state, action) => {
            state.status = 'loading data'
        },
        [getUser.fulfilled]: (state, {payload}) => {
            state.user = payload;
            state.status = 'Found data'
        },
        [getUser.rejected]: (state, action) => {
            state.status = 'Failed to fetch data'
        }


    }
})

export const { setActiveCard, addCard } = userSlice.actions;

export default userSlice.reducer


