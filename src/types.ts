import { ReactNode } from "react"

export type I_row = {
    title: string,
    id: string,
    lead?: string,
    published_at: string,
    content: string,
    news_agency_name: string,
    url: string,
    lf_lang?:'fa',
    main_images?:string[],
    categories?:string[],
    tags?:string[],
    news_agency_id?:string
}
export type I_filter = {
    fromDate:string,
    toDate:string,
    search:string
}
export type I_modal = {
    text:string,
    changeText:(text:string)=>void,
    render:()=>ReactNode
}