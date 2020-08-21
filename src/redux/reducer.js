import { ALL_TASK, DELETE_TASK, FILTER_TASK, GET_FAVORITE, DELETE_FAVORITE } from "./actions-types";


const initialUserState = {
    weatherInfo: [],
    favoriteCities: []
}

export const reducer = (state = initialUserState, action) => {
    switch (action.type) {
        case ALL_TASK:
            return {
                ...state,
                weatherInfo: [...state.weatherInfo, action.task]
            };
        case DELETE_TASK:
            return {
                ...state,
                weatherInfo: action.task
            };
        case FILTER_TASK:
            return {
                ...state,
                weatherInfo: [...action.task]
            };
        case GET_FAVORITE:
            return {
                ...state,
                favoriteCities: [...state.favoriteCities, action.task]
            };
        case DELETE_FAVORITE:
            return {
                ...state,
                favoriteCities: action.task
            };
        default:
            return state
    }
}