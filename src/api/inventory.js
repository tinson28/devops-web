import request from '@/utils/request'

export function list() {
  return request({
    url: 'api/inventory/',
    method: 'get'
  })
}

export function get_inventory_hosts(id){
  return request({
    url: 'api/inventory/'+id+'/get_inventory_hosts/',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'api/inventory/',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/inventory/' + id + '/',
    method: 'delete'
  })
}

export function retrieve(id) {
  return request({
    url: 'api/inventory/' + id + '/',
    method: 'get'
  })
}

export function edit(id, data) {
  return request({
    url: 'api/inventory/' + id + '/',
    method: 'put',
    data
  })
}

export function save(id, data) {
  return request({
    url: 'api/inventory/' + id + '/',
    method: 'patch',
    data
  })
}

