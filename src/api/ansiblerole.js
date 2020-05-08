import request from '@/utils/request'

export function list() {
  return request({
    url: 'api/ansiblerole/',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'api/ansiblerole/',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/ansiblerole/' + id + '/',
    method: 'delete'
  })
}

export function retrieve(id) {
  return request({
    url: 'api/ansiblerole/' + id + '/',
    method: 'get'
  })
}

export function edit(id, data) {
  return request({
    url: 'api/ansiblerole/' + id + '/',
    method: 'put',
    data
  })
}

export function save(id, data) {
  return request({
    url: 'api/ansiblerole/' + id + '/',
    method: 'patch',
    data
  })
}

