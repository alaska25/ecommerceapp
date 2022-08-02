// React context 
// It allows us to pass down and use(consume) data in any component we need in our React app without using props.
// It allows us to share data (state) accross components more easily.
// 3 simple text in using React Context
	// 1. Creating the context
	// 2. Providing the context
	// 3. Consuming the context

import React from "react";

// Creating the Context Object
// A context object as the name stated is a data type of an object that can be used to stor information that can be shared to other components within the React app.
const UserContext = React.createContext();

export const UserProvider = UserContext.Provider;

export default UserContext;