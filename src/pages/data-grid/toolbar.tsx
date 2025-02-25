import { AIDate, AIFormInput, AIText } from "aio-input"
import { FC, useContext, useEffect, useState } from "react"
import AppContext from "./context"
import { I_filter } from "../../types"
import AIODate from "aio-date"
import { getDateAttrs } from "./utils"

const Toolbar: FC = () => {
    const context = useContext(AppContext)
    const [filter,setFilter] = useState<I_filter>(context.filter)
    useEffect(()=>{
        setFilter(context.filter)
    },[context.filter])
    return (
        <div className="flex-col- gap-12- w-240-">
            <AIFormInput
                label='جستجو'
                required={false}
                input={
                    <AIText
                        value={filter.search}
                        onChange={(search) => {
                            setFilter({ ...filter, search })
                        }}
                    />
                }
            />
            <AIFormInput
                label='از تاریخ'
                required={false}
                input={
                    <AIDate
                        jalali={true}
                        calendarMode={true}
                        value={filter.fromDate}
                        onChange={(fromDate) => {
                            setFilter({ ...filter, fromDate })
                        }}
                        dateAttrs={({dateArray})=>getDateAttrs(dateArray,filter)}
                    />
                }
            />
            <AIFormInput
                label='تا تاریخ'
                required={false}
                input={
                    <AIDate
                        jalali={true}
                        calendarMode={true}
                        value={filter.toDate}
                        onChange={(toDate) => {
                            setFilter({ ...filter, toDate })
                        }}
                        dateAttrs={({dateArray})=>getDateAttrs(dateArray,filter)}
                    />
                }
            />
            <button className='h-36- br-6- brd-none-'
                onClick={()=>context.changeFilter({...filter})}
            >اعمال فیلتر</button>
        </div>
    )
}
export default Toolbar