import request from '@/utils/request'

export function uploadFile(data){
    return request({
        url: 'api/sftp/upload/',
        method: 'POST',
        data: data
    })
}

export function downloadFile(sid,file){
    return request({
        url: 'api/sftp/download/?download_file='+file+'&sid='+sid,
        method: 'GET'
        // data: data
    })
}
