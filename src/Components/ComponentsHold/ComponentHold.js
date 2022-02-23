import React from "react";

import MessagePage from "../MessagesPage/MessagePage";
import PeoplePage from "../PeoplePage/PeoplePage";

const ComponentHold = () => {
	return (
		<div style={{ flex: 1, display: "flex", width: "100%" }}>
			<MessagePage />
		</div>
	);
};

export default ComponentHold;
