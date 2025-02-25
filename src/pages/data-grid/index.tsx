import { FC, useEffect, useRef, useState } from "react";
import { I_filter, I_row } from "../../types";
import Apis from "../../apis";
import AppContext from "./context";
import Table from "./table";
import Toolbar from "./toolbar";
import './index.css';
import useModal from "./use-modal";
import { useSearchParams } from "react-router-dom";

const DataGrid: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState<I_row[]>([])
    const [filter, setFilter] = useState<I_filter>({
        fromDate: searchParams.get('fromDate') || '',
        toDate: searchParams.get('toDate') || '',
        search: searchParams.get('search') || ''
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
        setSearchParams(newFilter)
    }

    useEffect(() => {
        fetchData({
            fromDate: '',
            toDate: '',
            search: ''
        })
    }, [])
    useEffect(() => {
        fetchData({
            fromDate: searchParams.get("fromDate") || "",
            toDate: searchParams.get("toDate") || "",
            search: searchParams.get("search") || "",
        });
    }, [searchParams]);
    const modal = useModal()
    return (
        <AppContext.Provider value={{ filter, changeFilter, data, modal }}>
            <div className="bg-d-20- fullscreen- flex-row- of-hidden- p-12- gap-12-">
                <Toolbar />
                <Table />
                {modal.render()}
            </div>
        </AppContext.Provider>
    )
}
export default DataGrid