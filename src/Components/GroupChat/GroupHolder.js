import React from "react";
import { useParams } from "react-router-dom";
import GroupHeader from "./GroupHeader";
import GroupPage from "./GroupPage";

const GroupHolder = () => {
	const { id } = useParams();
	return (
		<div style={{ width: "1100px" }}>
			<GroupHeader id={id} />
			<GroupPage id={id} />
		</div>
	);
};

export default GroupHolder;
