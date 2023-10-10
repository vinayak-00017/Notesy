import {atom} from "recoil";

export const userState = atom({
    key : 'userState',
    default: {
        isLoading : true,
        isUser : false
    }
});