import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import InputEmoji from "react-input-emoji";
import { GlobalContext } from "../../GlobalState/GlobalContext";
import { useSelector } from "react-redux";
import { AiTwotoneDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";

const MessageHold = () => {
	const url = "http://localhost:9090";
	const [com, setCom] = React.useState("");
	const { current } = useContext(GlobalContext);
	const [chatData, setChatData] = React.useState([]);
	const readChatId = useSelector((state) => state.persistedReducer.userChat);
	const readMainID = useSelector((state) => state.persistedReducer.MainIDS);

	const data = {
		chats: com,
		senderID: current._id,
		SendTo: readChatId,
	};

	const postMessage = async () => {
		await axios.post(url, data).then(() => {
			setCom("");
		});
	};

	const fetchChat = async () => {
		await axios.get(url).then((res) => {
			setChatData(res.data);
		});
	};

	const removeData = async (id) => {
		await axios.delete(`http://localhost:9090/${id}`).then(() => {
			window.location.reload();
		});
	};
	const customId = "custom-id-yes";

	const socket = io(url);
	socket.on("observer", (data) => {
		// console.log("thia ia rhwebjdn", data.chats);
		if (data.SendTo === current._id) {
			toast.success(`you have one new message (${data.chats})`, {
				position: "top-right",
				autoClose: 6000,
				toastId: customId,
				icon: "🚀",
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
		setChatData([...chatData, data]);
	});

	socket.on("observerDelete", (data) => {
		const res = chatData.filter((el) => el._id !== data);
		setChatData(res);
		console.log("na the ere", res);
	});

	// const testing = chatData.reduce((el) => el.userIds !== current._id);

	// console.log("testing facoes", testing);

	React.useEffect(() => {
		fetchChat();
		// console.log("here irss chatsffdd", chatData);
	}, []);

	return (
		<Container>
			<ToastContainer />
			<MainHold>
				<Second>
					<br />
					<MessComp>
						<Main>
							{chatData?.map((props) => (
								<div key={props._id}>
									<div style={{ minWidth: "20px" }}>
										{props.senderID === current._id &&
										readChatId === props.SendTo &&
										props.SendTo ? (
											<MessageContainer bg='#EFEFEF'>
												{props.chats}
											</MessageContainer>
										) : (
											<div>
												{props.SendTo === current._id &&
												readChatId === props.senderID &&
												props.senderID ? (
													<MessageContainer2>{props.chats}</MessageContainer2>
												) : null}
											</div>
										)}

										{props.senderID === current._id &&
										readChatId === props.SendTo &&
										props.SendTo ? (
											<span
												onClick={() => {
													removeData(props._id);
												}}>
												<AiTwotoneDelete
													style={{ color: "red", cursor: "pointer" }}
												/>
											</span>
										) : null}
									</div>
								</div>
							))}
						</Main>
					</MessComp>

					<ComPart>
						<InputEmoji
							value={com}
							onChange={setCom}
							placeholder='Type a message'
						/>

						<span onClick={postMessage}>Post</span>
					</ComPart>
				</Second>
			</MainHold>
		</Container>
	);
};

export default MessageHold;

const MessageContainer = styled.div`
	padding: 20px 30px;

	margin: 5px;
	min-width: 100px;
	justify-content: flex-start;
	right: 0;
	margin-left: ${({ ml }) => ml};
	max-width: 200px;
	border-radius: 360px;
	background-color: #0084ff;

	color: white;
	border: 1px solid silver;
`;
const MessageContainer2 = styled.div`
	padding: 20px 30px;

	margin: 5px;
	min-width: 100px;
	justify-content: flex-start;
	right: 0;
	margin-left: 700px;
	max-width: 200px;
	border-radius: 360px;
	color: black;
	background: silver;

	border: 1px solid silver;
`;

// {
// 	moment(props.createdAt.toDate()).fromNow();
// }

const ComPart = styled.div`
	display: flex;
	justify-content: space-between;
	border-top: 1px solid silver;

	align-items: center;
	padding-bottom: 10px;

	input {
		width: 200px;
		height: 40px;
		border: none;
		padding-left: 30px;
		outline: none;
	}

	span {
		color: #0080f7;
		cursor: pointer;
		padding: 10px 20px;
		border-radius: 20px;

		:hover {
			background-color: rgba(0, 0, 0, 0.1);
		}
	}
`;

const Main = styled.div`
	display: flex;
	// align-items: center;
	flex-direction: column;

	width: 100%;
	justify-content: space-between;
	span {
		margin-left: 10px;
	}
`;

const LastComp = styled.div``;
const MessComp = styled.div`
	/* flex: 1; */

	height: 800px;
	overflow-y: scroll;
	/* background-color: red; */
	width: 100%;
`;

const Heading = styled.div`
	background-color: white;
	box-shadow: 0px 5px 2px -5px rgba(0, 0, 0, 0.4);
	/* height: 70px; */
	width: 100%;
	display: flex;
	align-items: center;
`;

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${(props) => props.theme.back};
	/* background-color: black; */

	/* min-height: 100vh; */
`;
const MainHold = styled.div`
	height: 100%;
	width: 100%;
	background-color: ${(props) => props.theme.back};
	box-shadow: 0px 5px 2px -5px rgba(0, 0, 0, 0.4);
	border-radius: 5px;
	display: flex;
`;
const MainVideo = styled.video`
	height: 100%;
	width: 100%;
	object-fit: fit;
	border-radius: 5px;
`;
const Image = styled.img`
	height: 100%;
	width: 100%;
	object-fit: cover;
	border-radius: 5px;
`;
const First = styled.div`
	height: 100%;
	width: 500px;
	background: silver;
	border-right: 1px solid gray;
	border-radius: 5px;
`;
const Second = styled.div`
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	flex: 1;
`;
