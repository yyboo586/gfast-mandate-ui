<template>
  <!-- 会议管理详情抽屉 -->  
  <div class="system-tMeeting-detail">
    <el-drawer v-model="isShowDialog" size="80%" direction="ltr">
      <template #header>
        <h4>会议详情</h4>
      </template>
      <el-descriptions
              class="margin-top"
              :column="2"
              border
              style="margin: 8px;"
      >
        <el-descriptions-item :span="1">            
            <template #label>
              <div class="cell-item">
                会议ID
              </div>
            </template>
            {{ currentRow?.RoomNumber }}            
        </el-descriptions-item> 
        <el-descriptions-item :span="2">            
            <template #label>
              <div class="cell-item">
                会议主题
              </div>
            </template>
            {{ currentRow?.Topic }}            
        </el-descriptions-item>       
        <el-descriptions-item :span="1">            
            <template #label>
              <div class="cell-item">
                会议管理员
              </div>
            </template>
            {{ currentRow?.CreatorInfo?.UserName }}            
        </el-descriptions-item> 
        <el-descriptions-item :span="2">            
            <template #label>
              <div class="cell-item">
                会议主持人
              </div>
            </template>
            {{ currentRow?.ModeratorInfo?.UserName }}            
        </el-descriptions-item>             
        <el-descriptions-item :span="1">            
            <template #label>
              <div class="cell-item">
                会议模式
              </div>
            </template>
            {{ currentRow?.Mode }}            
        </el-descriptions-item> 
        <el-descriptions-item :span="2">            
            <template #label>
              <div class="cell-item">
                漫游距离
              </div>
            </template>
            {{ currentRow?.Distance }}            
        </el-descriptions-item>
        <el-descriptions-item :span="1">            
            <template #label>
              <div class="cell-item">
                会议类型
              </div>
            </template>
            {{ currentRow?.Type }}            
        </el-descriptions-item>  
        <el-descriptions-item :span="2">            
            <template #label>
              <div class="cell-item">
                会议状态
              </div>
            </template>
            {{ currentRow?.Status }}            
        </el-descriptions-item>     
        <el-descriptions-item :span="1">            
            <template #label>
              <div class="cell-item">
                会议地点
              </div>
            </template>
            {{ currentRow?.Location }}            
        </el-descriptions-item>
        <el-descriptions-item :span="2">            
            <template #label>
              <div class="cell-item">
                会议创建时间
              </div>
            </template>
            {{ currentRow?.CreateTime }}            
        </el-descriptions-item>   
        <el-descriptions-item :span="1">            
            <template #label>
              <div class="cell-item">
                会议开始时间
              </div>
            </template>
            {{ currentRow?.StartTime }}            
        </el-descriptions-item>   
        <el-descriptions-item :span="2">            
            <template #label>
              <div class="cell-item">
                会议结束时间
              </div>
            </template>
            {{ currentRow?.EndTime }}            
        </el-descriptions-item>
        <el-descriptions-item :span="2">
          <template #label><div class="cell-item">描述</div></template>
          <div class="long-text">{{ currentRow?.Description }}</div>
        </el-descriptions-item>                          
        <el-descriptions-item :span="2">
  <template #label>
    <div class="cell-item">参会人员</div>
  </template>
  <!-- <el-col :span="24">
  <el-form-item label="参会人员">
    <div class="user-list">
      <el-tag v-for="user in formData.MemberInfos" :key="user.UserID" style="margin-right: 8px; margin-bottom: 4px;">
        {{ user.UserName }}
      </el-tag>
    </div>
  </el-form-item>
</el-col> -->
  <div class="user-list">
    <el-tag v-for="user in currentRow?.MemberInfos" :key="user.UserID" style="margin: 4px;">
      {{ user.UserName }}
    </el-tag>
  </div>
</el-descriptions-item>   
      </el-descriptions>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
  import { reactive, toRefs, defineComponent,ref,unref,getCurrentInstance,computed } from 'vue';
  import {ElMessageBox, ElMessage, FormInstance,UploadProps} from 'element-plus';  
  import {
    listTMeeting,
    getTMeeting,
    delTMeeting,
    addTMeeting,
    updateTMeeting,    
  } from "/@/api/system/tMeeting";  
  import {
    TMeetingTableColumns,
    TMeetingInfoData,
    TMeetingTableDataState,
    TMeetingEditState
  } from "/@/views/system/tMeeting/list/component/model"
  defineOptions({ name: "ApiV1SystemTMeetingDetail"})  
  // 声明一个 ref 来保存 row
  const currentRow = ref<TMeetingInfoData | null>(null);
  const {proxy} = <any>getCurrentInstance()
  const formRef = ref<HTMLElement | null>(null);
  const menuRef = ref();  
  const state = reactive<TMeetingEditState>({
    loading:false,
    isShowDialog: false,
    formData: {      
      id: undefined,      
      roomNumber: undefined,      
      topic: undefined,      
      mode: undefined,      
      distance: undefined,      
      type: undefined,      
      status: undefined ,      
      location: undefined,      
      creatorId: undefined,      
      description: undefined,      
      createTime: undefined,      
      startTime: undefined,      
      endTime: undefined,      
    },
    // 表单校验
    rules: {      
      id : [
          { required: true, message: "ID不能为空", trigger: "blur" }
      ],      
      roomNumber : [
          { required: true, message: "ID不能为空", trigger: "blur" }
      ],      
      topic : [
          { required: true, message: "不能为空", trigger: "blur" }
      ],      
      mode : [
          { required: true, message: "不能为空", trigger: "blur" }
      ],      
      distance : [
          { required: true, message: "不能为空", trigger: "blur" }
      ],      
      type : [
          { required: true, message: "不能为空", trigger: "blur" }
      ],      
      status : [
          { required: true, message: "不能为空", trigger: "blur" }
      ],      
      location : [
          { required: true, message: "不能为空", trigger: "blur" }
      ],      
      creatorId : [
          { required: true, message: "ID不能为空", trigger: "blur" }
      ],      
      description : [
          { required: true, message: "不能为空", trigger: "blur" }
      ],      
      createTime : [
          { required: true, message: "不能为空", trigger: "blur" }
      ],      
      startTime : [
          { required: true, message: "不能为空", trigger: "blur" }
      ],      
    }
  });
  const { isShowDialog,formData } = toRefs(state);
  // 打开弹窗
  const openDialog = (row?: TMeetingInfoData) => {
    // resetForm();
    // console.log(row)
    if(row) {
      currentRow.value = row;
    }
    state.isShowDialog = true;
  };
  // 关闭弹窗
  const closeDialog = () => {
    state.isShowDialog = false;
  };
  defineExpose({
    openDialog,
  });
  // 取消
  const onCancel = () => {
    closeDialog();
  };
  const resetForm = ()=>{
    state.formData = {      
      id: undefined,      
      roomNumber: undefined,      
      topic: undefined,      
      mode: undefined,      
      distance: undefined,      
      type: undefined,      
      status: false ,      
      location: undefined,      
      creatorId: undefined,      
      description: undefined,      
      createTime: undefined,      
      startTime: undefined,      
      endTime: undefined,      
    }
  };  
</script>
<style scoped>  
  .system-tMeeting-detail :deep(.el-form-item--large .el-form-item__label){
    font-weight: bolder;
  }
  .pic-block{
    margin-right: 8px;
  }
  .file-block{
    width: 100%;
    border: 1px solid var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    margin-bottom: 5px;
    padding: 3px 6px;
  }
  .ml-2{margin-right: 5px;}
</style>

