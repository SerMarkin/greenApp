import { combineReducers } from './combineReducers';
import { sessionsReducer } from './sessions/sessions.reducer';
import { userReducer } from './user/user.reducer';

export const initialState: AppState = {
  data: {
    sessions: [],
    speakers: [],
    favorites: [],
    locations: [],
    allTracks: [],
    filteredTracks: [],
    mapCenterId: 0,
    loading: false
  },
  user: {
    hasSeenTutorial: false,
    darkMode: false,
    swipeMode: true,
    isLoggedin: false,
    loading: false,
    addUserdata: "",
    scorePaper:0,
  }
};

export const reducers = combineReducers({
  data: sessionsReducer,
  user: userReducer
});

export type AppState = ReturnType<typeof reducers>;