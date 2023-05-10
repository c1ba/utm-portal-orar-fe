import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
const httpLink = new HttpLink({
	uri: process.env.REACT_APP_API_BACKEND_URI
});

const authLink = setContext(async (__, {headers}) => {
	const token = localStorage.getItem("token");
	return {
		headers: {
			...headers,
			Authorization: token ? `Bearer ${token}` : "",
		}
	};
});

export const apolloClient = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(httpLink)
});