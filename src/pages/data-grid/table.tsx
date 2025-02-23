import { FC, useContext } from "react"
import AppContext from "./context"
import { AITable } from "aio-input"
import AIODate from "aio-date"

const Table: FC = () => {
    const { data } = useContext(AppContext)
    return (
        <AITable
            className="h-100- w-100- flex-1- br-12- of-hidden-"
            columns={[
                { 
                    title: 'عنوان', 
                    value: 'row.title',
                    minWidth:200,
                },
                { 
                    title: 'منبع', 
                    value: 'row.news_agency_name',
                    justify:true,
                    minWidth:200,
                },
                { 
                    title: 'لید', 
                    value: 'row.lead',
                    justify:true,
                    template:({row})=><CellText text={row.lead}/>,
                    minWidth:200,
                },
                { 
                    title: 'محتوا', 
                    value: 'row.content',
                    justify:true,
                    template:({row})=><CellText text={row.content}/>,
                    minWidth:200,
                },
                { 
                    title: 'تاریخ', 
                    value: 'row.published_at',
                    justify:true,
                    template:({row})=>{
                        const DATE = new AIODate();
                        const date = row.published_at;
                        const jalaliDate = DATE.toJalali(date);
                        return new AIODate().getDateByPattern(jalaliDate,'{weekDay} {day} {monthString} {year}')
                    },
                    minWidth:200,
                },
            ]}
            value={data}
        />
    )
}
export default Table

const CellText:FC<{text:string}> = ({text})=>{
    if(!text){return null}
    return (
        <div className="h-60- ofy-auto- m-12- brd-c-13- br-6- p-6-">
            {text}
        </div>
    )
}