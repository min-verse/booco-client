import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
    name: "user",
    initialState: {
        profile: {},
        isAuthenticated: false,
        readings: [],
        posts: [],
        comments: [],
        outgoings: [],
        friends: [],
        pendings: [],
        genres: {},
        moods: {}
    },
    reducers: {
        setUser: (state, action) => {
            state.profile = {
                id: action.payload.id,
                email: action.payload.email,
                username: action.payload.username,
                avatar:action.payload.avatar
            };
            state.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.profile = {};
            state.isAuthenticated = false;
            state.readings = [];
            state.posts = [];
            state.comments = [];
            state.friends = [];
            state.pendings = [];
            state.genres = {};
            state.moods = {};
        },
        setReadings: (state, action) => {
            state.readings = [...action.payload.readings];
        },
        setFriends: (state, action) => {
            state.friends = [...action.payload.friends];
        },
        setPosts: (state, action) => {
            state.posts = [...action.payload.posts];
        },
        setComments: (state, action) => {
            state.comments = [...action.payload.comments];
        },
        setPendings: (state, action) => {
            state.pendings = [...action.payload.pendings];
        },
        setGenres: (state, action) => {
            state.genres = { ...action.payload.genres };
        },
        setMoods: (state, action) => {
            state.moods = { ...action.payload.moods };
        },
        setReadingsUpdate: (state, action) => {
            state.readings = [...action.payload]
        },
        setPendingsUpdate: (state, action) => {
            state.pendings = [...action.payload]
        },
        setOutgoings: (state, action) => {
            state.outgoings = [...action.payload.outgoings]
        },
        setOutgoingsUpdate: (state, action) => {
            state.outgoings = [...action.payload]
        },
        setFriendsUpdate: (state, action)=>{
            state.friends = [...action.payload];
        }
    },
});

export const { setUser,
    clearUser,
    setReadings,
    setFriends,
    setPosts,
    setComments,
    setPendings,
    setGenres,
    setMoods,
    setReadingsUpdate,
    setPendingsUpdate,
    setOutgoings,
    setOutgoingsUpdate,
    setFriendsUpdate } = userSlice.actions;

export default userSlice.reducer;