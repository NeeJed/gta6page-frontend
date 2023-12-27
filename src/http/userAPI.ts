import {$host} from './index'

export const createNewRecord = async (record: any) => {
    const {data} = await $host.post('/api', record)
    return data
}