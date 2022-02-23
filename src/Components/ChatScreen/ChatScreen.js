import React from "react";
import ChatHeader from "./ChatHeader";
import styled from "styled-components";
import MainChat from "./MainChat";

const ChatScreen = ({ toogleTheme }) => {
	return (
		<Container>
			<ChatHeader toogleTheme={toogleTheme} />
			<MainChat />
		</Container>
	);
};

export default ChatScreen;

const Container = styled.div`
	width: 350px;
	background-color: ${(props) => props.theme.back};
	flex-direction: column;
	border-right: 1px solid ${(props) => props.theme.boderLine};
	height: 100vh;
`;
