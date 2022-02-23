import React from "react";
import MessageHeader from "./MessageHeader";
import styled from "styled-components";
import MessageHold from "./MessageHold";
import { useParams } from "react-router-dom";

const MessagePage = () => {
	const { id } = useParams();

	console.log("component clicked id", id);
	return (
		<Container>
			<MessageHeader id={id} />
			<MessageHold id={id} />
		</Container>
	);
};

export default MessagePage;

const Container = styled.div`
	width: 1100px;
`;
