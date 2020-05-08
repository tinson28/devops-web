import request from '@/utils/request'

export function getCloudConfigs() {
  return request({
    url: 'api/cloudconfig/',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'api/cloudconfig/',
    method: 'post',
    data
  })
}

export function retrieve(id) {
  return request({
    url: 'api/cloudconfig/' + id + '/',
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'api/cloudconfig/' + id + '/',
    method: 'delete'
  })
}

export function edit(id, data) {
  return request({
    url: 'api/cloudconfig/' + id + '/',
    method: 'put',
    data
  })
}

export function PullExcu(data) {
  return request({
    url: 'api/pull/excu/',
    method: 'post',
    data
  })
}
