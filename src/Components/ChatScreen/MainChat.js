import React, { useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { GlobalContext } from "../../GlobalState/GlobalContext";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
	getGroupDatas,
	getGroupID,
	getUserChatId,
	postChate,
} from "../../GlobalState/ReduxState";
import { MdGroups } from "react-icons/md";

const MainChat = () => {
	const dispatch = useDispatch();
	const { current } = useContext(GlobalContext);
	const [fetchData, setFetchData] = React.useState([]);
	const [groupData, setGroupData] = React.useState([]);
	const [user, setUser] = React.useState([]);

	const url = "http://localhost:9090/friends";

	const getData = async () => {
		const res = await axios.get(url);

		setFetchData(res.data);
	};
	const getGroupData = async () => {
		const res = await axios.get("http://localhost:9090/groups");
		setGroupData(res.data);
		console.log("this is the group data", res.data);
	};

	React.useEffect(() => {
		getData();
		getGroupData();
	}, []);
	return (
		<Container>
			<ButHold to='/group'>
				{" "}
				<span>
					<MdGroups
						style={{ color: "white", fontSize: "30px", margin: "10px" }}
					/>
				</span>
				Create Group Chat
			</ButHold>

			<Wrapper>
				{groupData.map((props) => (
					<div>
						{props.createdBy === current._id ? (
							<LinkHold
								onClick={() => {
									dispatch(getGroupDatas(props.createdBy));
									dispatch(getGroupID(props._id));
									console.log(props.GroupMemebers);
								}}
								to={`/singlegroup/${props._id}`}>
								<MainHold>
									<div
										style={{
											height: "50px",
											width: "50px",
											borderRadius: "50%",
											background: "silver",
											marginLeft: "20px",
										}}>
										{" "}
										<MdGroups style={{ fontSize: "30px", margin: "10px" }} />
									</div>

									<TextHold>
										<PersonName>{props.GroupName}</PersonName>
									</TextHold>
								</MainHold>
							</LinkHold>
						) : (
							<div>
								{props.GroupMemebers.find((el) => el.id !== current._id) ? (
									<div>same group</div>
								) : null}
							</div>
						)}
					</div>
				))}
			</Wrapper>
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

const ButHold = styled(Link)`
	height: 40px;
	width: 100%;
	background-color: black;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	text-decoration: none;

	cursor: pointer;

	:hover {
		background-color: ${(props) => props.theme.boderLine};
		color: ${(props) => props.theme.col};
		cursor: pointer;

		span {
			color: ${(props) => props.theme.col};
			cursor: pointer;
		}
	}
`;

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

const Container = styled.div`
	height: 700px;
	/* background: red; */
	overflow-y: scroll;
`;
