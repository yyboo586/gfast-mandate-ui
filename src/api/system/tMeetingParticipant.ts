import request from '/@/utils/request'
// 查询参会人员管理列表
export function listTMeetingParticipant(query:object) {
  return request({
    url: '/api/v1/system/tMeetingParticipant/list',
    method: 'get',
    params: query
  })
}
// 查询参会人员管理详细
export function getTMeetingParticipant(id:number) {
  return request({
    url: '/api/v1/system/tMeetingParticipant/get',
    method: 'get',
    params: {
      id: id.toString()
    }
  })
}
// 新增参会人员管理
export function addTMeetingParticipant(data:object) {
  return request({
    url: '/api/v1/system/tMeetingParticipant/add',
    method: 'post',
    data: data
  })
}
// 修改参会人员管理
export function updateTMeetingParticipant(data:object) {
  return request({
    url: '/api/v1/system/tMeetingParticipant/edit',
    method: 'put',
    data: data
  })
}
// 删除参会人员管理
export function delTMeetingParticipant(ids:number[]) {
  return request({
    url: '/api/v1/system/tMeetingParticipant/delete',
    method: 'delete',
    data:{
      ids:ids
    }
  })
}
