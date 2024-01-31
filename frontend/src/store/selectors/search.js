import { selector } from "recoil";
import { searchState } from "../atoms/search";

export const search = selector({
    key : 'searchValue',
    get : ({get}) => {
        const state = get(searchState);
            return state.search;
    },
})