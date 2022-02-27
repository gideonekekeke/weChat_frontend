import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdGroups } from "react-icons/md";

const GroupHeader = ({ id }) => {
	const [fetchData, setFetchData] = React.useState([]);
	const readGroupId = useSelector((state) => state.persistedReducer.groupId);

	const getById = async () => {
		const res = await axios.get(`http://localhost:9090/groups/${readGroupId}`);
		setFetchData(res.data);
	};

	React.useEffect(() => {
		getById();
		console.log("helloghh", fetchData);
	}, [readGroupId]);
	return (
		<Container>
			<Holding>
				<Wrapper>
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
							<PersonName>{fetchData && fetchData.GroupName}</PersonName>
							<TimeHold>
								<MesHold>{fetchData && fetchData.GroupMemebers}</MesHold>
							</TimeHold>
						</TextHold>
					</MainHold>
				</Wrapper>
			</Holding>
		</Container>
	);
};

export default GroupHeader;

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

const Holding = styled.div`
	width: 900px;
`;

const Container = styled.div`
	height: 70px;
	background-color: ${(props) => props.theme.back};
	width: 900px;
	box-shadow: ${(props) => props.theme.bshad};
	border-bottom: 1px solid ${(props) => props.theme.boderLine};
	position: sticky;
	top: 0;
`;
