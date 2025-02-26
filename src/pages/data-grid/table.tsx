import { FC, useContext } from "react"
import AppContext from "./context"
import { AITable } from "aio-input"
import AIODate from "aio-date"
import { I_row } from "../../types"
import { getDateString } from "./utils"

const Table: FC<{ mobile?: boolean }> = ({ mobile }) => {
    const { data,openToolbarMobile } = useContext(AppContext)
    const getClassName = () => {
        return `h-100- w-100- flex-1- br-12- of-hidden- ${mobile ? 'hide-md- hide-lg-' : 'hide-xs- hide-sm-'}`
    }
    return (
        <AITable
            className={getClassName()}
            toolbar={(
                <div className='flex-row- align-v- gap-12- p-v-12-'>
                    {
                        !!mobile &&
                        <button 
                            className='bg-d-10- w-36- h-36- brd-none- fs-36- br-8- flex-row- align-vh- pointer-'
                            onClick={openToolbarMobile}
                        >
                            =
                        </button>
                    }
                    <div className="">{`${data.length} مورد`}</div>
                </div>
            )}
            headerAttrs={{
                style: {
                    display: mobile ? 'none' : undefined
                }
            }}
            rowTemplate={mobile ? ({ row }) => <Card row={row} /> : undefined}
            columns={[
                {
                    title: 'عنوان',
                    value: 'row.title',
                    minWidth: 200,
                },
                {
                    title: 'منبع',
                    value: 'row.news_agency_name',
                    justify: true,
                    minWidth: 200,
                },
                {
                    title: 'لید',
                    value: 'row.lead',
                    justify: true,
                    template: ({ row }) => <CellText text={row.lead} />,
                    minWidth: 240,
                },
                {
                    title: 'محتوا',
                    value: 'row.content',
                    justify: true,
                    template: ({ row }) => <CellText text={row.content} />,
                    minWidth: 240,
                },
                {
                    title: 'تاریخ',
                    value: 'row.published_at',
                    justify: true,
                    template: ({ row }) => getDateString(row.published_at),
                    minWidth: 200,
                },
            ]}
            value={data}
        />
    )
}
export default Table

const CellText: FC<{ text: string }> = ({ text }) => {
    if (!text) { return null }
    const {popup} = useContext(AppContext)
    return (
        <div
            className="h-60- ofy-auto- m-12- brd-c-13- br-6- p-6-"
            dangerouslySetInnerHTML={{ __html: text }}
            onClick={() => {
                popup.addModal({
                    header:{
                        title:'نمایش متن'
                    },
                    position:'center',
                    body:(
                        <div className='p-12-'>
                            {text}
                        </div>
                    )
                })
            }}
        />
    )
}

const Card: FC<{ row: I_row }> = ({ row }) => {
    return (
        <div className="flex-col- p-12- gap-12- bg-d-4- br-12- m-b-12- brd-c-13-">
            <div className="flex-row- align-v-">
                <div className="flex-1- bold- fs-16-">
                    {row.news_agency_name}
                </div>
                {
                    !!row.published_at &&
                    <div className="bg-d-10- p-6- br-6-">
                        {getDateString(row.published_at)}
                    </div>
                }
            </div>
            <div className="fs-14- bold-">
                {row.title}
            </div>
            <div className="msf">
                {row.content}
            </div>
            <div className="bg-d-5- p-6- br-6-">
                {row.lead}
            </div>

        </div>
    )
}