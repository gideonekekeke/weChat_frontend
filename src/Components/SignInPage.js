import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUserID } from "../GlobalState/ReduxState";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
	const navigate = useNavigate();
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const dispatch = useDispatch();

	const data = {
		email: email,
		password: password,
	};

	const onSubmitData = async () => {
		await axios
			.post("http://localhost:9090/siginin", data)
			.then((res) => {
				localStorage.setItem("messanger", JSON.stringify(res.data.data));
				dispatch(getUserID([res.data.data]));
				window.location.reload(navigate("/"));
				navigate("/");
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	return (
		<Container>
			{" "}
			<Card>
				<Logo />

				<input
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					required={true}
					placeholder='Email'
				/>
				<input
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					required={true}
					placeholder='Password'
					type='password'
					type='password'
				/>
				<button onClick={onSubmitData}>Log In</button>
			</Card>
			<Card2>
				<p>
					Don't have and Account? <span>Sign Up</span>
				</p>
			</Card2>
		</Container>
	);
};

export default SignInPage;

const Card2 = styled.div`
	height: 50px;
	width: 380px;
	background: white;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	box-shadow: 0px 5px 2px -5px rgba(0, 0, 0, 0.4);
	margin-top: 10px;

	span {
		color: red;
		font-weight: bold;
		cursor: pointer;
	}
`;
const Input = styled.input`
	display: none;
`;

const LabelButton = styled.label`
	padding: 15px 50px;
	background-color: #0080f7;
	color: white;
	font-weight: bold;
	transition: all 350ms;
	border-radius: 20px;
	cursor: pointer;

	:hover {
		transform: scale(0.95);
	}
`;

const ImagePreview = styled.img`
	height: 80px;
	width: 80px;
	border-radius: 50%;
	background-color: silver;
`;

const Logo = styled.img`
	height: 40px;
	width: 100px;
	object-fit: contain;
	/* margin-top: 50px; */
`;

const Card = styled.div`
	height: 480px;
	width: 380px;
	background: white;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	box-shadow: 0px 5px 2px -5px rgba(0, 0, 0, 0.4);

	input {
		height: 30px;
		width: 300px;
		margin: 5px;
		border: none;
		outline: none;
		background-color: white;
		box-shadow: 0px 5px 2px -5px rgba(0, 0, 0, 0.4);
	}

	button {
		width: 300px;
		height: 50px;
		margin-top: 10px;
		cursor: pointer;
		background-color: #0080f7;
		color: white;
		font-weight: bold;
		font-size: 14px;
		border: none;
		border-radius: 10px;
	}
`;

const Container = styled.div`
	min-height: 90vh;
	width: 100%;
	background: #efefef;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
