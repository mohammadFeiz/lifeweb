import { createContext } from "react";
import { I_filter, I_row } from "../../types";
type I_AppContext = {
    data: I_row[]
    filter: I_filter,
    changeFilter: (newFilter: I_filter) => void
}
const AppContext = createContext<I_AppContext>({
    data: [],
    filter: { fromDate:'',toDate: '', search: '' },
    changeFilter: () => { }
})
export default AppContext