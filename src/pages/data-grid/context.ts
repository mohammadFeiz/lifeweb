import { createContext } from "react";
import { I_filter, I_row } from "./types";
import { I_usePopup } from "aio-popup";
type I_AppContext = {
    data: I_row[]
    filter: I_filter,
    changeFilter: (newFilter: I_filter) => void,
    popup:I_usePopup,
    openToolbarMobile:()=>void
}
const AppContext = createContext<I_AppContext>({} as any)
export default AppContext