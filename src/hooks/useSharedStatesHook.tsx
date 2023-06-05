import { SharedStatesType, useSharedStatesContext } from "../context/SharedStatesContext";
import { RolFacultate } from "../utils/types/backend-data";

export const useSharedStatesHook = () => {
	const sharedStates = useSharedStatesContext();

	const setSharedState = (value: SharedStatesType) => {
		const newState = sharedStates?.state;

		if (newState) {
			sharedStates.setState({...sharedStates.state, ...value});
		}
	};

	const setFacultateSelectata = (value: RolFacultate) => {
		const newState = sharedStates?.state;

		if (newState) {
			newState.facultateSelectata = value;
			sharedStates.setState({
				...sharedStates.state, 
				facultateSelectata: newState.facultateSelectata
			});
		}
	};

	const getFacultateSelectata = () => {
		return sharedStates?.state.facultateSelectata;
	};

	return {
		setFacultateSelectata, setSharedState, getFacultateSelectata
	};
};