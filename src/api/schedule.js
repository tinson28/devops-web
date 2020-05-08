import request from '@/utils/request'

export function addCrontab(data) {
  return request({
    url: 'api/crontab_schedule/',
    method: 'post',
    data
  })
}

export function addInterval(data) {
    return request({
      url: 'api/interval_schedule/',
      method: 'post',
      data
    })
}

export function addTask(data) {
  return request({
    url: 'api/periodic_task/',
    method: 'post',
    data
  })
}

export function delCrontab(id) {
  return request({
    url: 'api/crontab_schedule/' + id + '/',
    method: 'delete'
  })
}

export function delInterval(id) {
  return request({
    url: 'api/interval_schedule/' + id + '/',
    method: 'delete'
  })
}

export function delTask(id) {
  return request({
    url: 'api/periodic_task/' + id + '/',
    method: 'delete'
  })
}

export function retrieveCrontab(id) {
  return request({
    url: 'api/crontab_schedule/' + id + '/',
    method: 'get'
  })
}

export function retrieveInterval(id) {
  return request({
    url: 'api/interval_schedule/' + id + '/',
    method: 'get'
  })
}

export function retrieveTask(id) {
  return request({
    url: 'api/periodic_task/' + id + '/',
    method: 'get'
  })
}

export function editCrontab(id, data) {
  return request({
    url: 'api/crontab_schedule/' + id + '/',
    method: 'put',
    data
  })
}

export function editInterval(id, data) {
    return request({
      url: 'api/interval_schedule/' + id + '/',
      method: 'put',
      data
    })
  }

  export function editTask(id, data) {
    return request({
      url: 'api/periodic_task/' + id + '/',
      method: 'put',
      data
    })
  }

export function saveCrontab(id, data) {
  return request({
    url: 'api/crontab_schedule/' + id + '/',
    method: 'patch',
    data
  })
}

export function getScheduleList(type) {
  if (type=='crontab') {
    return request({
      url: 'api/crontab_schedule/',
      method: 'get'
    })
  } else {
    return request({
      url: 'api/interval_schedule/',
      method: 'get'
    })
  }
}

export function getCeleryInfo(type){
  return request({
    url: 'api/plan/celery_info/?type='+type,
    method: 'get'
  })
}
