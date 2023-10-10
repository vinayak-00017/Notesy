import { selector } from "recoil";
import { userState } from "../atoms/user";

export const isUserLogin = selector({
    key : 'userLoginState',
    get: ({get}) => {
        const state = get(userState);

        return state.isUser;
    }
})