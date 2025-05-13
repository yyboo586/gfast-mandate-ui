import request from '/@/utils/request'
// 查询会议管理列表
export function listTMeeting(query:object) {
  return request({
    url: '/api/v1/online_meeting/meetings/listall',
    method: 'get',
    params: query
  })
}
// 查询会议管理详细
export function getTMeeting(id:number) {
  return request({
    url: '/api/v1/online_meeting/meetings/get_details',
    method: 'get',
    params: {
      RoomNumber: id.toString()
    }
  })
}
// 新增会议管理
export function addTMeeting(data:object) {
  return request({
    url: '/api/v1/system/tMeeting/add',
    method: 'post',
    data: data
  })
}
// 修改会议管理
export function updateTMeeting(data:object) {
  return request({
    url: '/api/v1/online_meeting/meetings/edit',
    method: 'put',
    data: data
  })
}
// 删除会议管理
export function delTMeeting(ids:string[]) {
  return request({
    url: '/api/v1/online_meeting/meetings/delete',
    method: 'delete',
    data:{
      RoomNumbers:ids
    }
  })
}
