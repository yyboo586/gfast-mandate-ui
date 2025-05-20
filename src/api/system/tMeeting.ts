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

// 获取文件列表
export const getFileList = (meetingId: string, pageNum: number, pageSize: number) => {
  return request.get(`/api/v1/online_meeting/meetings/file_list?roomNumber=${meetingId}&pageNum=${pageNum}&pageSize=${pageSize}`);
};

// 删除文件
export const deleteMeetingFile = (fileId: string) => {
  console.log(fileId);
  return request.delete(`/api/v1/online_meeting/meetings/file_delete`, {
    params: {
      ID: fileId,
    }
  });
};

export const downloadMeetingFile = async (id: string) => {
  try {
    const response = await request.get(`/api/v1/online_meeting/meetings/file_download?id=${id}`);
    console.log(response)
    const baseUrl = import.meta.env.VITE_API_URL; // 读取环境变量
    const fileUrl = `${baseUrl}${response.data.FilePath}`

    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    // ElMessage.error('下载失败，请重试');
    console.error(error);
  }
};