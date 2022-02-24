import React, { useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { GlobalContext } from "../../GlobalState/GlobalContext";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserChatId, postChate } from "../../GlobalState/ReduxState";

const MainChat = () => {
	const dispatch = useDispatch();
	const { current } = useContext(GlobalContext);
	const [fetchData, setFetchData] = React.useState([]);

	const url = "http://localhost:9090/friends";

	const getData = async () => {
		const res = await axios.get(url);

		setFetchData(res.data);
	};

	React.useEffect(() => {
		getData();
	}, []);
	return (
		<Container>
			<Wrapper>
				{fetchData.map((props) => (
					<div key={props._id}>
						{props.Ids === current._id ? (
							<LinkHold
								onClick={() => {
									dispatch(getUserChatId(props.userId));
									dispatch(postChate(props._id));
								}}
								to={`/chat/${props._id}`}>
								{" "}
								<MainHold>
									{" "}
									<UserImage
										src={`http://localhost:9090/${props.FriendImage}`}
									/>
									<TextHold>
										<PersonName>{props.FriendName}</PersonName>
										<TimeHold>{props._id}</TimeHold>
									</TextHold>
								</MainHold>
							</LinkHold>
						) : null}
					</div>
				))}
			</Wrapper>
		</Container>
	);
};

export default MainChat;

const LinkHold = styled(Link)`
	text-decoration: none;
	color: ${(props) => props.theme.col};
`;

const TextHold = styled.div`
	margin-left: 10px;
`;
const PersonName = styled.div`
	font-weight: bold;
`;
const TimeHold = styled.div`
	display: flex;
`;
const MesHold = styled.div``;
const Timing = styled.div`
	margin-left: 20px;
	color: silver;
`;

const MainHold = styled.div`
	display: flex;
	align-items: center;
	padding: 10px 0px;
	transition: all 350ms;

	:hover {
		background-color: ${(props) => props.theme.boderLine};
		color: black;
		cursor: pointer;
	}
`;

const Wrapper = styled.div`
	display: flex;
	/* align-items: center; */

	flex-direction: column;
`;
const UserImage = styled.img`
	height: 50px;
	width: 50px;
	background: #f3f3f5;
	border-radius: 50%;
	margin-left: 10px;
	border: 2px solid #9884e9;
	object-fit: cover;
`;

const Container = styled.div``;
