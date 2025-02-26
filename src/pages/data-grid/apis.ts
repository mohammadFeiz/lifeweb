import AIOApis from "aio-apis";
import { I_filter, I_row } from "../../types";
import mockData from '../../mock-data';
import { filterResult } from "./utils";

export default class Apis extends AIOApis {
    constructor() {
        super({
            id: 'test',
            lang:'fa',
            handleErrorMessage: (error) => {
                return error.response.data.message.error
            },
            token: ''
        })
    }
    mock = (filter: I_filter) => {
        const allData: I_row[] = mockData
        const random = Math.random()
        console.log(random)
        if (random > 0.4) {
            return {
                status: 200,
                data: filterResult(allData,filter)
            }
        }
        else {
            return {
                status: 400,
                data: {
                    message: {
                        error: 'خطایی پیش آمده'
                    }
                }
            }
        }
    }
    getData = async (filter: I_filter) => {
        const { response, success } = await this.request<{ data: I_row[] }>({
            name: 'getData',
            description: 'دریافت اطلاعات',
            method: 'post',
            url: 'http://my-api.ir/getData',
            mockDelay: 3000,
            mock: () => this.mock(filter)
        })
        if (success) {
            return response.data
        }
        else {
            return false
        }
    }
}