import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";

const MessageHeader = ({ id }) => {
	const [fetchData, setFetchData] = React.useState([]);
	const [data, setData] = React.useState([]);
	const readChatId = useSelector((state) => state.persistedReducer.userChat);

	const getById = async () => {
		const res = await axios.get(`http://localhost:9090/user/${id}`);
		setFetchData(res);
	};

	const getUser = async () => {
		const res = await axios.get(`http://localhost:9090/user/${readChatId}`);

		setData(res.data.data);
	};

	React.useEffect(() => {
		getById();
		console.log(fetchData);
		getUser();
	}, [readChatId]);

	return (
		<Container>
			<Holding>
				<Wrapper>
					<MainHold>
						{" "}
						{data && <UserImage src={`http://localhost:9090/${data.image}`} />}
						<TextHold>
							<PersonName>{data && data.fullName}</PersonName>
							<TimeHold>
								<MesHold>{data && data.email}</MesHold>
							</TimeHold>
						</TextHold>
					</MainHold>
				</Wrapper>
			</Holding>
		</Container>
	);
};

export default MessageHeader;

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

const Holding = styled.div``;

const Container = styled.div`
	height: 70px;
	background-color: ${(props) => props.theme.back};
	width: 100%;
	box-shadow: ${(props) => props.theme.bshad};
	border-bottom: 1px solid ${(props) => props.theme.boderLine}; ;
`;
