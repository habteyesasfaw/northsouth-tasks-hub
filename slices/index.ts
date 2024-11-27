import { combineReducers } from "redux";

// login
import AuthManagementReducer from "./auth/reducer";


const rootReducer = combineReducers({
  AuthManagement: AuthManagementReducer,

});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
