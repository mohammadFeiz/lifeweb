import { AIDate, AIFormInput, AIText } from "aio-input"
import { FC, useContext, useEffect, useState } from "react"
import AppContext from "./context"
import { I_filter } from "./types"
import { getDateAttrs } from "./utils"

const Toolbar: FC<{mobile?:boolean}> = ({mobile}) => {
    const context = useContext(AppContext)
    const [filter,setFilter] = useState<I_filter>(context.filter)
    useEffect(()=>{
        setFilter(context.filter)
    },[context.filter])
    return (
        <div className={`flex-col- gap-12- w-264- ${mobile?'hide-md- hide-lg-':'hide-xs- hide-sm-'}`}>
            <AIFormInput
                label='جستجو'
                required={false}
                input={
                    <AIText
                        value={filter.search}
                        placeholder='عبارت جستجو را وارد کنید...'
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
            <button className='h-36- br-6- brd-none- button-1 m-12-'
                onClick={()=>context.changeFilter({...filter})}
            >اعمال فیلتر</button>
        </div>
    )
}

export default Toolbar