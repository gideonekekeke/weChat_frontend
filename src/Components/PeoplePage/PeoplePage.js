import React, { useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removingUser } from "../../GlobalState/ReduxState";
import { GlobalContext } from "../../GlobalState/GlobalContext";
import FreinedsPage from "./FreinedsPage";

const PeoplePage = () => {
	const dispatch = useDispatch();
	const readUser = useSelector((state) => state.persistedReducer.userID);
	const [fetchData, setFetchData] = React.useState([]);
	const { current } = useContext(GlobalContext);

	const url = "http://localhost:9090/user";

	const getData = async () => {
		const res = await axios.get(url);

		setFetchData(res.data.data);
	};

	React.useEffect(() => {
		getData();
	}, []);

	return (
		<Container>
			<br />
			<br />
			<br />
			<br />
			<UserImage src={`http://localhost:9090/${current.image}`} />
			<TextHold>{current.fullName}</TextHold>
			<button
				onClick={() => {
					localStorage.removeItem("messanger");
					window.location.reload();
					dispatch(removingUser(readUser));
				}}>
				LogOut
			</button>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<h3>People You May Know</h3>
			{fetchData.map((props) => (
				<div key={props._id}>
					{props._id === current._id ? null : (
						<Holding>
							<Wrapper>
								<MainHold>
									{" "}
									<UserImage1 src={`http://localhost:9090/${props.image}`} />
									<TextHolding>
										<PersonName>{props.fullName}</PersonName>
										<TimeHold>
											<MesHold>{props.email}</MesHold>
										</TimeHold>
									</TextHolding>
								</MainHold>
							</Wrapper>
							<FreinedsPage props={props} />
						</Holding>
					)}
				</div>
			))}
		</Container>
	);
};

export default PeoplePage;

const Button = styled.button`
	height: 40px;
	width: 130px;
	background-color: #f3f3f5;
	color: black;
	border-radius: 5px;
	cursor: pointer;
	font-weight: bold;
	border: none;
	outline: none;

	:hover {
		background-color: #9884e9;
		color: white;
	}
`;

const TextHolding = styled.div`
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
`;

const Wrapper = styled.div`
	display: flex;
	/* align-items: center; */

	flex-direction: column;
`;
const UserImage1 = styled.img`
	height: 50px;
	width: 50px;
	background: #f3f3f5;
	border-radius: 50%;
	margin-left: 10px;
	border: 2px solid #9884e9;
	object-fit: cover;
`;

const Holding = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 93%;
`;

const TextHold = styled.div`
	font-weight: bold;

	margin-top: 5px;
`;
const UserImage = styled.img`
	height: 100px;
	width: 100px;
	background: silver;
	border-radius: 50%;
	border: 2px solid #9884e9;
	object-fit: cover;
`;

const Container = styled.div`
	width: 400px;
	border-left: 1px solid ${(props) => props.theme.boderLine};
	display: flex;
	/* justify-content: center; */
	align-items: center;
	flex-direction: column;

	/* background-color: red; */
`;
