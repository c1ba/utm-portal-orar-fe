import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
const httpLink = new HttpLink({
	uri: "http://localhost:5000/graphql"
});

const authLink = setContext(async (__, {headers}) => {
	const token = sessionStorage.getItem("token");
	return {
		headers: {
			...headers,
			Authorization: token ? `Bearer ${token}` : "",
			"Test123": "Test456"
		}
	};
});

export const apolloClient = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(httpLink)
});