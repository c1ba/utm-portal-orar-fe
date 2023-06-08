import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";
import { useUserContext } from "../../context/UserContext";

interface CustomApolloProviderInterface {
    children: React.ReactNode;
}

export const CustomApolloClientProvider: React.FC<CustomApolloProviderInterface> = ({children}) => {

	const usrCtx = useUserContext();

	const httpLink = new HttpLink({
		uri: process.env.REACT_APP_API_BACKEND_URI
	});
    
	const authLink = setContext(async (__, {headers}) => {
		const token = localStorage.getItem("token");
		return {
			headers: {
				...headers,
				Authorization: token ? `Bearer ${token}` : "",
				uid: usrCtx?.state._id ? usrCtx.state._id : ""
			}
		};
	});
    
	const apolloClient = new ApolloClient({
		cache: new InMemoryCache(),
		link: authLink.concat(httpLink)
	});
    
	return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}; 