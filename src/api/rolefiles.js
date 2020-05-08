import request from '@/utils/request'

export function getTreeData(id) {
  return request({
    url: 'api/ansiblerole/filelist/?role='+id,
    method: 'get'
  })
}

export function list() {
  return request({
    url: 'api/rolefiles/',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'api/rolefiles/',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/rolefiles/' + id + '/',
    method: 'delete'
  })
}

export function retrieve(id) {
  return request({
    url: 'api/rolefiles/' + id + '/',
    method: 'get'
  })
}

export function edit(id, data) {
  return request({
    url: 'api/rolefiles/' + id + '/',
    method: 'put',
    data
  })
}

export function save(id, data) {
  return request({
    url: 'api/rolefiles/' + id + '/',
    method: 'patch',
    data
  })
}

export function getFileContent(id){
  return request({
    url: 'api/rolefilecontent/'+id+'/',
    method: 'get'
  })
}

export function saveFileContent(id, data) {
  return request({
    url: 'api/rolefilecontent/'+id+'/',
    method: 'put',
    data
  })
}


