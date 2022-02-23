import React from "react";

import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
	const navigate = useNavigate();
	const [show, setShow] = React.useState(false);
	const [image, setImage] = React.useState("");
	const [imageDB, setImageDB] = React.useState("");
	const [fullName, setFullName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const handleShow = () => {
		setShow(!show);
	};

	const onChangeFile = (e) => {
		const file = e.target.files[0];
		const fileRef = URL.createObjectURL(file);

		setImage(file);
		setImageDB(fileRef);
		console.log(imageDB);
	};

	const onSubmitData = async (e) => {
		e.preventDefault();
		const formData = new FormData();

		formData.append("fullName", fullName);
		formData.append("email", email);
		formData.append("password", password);
		formData.append("image", image);

		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};

		await axios
			.post("http://localhost:9090/register", formData, config)
			.then((res) => {
				localStorage.setItem("messanger", JSON.stringify(res.data.data));
				setFullName("/");
				navigate("/signin");
			});
	};

	return (
		<Container>
			{show ? (
				<div>
					{" "}
					<Card>
						<Logo />

						<input placeholder='Email' />
						<input placeholder='Password' type='password' />
						<button>Log In</button>
					</Card>
					<Card2>
						<p>
							Don't have and Account? <span onClick={handleShow}>Sign Up</span>
						</p>
					</Card2>
				</div>
			) : (
				<div>
					{" "}
					<Card onSubmit={onSubmitData}>
						<Logo />
						<br />
						<ImagePreview src={imageDB} />
						<Input onChange={onChangeFile} id='pix' type='file' />
						<LabelButton htmlFor='pix'>Upload Image</LabelButton>
						<br />
						<input
							onChange={(e) => {
								setFullName(e.target.value);
							}}
							value={fullName}
							required={true}
							placeholder='fullName'
						/>
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
						/>
						<button type='submit'>Sign Up</button>
					</Card>
					<Card2>
						<p>
							Already have and Account? <span onClick={handleShow}>Login</span>
						</p>
					</Card2>
				</div>
			)}
		</Container>
	);
};

export default RegisterPage;

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

const Card = styled.form`
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
