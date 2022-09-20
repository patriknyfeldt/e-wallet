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
            status: ''
    },
    reducers: {
        addCard: (state, { payload }) => {
            state.cards = [...state.cards, payload]
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

export const { addCard } = userSlice.actions;

export default userSlice.reducer


