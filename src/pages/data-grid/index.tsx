import { FC, useEffect, useRef, useState } from "react";
import { I_filter, I_row } from "../../types";
import Apis from "../../apis";
import AppContext from "./context";
import Table from "./table";
import Toolbar from "./toolbar";
import './index.css';

const DataGrid: FC = () => {
    const [data, setData] = useState<I_row[]>([])
    const [filter, setFilter] = useState<I_filter>({
        fromDate:'',
        toDate: '',
        search: ''
    })
    const apis = useRef<Apis>(new Apis())
    const fetchData = async (filter: I_filter) => {
        const res = await apis.current.getData(filter)
        if (res) {
            setData(res);
            setFilter(filter)
        }
    }
    const changeFilter = (newFilter: I_filter) => {
        fetchData(newFilter)
    }
    useEffect(() => {
        fetchData({ 
            fromDate: '', 
            toDate:'',
            search: '' 
        })
    }, [])
    return (
        <AppContext.Provider value={{ filter, changeFilter, data }}>
            <div className="bg-d-20- fullscreen- flex-row- of-hidden- p-12- gap-12-">
                <Toolbar />
                <Table />
            </div>
        </AppContext.Provider>
    )
}
export default DataGrid
