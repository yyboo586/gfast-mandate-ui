<template>
  <el-drawer
    v-model="dialogVisible"
    :title="title"
    :width="dialogWidth"
    @close="handleClose"
    direction="ltr"
    size="80%" 
  >
    <el-table :data="fileList" border style="width: 100%">
      <el-table-column label="文件名" prop="FileName" align="center" />
      <el-table-column label="文件上传者" prop="UploaderName" align="center" />
      <el-table-column label="文件大小" align="center">
        <template #default="scope">
            {{ parseFileSize(scope.row.FileSize) }}
        </template>
      </el-table-column>  
      <el-table-column label="上传时间" prop="UploadTime" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template #default="scope">
          <el-button
            type="primary"
            link
            @click="downloadFile(scope.row.ID)"
          >下载</el-button>
          <el-button
            type="danger"
            link
            @click="deleteFile(scope.row.ID)"
          >删除</el-button>
          <!-- {{ scope.row }} -->
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex; justify-content: center; margin: 16px 0;">
      <el-pagination
        v-model:current-page="pageNum"
        v-model:page-size="pageSize"
        :total="total"
        layout="prev, pager, next, jumper"
        @size-change="fetchFileList"
        @current-change="fetchFileList"
      />
    </div>
    <!-- 底部按钮区域需要调整，使用 drawer 的 footer 插槽 -->
    <!-- <template #footer>
      <div class="drawer-footer">
        <el-button @click="handleClose">关闭</el-button>
      </div>
    </template> -->
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { getFileList, deleteMeetingFile, downloadMeetingFile } from '/@/api/system/tMeeting';

const dialogVisible = ref(false);
const fileList = ref([]);
const meetingId = ref<string | null>(null);
const title = ref('文件列表');
const pageNum = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);

const dialogWidth = ref('700px');

// 设置对话框宽度为屏幕的70%
const setDialogWidth = () => {
  const screenWidth = window.innerWidth;
  // 根据常见编辑界面宽度比例调整，一般略小于主内容区域
  dialogWidth.value = `${screenWidth * 0.6}px`; 
};

// 监听窗口变化，自动调整宽度
window.addEventListener('resize', setDialogWidth);


const parseFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 打开弹窗并加载数据
const openDialog = async (roomNumber: any) => {
//   console.log('roomNumber', roomNumber);
  meetingId.value = roomNumber;
  title.value = `文件列表`;
  dialogVisible.value = true;
  setDialogWidth();

  fetchFileList();
};

// 获取文件列表
const fetchFileList = () => {
  if (!meetingId.value) return;
    // console.log('meetingId.value', meetingId.value);
    getFileList(meetingId.value, pageNum.value, pageSize.value).then((res: any) => {
      fileList.value = res.data.List || [];
      total.value = res.data.Total || 0;
  }).catch((err: any) => {
    ElMessage.error('获取文件列表失败');
    console.error(err);
  });
};

// 下载文件
const downloadFile = (id: string) => {
  downloadMeetingFile(id)
};

// 删除文件
const deleteFile = async (id: any): Promise<void> => {
  console.log('id1', id);
  try {
    await ElMessageBox.confirm('确认删除该文件？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });
    console.log('id2', id);
    await deleteMeetingFile(id); // 使用别名避免冲突
    ElMessage.success('删除成功');
    fetchFileList(); // 刷新列表
  } catch (err: any) {
    ElMessage.error('删除失败');
    console.error(err);
    throw err;
  }
};

// 将 API 调用函数重命名为 deleteApiFile 避免命名冲突
const deleteApiFile = (id: any) => {
  return deleteMeetingFile(id); // 实际调用的是 API 方法
};

// 关闭弹窗时重置数据
const handleClose = () => {
  dialogVisible.value = false;
  fileList.value = [];
  meetingId.value = null;
};

// 时间格式化方法（可封装到工具函数中）
const parseTime = (time: string | Date) => {
  const date = new Date(time);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

const pad = (n: number) => n.toString().padStart(2, '0');

defineExpose({ openDialog });
</script>

<style scoped>
.dialog-footer {
  text-align: right;
  margin-top: 0px; /* 增加顶部间距 */
}
</style>