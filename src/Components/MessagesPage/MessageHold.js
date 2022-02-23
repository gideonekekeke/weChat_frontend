import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import InputEmoji from "react-input-emoji";
import { GlobalContext } from "../../GlobalState/GlobalContext";
import { useSelector } from "react-redux";
import { AiTwotoneDelete } from "react-icons/ai";

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
		await axios.post(url, data);
	};

	const fetchChat = async () => {
		const res = await axios.get(url);
		setChatData(res.data);
	};

	const removeData = async (id) => {
		await axios.delete(`http://localhost:9090/${id}`).then(() => {
			window.location.reload();
		});
	};

	const socket = io(url);
	socket.on("observer", (data) => {
		console.log(data);
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
			<MainHold>
				<Second>
					<br />
					<MessComp>
						<Main>
							{chatData?.map((props) => (
								<div>
									<div style={{ minWidth: "20px" }}>
										{props.senderID === current._id &&
										readChatId === props.SendTo &&
										props.SendTo ? (
											<div
												style={{
													backgroundColor: "#0084FF",
													minHeight: "30px",
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
													color: "white",

													padding: "10px",
													fontWeight: "bold",
													borderRadius: "5px",
													marginTop: "30px",
													minWidth: "20px",
												}}
												key={props._id}>
												<div
													style={{
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
														width: "100%",
													}}>
													<div
														style={{
															marginRight: "400px",
														}}>
														Me{" "}
														<span
															onClick={() => {
																removeData(props._id);
															}}>
															<AiTwotoneDelete
																style={{ color: "red", cursor: "pointer" }}
															/>
														</span>
													</div>

													<div style={{ marginRight: "400px" }}>
														{props.chats}
													</div>
												</div>
											</div>
										) : null}
									</div>

									<div style={{ display: "flex", flexDirection: "column" }}>
										{props.SendTo === current._id &&
										readChatId === props.senderID &&
										props.senderID ? (
											<div
												style={{
													backgroundColor: "#E4E6EB",
													minHeight: "30px",
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
													color: "black",

													padding: "10px",
													fontWeight: "bold",
													borderRadius: "5px",
													marginTop: "30px",
												}}
												key={props._id}>
												<div
													style={{
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
														width: "100%",
													}}>
													<div
														style={{
															marginRight: "400px",
															display: "flex",
														}}>
														other{" "}
														<span
															onClick={() => {
																removeData(props._id);
															}}>
															<AiTwotoneDelete
																style={{ color: "red", cursor: "pointer" }}
															/>
														</span>
													</div>

													<div style={{ marginRight: "400px" }}>
														{props.chats}
													</div>
												</div>
											</div>
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
