import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../GlobalState/GlobalContext";
import axios from "axios";

const FreinedsPage = ({ props }) => {
	const { current } = useContext(GlobalContext);

	const [fetchData, setFetchData] = React.useState([]);

	const url = "http://localhost:9090/friends";

	// const Ids = current._id;

	const data = {
		FriendName: props?.fullName,
		FriendImage: props?.image,
		userId: props?._id,
		Ids: current?._id,
	};

	const PostFriends = async () => {
		await axios.post("http://localhost:9090/friends", data);
	};

	const getData = async () => {
		const res = await axios.get(url);
		console.log(res.data);
		setFetchData(res.data);
	};

	React.useEffect(() => {
		getData();
		console.log("this is the friend", fetchData);
	}, []);

	return (
		<div>
			{fetchData.find((el) => el.Ids === props._id) ? (
				<Button onClick={PostFriends}> Add Friend</Button>
			) : (
				<Button onClick={PostFriends}> Add Friend</Button>
			)}
		</div>
	);
};

export default FreinedsPage;
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
