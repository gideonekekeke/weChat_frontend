import React, { useContext } from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { GlobalContext } from "../../GlobalState/GlobalContext";

const ChatHeader = ({ toogleTheme }) => {
	const { current } = useContext(GlobalContext);

	return (
		<Container>
			<Wrapper>
				<UserImage src={`http://localhost:9090/${current.image}`} />
				<h2>WeChat</h2>
				<button onClick={toogleTheme}>Dark/light</button>
			</Wrapper>
			<SearchHold>
				<span>
					<BsSearch />
				</span>
				<input placeholder='search' />
			</SearchHold>
		</Container>
	);
};

export default ChatHeader;

const SearchHold = styled.div`
	height: 30px;
	width: 320px;
	background-color: #f3f3f5;
	border-radius: 20px;
	display: flex;
	align-items: center;

	span {
		margin-left: 15px;
        font-size  13px;
 color : ${(props) => props.theme.col};
	}

	input {
		border: none;
		outline: none;
		background-color: transparent;
		width: 270px;
        padding-left : 10px

	}
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 350px;

	h2 {
		color: ${(props) => props.theme.headerCol};
	}

	button {
		margin-right: 20px;
	}
`;
const UserImage = styled.img`
	height: 45px;
	width: 45px;
	background: #f3f3f5;
	border-radius: 50%;
	margin-left: 10px;
	object-fit: cover;
`;

const Container = styled.div`
	height: 150px;
	background-color: ${(props) => props.theme.back};
	flex-direction: column;
	display: flex;
	/* z-index: 1; */

	align-items: center;
	position: sticky;
	top: 0;
`;
