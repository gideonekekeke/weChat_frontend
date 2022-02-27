import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userID: [],
	userChat: [],
	MainIDS: [],
	groupId: [],
	groudData: [],
};

const ReduxState = createSlice({
	name: "messanger",
	initialState,
	reducers: {
		getUserID: (state, { payload }) => {
			state.userID = payload;
		},
		getUserChatId: (state, { payload }) => {
			state.userChat = payload;
		},
		postChate: (state, { payload }) => {
			state.MainIDS = payload;
		},
		getGroupID: (state, { payload }) => {
			state.groupId = payload;
		},
		getGroupDatas: (state, { payload }) => {
			state.groudData = payload;
		},
		removingUser: (state, { payload }) => {
			state.userID = state.userID.filter((item) => item === payload);
		},
	},
});

export const {
	getUserID,
	removingUser,
	getUserChatId,
	postChate,
	getGroupID,
	getGroupDatas,
} = ReduxState.actions;

export default ReduxState.reducer;
