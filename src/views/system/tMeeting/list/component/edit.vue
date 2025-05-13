<template>
  <div class="system-tMeeting-edit">
    <el-drawer v-model="isShowDialog" size="80%" direction="ltr">
      <template #header>
        <h4>编辑会议</h4>
      </template>

      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px" style="margin: 16px;">
        <!-- 会议ID -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="会议ID" prop="roomNumber">
              <el-input v-model="formData.roomNumber" readonly style="pointer-events: none; background-color: #f5f7fa;" />
            </el-form-item>
          </el-col>

          <!-- 会议主题 -->
          <el-col :span="12">
            <el-form-item label="会议主题" prop="topic">
              <el-input v-model="formData.topic" placeholder="请输入会议主题" />
            </el-form-item>
          </el-col>

          <!-- 会议模式 -->
          <el-col :span="12">
            <el-form-item label="会议模式" prop="mode">
              <el-select v-model="formData.mode" placeholder="请选择会议模式" style="width: 100%">
                <el-option label="会议室模式" value="会议室模式" />
                <el-option label="虚拟人模式" value="虚拟人模式" />
                <el-option label="漫游模式" value="漫游模式" />
              </el-select>
            </el-form-item>
          </el-col>

          <!-- 漫游距离 -->
          <el-col :span="12">
            <el-form-item label="漫游距离" prop="distance">
              <el-input v-model.number="formData.distance" placeholder="单位：米" type="number" />
            </el-form-item>
          </el-col>

          <!-- 会议类型 -->
          <el-col :span="12">
            <el-form-item label="会议类型" prop="type">
              <el-select v-model="formData.type" placeholder="请选择会议类型" style="width: 100%">
                <el-option label="即时会议" value="即时会议" />
                <el-option label="预约会议" value="预约会议" />
              </el-select>
            </el-form-item>
          </el-col>

          <!-- 会议地点 -->
          <el-col :span="12">
            <el-form-item label="会议地点" prop="location">
              <el-input v-model="formData.location" placeholder="请输入会议地点" />
            </el-form-item>
          </el-col>

          <!-- 创建时间 -->
          <el-col :span="12">
            <el-form-item label="创建时间" prop="createTime">
              <el-date-picker
                v-model="formData.createTime"
                type="datetime"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="选择创建时间"
                style="width: 100%"
                disabled
              />
            </el-form-item>
          </el-col>

          <!-- 开始时间 -->
          <el-col :span="12">
            <el-form-item label="开始时间" prop="startTime">
              <el-date-picker
                v-model="formData.startTime"
                type="datetime"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="选择开始时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>

          <!-- 结束时间 -->
          <el-col :span="12">
            <el-form-item label="结束时间" prop="endTime">
              <el-date-picker
                v-model="formData.endTime"
                type="datetime"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="选择结束时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>

          <!-- 描述 -->
          <el-col :span="24">
            <el-form-item label="会议描述" prop="description">
              <el-input v-model="formData.description" type="textarea" :rows="3" placeholder="请输入会议描述" />
            </el-form-item>
          </el-col>

          <!-- 参会人员（可选） -->
          <!-- <el-col :span="24">
            <el-form-item label="参会人员">
              <div class="user-list">
                <el-tag v-for="user in formData.MemberInfos" :key="user.UserID" style="margin-right: 8px; margin-bottom: 4px;">
                  {{ user.UserName }}
                </el-tag>
              </div>
            </el-form-item>
          </el-col> -->

          <!-- 提交按钮 -->
          <el-col :span="24" style="text-align: right;">
            <el-button @click="closeDialog">取消</el-button>
            <el-button type="primary" @click="submitForm">保存</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineExpose, toRefs } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

import {
  TMeetingEditState,
  TMeetingInfoData
} from '/@/views/system/tMeeting/list/component/model';

import {
  getTMeeting,
  updateTMeeting
} from '/@/api/system/tMeeting';
import { start } from 'nprogress';
import { describe } from 'node:test';
const emits = defineEmits(['oncloseDialog']);
// 当前表单引用
const formRef = ref();
// 编辑状态管理
const state = reactive<TMeetingEditState>({
  loading: false,
  isShowDialog: false,
  formData: {
    id: undefined,
    roomNumber: undefined,
    topic: undefined,
    mode: undefined,
    distance: undefined,
    type: undefined,
    status: undefined,
    location: undefined,
    creatorId: undefined,
    description: undefined,
    createTime: undefined,
    startTime: undefined,
    endTime: undefined,
  },
  rules: {
    roomNumber: [
      { required: true, message: "ID不能为空", trigger: "blur" }
    ],
    topic: [
      { required: true, message: "会议主题不能为空", trigger: "blur" }
    ],
    mode: [
      { required: true, message: "会议模式不能为空", trigger: "change" }
    ],
    distance: [
      { required: true, message: "漫游距离不能为空", trigger: "blur" },
      { type: 'number', message: "必须为数字", trigger: "blur" }
    ],
    type: [
      { required: true, message: "会议类型不能为空", trigger: "change" }
    ],
    location: [
      { required: true, message: "会议地点不能为空", trigger: "blur" }
    ],
    description: [
      { max: 500, message: "最多输入500个字符", trigger: "blur" }
    ]
  }
});

const { isShowDialog, formData, loading, rules } = toRefs(state);

// 打开对话框并加载数据
const openDialog = async (row?: TMeetingInfoData) => {
  // console.log("row", row);
  if (row && row.RoomNumber) {
    Object.assign(formData.value,row)
    // const res = await getTMeeting(row.RoomNumber);
    // if (res.data) {
      // 填充表单数据
      Object.assign(formData.value, {
        id: row.id,
        roomNumber: row.RoomNumber,
        topic: row.Topic,
        mode: row.Mode,
        distance: row.Distance,
        type: row.Type,
        status: row.Status,
        location: row.Location,
        creatorId: row.CreatorId,
        description: row.Description,
        createTime: row.CreateTime,
        startTime: row.StartTime,
        endTime: row.EndTime,
        // MemberInfos: res.data.MemberInfos || []
      });
    // }
  } else {
    // 新增情况，清空表单
    resetForm();
  }
  isShowDialog.value = true;
};

// 关闭对话框
const closeDialog = () => {
  isShowDialog.value = false;
  emits("oncloseDialog")
  resetForm();
};

// 重置表单
const resetForm = () => {
  formData.value = {
    id: undefined,
    roomNumber: '',
    topic: '',
    mode: '',
    distance: '',
    type: '',
    status: false,
    location: '',
    creatorId: undefined,
    description: '',
    createTime: '',
    startTime: '',
    endTime: '',
    MemberInfos: []
  };
};

// 提交表单
const submitForm = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        loading.value = true;
        const payload = {
          roomNumber: formData.value.roomNumber,
          topic: formData.value.topic,
          type: formData.value.type,
          mode: formData.value.mode,
          distance: formData.value.distance,
          location: formData.value.location,
          startTime: formData.value.startTime,
          endTime: formData.value.endTime,
          description: formData.value.description,
        };
        await updateTMeeting(payload); // 调用接口更新
        ElMessage.success('保存成功');
        closeDialog();
      } catch (err) {
        ElMessage.error('保存失败，请检查输入内容');
        // console.error(err);
      } finally {
        loading.value = false;
      }
    } else {
      ElMessage.warning("请填写必填项");
      return false;
    }
  });
};

// 对外暴露方法
defineExpose({
  openDialog
});
</script>

<style scoped>
.system-tMeeting-edit .user-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.system-tMeeting-edit .cell-item {
  font-weight: bold;
}
</style>