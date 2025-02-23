import { AIDate, AIFormInput, AIText } from "aio-input"
import { FC, useContext } from "react"
import AppContext from "./context"

const Toolbar: FC = () => {
    const { filter, changeFilter } = useContext(AppContext)
    return (
        <div className="flex-col- gap-12- w-240-">
            <AIFormInput
                label='جستجو'
                required={false}
                input={
                    <AIText
                        value={filter.search}
                        onChange={(search) => {
                            changeFilter({ ...filter, search })
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
                        value={filter.fromDate}
                        onChange={(fromDate) => {
                            changeFilter({ ...filter, fromDate })
                        }}
                    />
                }
            />
            <AIFormInput
                label='تا تاریخ'
                required={false}
                input={
                    <AIDate
                        jalali={true}
                        value={filter.toDate}
                        onChange={(toDate) => {
                            changeFilter({ ...filter, toDate })
                        }}
                    />
                }
            />
        </div>
    )
}
export default Toolbar