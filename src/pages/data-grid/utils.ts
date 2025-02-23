import AIODate from "aio-date"
import { I_filter, I_row } from "../../types"

function searchResult(row: I_row, filter: I_filter): boolean {
    if (!filter.search) { return true }
    if (row.title && row.title.indexOf(filter.search) !== -1) { return true }
    if (row.lead && row.lead.indexOf(filter.search) !== -1) { return true }
    if (row.content && row.content.indexOf(filter.search) !== -1) { return true }
    if (row.news_agency_name && row.news_agency_name.indexOf(filter.search) !== -1) { return true }
    return false
}
function dateResult(rowDate: string, fromDate: string, toDate: string) {
    if (!rowDate) { return true }
    const DATE = new AIODate();
    const rowDateJalali = DATE.toJalali(rowDate)
    if (fromDate) {
        const res = DATE.compaire(rowDateJalali, fromDate);
        if (res === 'less') { return false }
    }
    if (toDate) {
        const res = DATE.compaire(rowDateJalali, toDate);
        if (res === 'greater') { return false }
    }
}
export function filterResult(allData:I_row[],filter:I_filter) {
    const filteredData:I_row[] = allData.filter((row: I_row) => {
        if(!dateResult(row.published_at,filter.fromDate,filter.toDate)){
            return false
        }
        if (!searchResult(row, filter)) { 
            return false 
        }
        return true
    })
    return filteredData
}