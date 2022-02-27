import axios from "axios";
import React, { useContext } from "react";
import styled from "styled-components";
import Select from "react-select";
import { GlobalContext } from "../../GlobalState/GlobalContext";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router-dom";
const GroupChat = () => {
	const navigate = useNavigate();
	const [fetchData, setFetchData] = React.useState([]);
	const [groupName, setGroupName] = React.useState("");
	const { current } = useContext(GlobalContext);

	const [selectedData, setSelectedData] = React.useState("");
	// console.log(selectedData);

	const data = {
		GroupName: groupName,
		GroupMemebers: selectedData,
		createdBy: current._id,
	};

	const url = "http://localhost:9090/friends";

	const getData = async () => {
		const res = await axios.get(url);
		console.log(res.data);
		setFetchData(res.data);
	};

	const postData = async () => {
		const res = await axios.post("http://localhost:9090/groups", data);
		console.log(res);
	};

	React.useEffect(() => {
		getData();
	}, []);
	return (
		<Container>
			<Card>
				<div
					onClick={() => {
						navigate(-1);
					}}
					style={{
						marginLeft: "400px",
						marginTop: "20px",
						cursor: "pointer",
						color: "red",
					}}>
					<ImCancelCircle />
				</div>
				<h3>Create your Group </h3>
				<input
					onChange={(e) => {
						setGroupName(e.target.value);
					}}
					placeholder='enter Group Name'
				/>
				<input placeholder='Search for Member' />

				{fetchData.map((props) => (
					<>
						{props.Ids === current._id ? (
							<div
								style={{
									display: "flex",

									alignItems: "center",
									width: "400px",
								}}>
								{" "}
								<FormGroup style={{ minWidth: "10px" }} minWidth='10px'>
									<FormControlLabel
										style={{ minWidth: "10px" }}
										onChange={(e) => {
											setSelectedData([...selectedData, e.target.value]);
										}}
										control={<Checkbox />}
										label={props.FriendName}
										value={props.userId}
									/>
								</FormGroup>
								<ImageHold>
									<MainImage
										src={`http://localhost:9090/${props.FriendImage}`}
									/>
								</ImageHold>
							</div>
						) : null}
					</>
				))}

				<br />

				<ButtonHold
					onClick={() => {
						postData();
					}}>
					Create Group
				</ButtonHold>
			</Card>
		</Container>
	);
};

export default GroupChat;

const MainImage = styled.img`
	height: 30px;
	width: 30px;
	border-radius: 50%;
	background-color: silver;
`;

const ImageHold = styled.div`
	margin-left: 100px;
`;
const ButtonHold = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 300px;

	height: 40px;
	width: 150px;
	cursor: pointer;
	background-color: #0084ff;
	color: white;
	font-weight: bold;
`;

const Container = styled.div`
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.7);
	height: 100vh;
	position: absolute;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Card = styled.div`
	width: 500px;
	background-color: white;
	border-radius: 5px;
	display: flex;
	align-items: center;
	flex-direction: column;
	z-index: 1;
	padding-bottom: 50px;
	h4 {
		margin-top: 50px;
	}

	input {
		height: 50px;
		width: 400px;
		border-color: #0084ff;
		border-radius: 5px;
		margin: 5px;
		outline: none;
	}

	select {
		width: 400px;
		font-size: 20px;
	}
`;
