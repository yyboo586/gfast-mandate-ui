<template>
  <div class="system-tMeeting-container">
    <el-card shadow="hover">
        <div class="system-tMeeting-search mb15">
            <el-form :model="tableData.param" ref="queryRef" :inline="true" label-width="100px">
            <el-row>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="会议ID" prop="id">
                    <el-input
                        v-model="tableData.param.roomNumber"
                        placeholder="请输入会议ID"
                        clearable                        
                        @keyup.enter.native="tMeetingList"
                    />                    
                  </el-form-item>
                </el-col>                
                <!-- <el-col :span="8" class="colBlock">
                  <el-form-item label="ID" prop="roomNumber">
                    <el-input
                        v-model="tableData.param.roomNumber"
                        placeholder="请输入ID"
                        clearable                        
                        @keyup.enter.native="tMeetingList"
                    />                    
                  </el-form-item>
                </el-col>                 -->
                <el-col :span="8" :class="!showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="tMeetingList"><el-icon><ele-Search /></el-icon>搜索</el-button>
                    <el-button  @click="resetQuery(queryRef)"><el-icon><ele-Refresh /></el-icon>重置</el-button>
                    <!-- <el-button type="primary" link  @click="toggleSearch">
                      {{ word }}
                      <el-icon v-show="showAll"><ele-ArrowUp/></el-icon>
                      <el-icon v-show="!showAll"><ele-ArrowDown /></el-icon>
                    </el-button> -->
                  </el-form-item>
                </el-col>                              
                <!-- <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="" prop="mode">
                    <el-input
                        v-model="tableData.param.mode"
                        placeholder="请输入"
                        clearable                        
                        @keyup.enter.native="tMeetingList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="" prop="distance">
                    <el-input
                        v-model="tableData.param.distance"
                        placeholder="请输入"
                        clearable                        
                        @keyup.enter.native="tMeetingList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="" prop="type">
                    <el-select filterable v-model="tableData.param.type" placeholder="请选择" clearable style="width:200px;">
                        <el-option label="请选择字典生成" value="" />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="" prop="status">
                    <el-select filterable v-model="tableData.param.status" placeholder="请选择" clearable style="width:200px;">
                        <el-option label="请选择字典生成" value="" />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="" prop="location">
                    <el-input
                        v-model="tableData.param.location"
                        placeholder="请输入"
                        clearable                        
                        @keyup.enter.native="tMeetingList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="ID" prop="creatorId">
                    <el-input
                        v-model="tableData.param.creatorId"
                        placeholder="请输入ID"
                        clearable                        
                        @keyup.enter.native="tMeetingList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="" prop="description">
                    <el-input
                        v-model="tableData.param.description"
                        placeholder="请输入"
                        clearable                        
                        @keyup.enter.native="tMeetingList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="" prop="createTime">
                    <el-date-picker
                        clearable  style="width: 200px"
                        v-model="tableData.param.createTime"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss"                    
                        type="datetime"
                        placeholder="选择"                    
                    ></el-date-picker>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="" prop="startTime">
                    <el-date-picker
                        clearable  style="width: 200px"
                        v-model="tableData.param.startTime"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss"                    
                        type="datetime"
                        placeholder="选择"                    
                    ></el-date-picker>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="" prop="endTime">
                    <el-date-picker
                        clearable  style="width: 200px"
                        v-model="tableData.param.endTime"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss"                    
                        type="datetime"
                        placeholder="选择"                    
                    ></el-date-picker>
                  </el-form-item>
                </el-col>            
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="tMeetingList"><el-icon><ele-Search /></el-icon>搜索</el-button>
                    <el-button  @click="resetQuery(queryRef)"><el-icon><ele-Refresh /></el-icon>重置</el-button>
                    <el-button type="primary" link  @click="toggleSearch">
                        {{ word }}
                        <el-icon v-show="showAll"><ele-ArrowUp/></el-icon>
                        <el-icon v-show="!showAll"><ele-ArrowDown /></el-icon>
                    </el-button>
                  </el-form-item>
                </el-col>             -->
              </el-row>
            </el-form>
            <!-- <el-row :gutter="10" class="mb8">
              <el-col :span="1.5">
                <el-button
                  type="primary"
                  @click="handleAdd"
                  v-auth="'api/v1/system/tMeeting/add'"
                ><el-icon><ele-Plus /></el-icon>新增</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="success"
                  :disabled="single"
                  @click="handleUpdate(null)"
                  v-auth="'api/v1/system/tMeeting/edit'"
                ><el-icon><ele-Edit /></el-icon>修改</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="danger"
                  :disabled="multiple"
                  @click="handleDelete(null)"
                  v-auth="'api/v1/system/tMeeting/delete'"
                ><el-icon><ele-Delete /></el-icon>删除</el-button>
              </el-col>            
            </el-row> -->
        </div>
        <el-table v-loading="loading" :data="tableData.data" @selection-change="handleSelectionChange">
          <!-- <el-table-column type="selection" width="55" align="center" />                 -->
          <el-table-column label="会议室ID" align="center" prop="RoomNumber"
            min-width="150px"            
             />          
          <el-table-column label="会议主题" align="center" prop="Topic"
            min-width="150px"            
             />          
          <el-table-column label="创建者" align="center" prop="CreatorInfo.UserName"
            min-width="150px"            
             />   
          <el-table-column label="会议地点" align="center" prop="Location"
            min-width="150px"            
             />     
          <el-table-column label="会议状态" align="center" prop="Status"
            min-width="150px"            
             />                
          <el-table-column label="会议模式" align="center" prop="Mode"
            min-width="150px"            
             />          
          <el-table-column label="漫游距离" align="center" prop="Distance"
            min-width="150px"            
             />          
          <!-- <el-table-column label="会议类型" align="center" prop="Type"
            min-width="150px"            
             />           -->
       
         

          <el-table-column label="会议描述" align="center" prop="Description"
            min-width="150px"            
             />          
          <!-- <el-table-column label="创建时间" align="center" prop="CreateTime"
            min-width="150px"            
            >
            <template #default="scope">
                <span>{{ proxy.parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
            </template>
          </el-table-column>          
          <el-table-column label="开始时间" align="center" prop="StartTime"
            min-width="150px"            
            >
            <template #default="scope">
                <span>{{ proxy.parseTime(scope.row.startTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
            </template>
          </el-table-column>          
          <el-table-column label="结束时间" align="center" prop="EndTime"
            min-width="150px"            
            >
            <template #default="scope">
                <span>{{ proxy.parseTime(scope.row.endTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
            </template>
          </el-table-column>         -->
          <el-table-column label="操作" align="center" class-name="small-padding" min-width="220px" fixed="right">
            <template #default="scope">            
              <el-button
                type="primary"
                link
                @click="handleView(scope.row)"
                v-auth="'api/v1/system/online_meeting/meeting/get'"
              ><el-icon><ele-View /></el-icon>详情</el-button>              
              <el-button
                type="primary"
                link
                @click="handleUpdate(scope.row)"
                v-auth="'api/v1/system/online_meeting/meeting/edit'"
              ><el-icon><ele-EditPen /></el-icon>修改</el-button>
              <el-button
                type="primary"
                link
                @click="handleDelete(scope.row)"
                v-auth="'api/v1/system/online_meeting/meeting'"
              ><el-icon><ele-DeleteFilled /></el-icon>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
            v-show="tableData.total>0"
            :total="tableData.total"
            v-model:page="tableData.param.pageNum"
            v-model:limit="tableData.param.pageSize"
            @pagination="tMeetingList"
        />
    </el-card>
    <ApiV1SystemTMeetingEdit
       ref="editRef"       
       @onclose-dialog="()=>{
      initTableData();
    }"
    ></ApiV1SystemTMeetingEdit>
    <ApiV1SystemTMeetingDetail
      ref="detailRef"      
    ></ApiV1SystemTMeetingDetail>   
    <!-- <ApiV1SystemTMeetingEdit 
    @onclose-dialog="()=>{
      initTableData();
    }"
      ref="editRef"
    ></ApiV1SystemTMeetingEdit>  -->
  </div>
</template>
<script setup lang="ts">
import {ItemOptions} from "/@/api/items";
import {toRefs, reactive, onMounted, ref, defineComponent, computed,getCurrentInstance,toRaw} from 'vue';
import {ElMessageBox, ElMessage, FormInstance} from 'element-plus';
import {
    listTMeeting,
    getTMeeting,
    delTMeeting,
    editTMeeting,
    addTMeeting,
    updateTMeeting,    
} from "/@/api/system/tMeeting";
import {
    TMeetingTableColumns,
    TMeetingInfoData,
    TMeetingTableDataState,    
} from "/@/views/system/tMeeting/list/component/model"
import ApiV1SystemTMeetingDetail from "/@/views/system/tMeeting/list/component/detail.vue"
import ApiV1SystemTMeetingEdit from "/@/views/system/tMeeting/list/component/edit.vue"

defineOptions({ name: "apiV1SystemTMeetingList"})
const {proxy} = <any>getCurrentInstance()
const loading = ref(false)
const queryRef = ref()
const editRef = ref();
const detailRef = ref();
// 是否显示所有搜索选项
const showAll =  ref(false)
// 非单个禁用
const single = ref(true)
// 非多个禁用
const multiple =ref(true)
const word = computed(()=>{
    if(showAll.value === false) {
        //对文字进行处理
        return "展开搜索";
    } else {
        return "收起搜索";
    }
})
// 字典选项数据
const {    
} = proxy.useDict(    
)
const state = reactive<TMeetingTableDataState>({
    ids:[],
    tableData: {
        data: [],
        total: 0,
        loading: false,
        param: {
            pageNum: 1,
            pageSize: 10,            
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
            dateRange: []
        },
    },
});
const { tableData } = toRefs(state);
// 页面加载时
onMounted(() => {
    initTableData();
});
// 初始化表格数据
const initTableData = () => {    
    tMeetingList()
};
/** 重置按钮操作 */
const resetQuery = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    tableData.value.param.roomNumber = undefined
    // formEl.resetFields()
    tMeetingList()
};
// 获取列表数据
const tMeetingList = ()=>{
  loading.value = true
  listTMeeting(state.tableData.param).then((res:any)=>{
    let list = res.data.Meetings??[];    
    state.tableData.data = list;
    state.tableData.total = res.data.Total;
    loading.value = false
    // console.log(state.tableData)
  })
};

const toggleSearch = () => {
    showAll.value = !showAll.value;
}
// 多选框选中数据
const handleSelectionChange = (selection:Array<TMeetingInfoData>) => {
    state.ids = selection.map(item => item.RoomNumber)
    single.value = selection.length!=1
    multiple.value = !selection.length
}
// const handleAdd =  ()=>{
//     editRef.value.openDialog()
// }
const handleUpdate = (row: TMeetingTableColumns|null) => {
    if(!row){
        row = state.tableData.data.find((item:TMeetingTableColumns)=>{
            return item.id ===state.ids[0]
        }) as TMeetingTableColumns
    }
    editRef.value.openDialog(toRaw(row));
};
const handleDelete = (row: TMeetingTableColumns|null) => {
    let msg = '你确定要删除所选数据？';
    let id:string[] = [] ;
    if(row){
    msg = `此操作将永久删除数据，是否继续?`
    id = [row.RoomNumber]
    }else{
    id = state.ids
    }
    if(id.length===0){
        ElMessage.error('请选择要删除的数据。');
        return
    }
    ElMessageBox.confirm(msg, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(() => {
            delTMeeting(id).then(()=>{
                ElMessage.success('删除成功');
                tMeetingList();
            })
        })
        .catch(() => {});
}
const handleView = (row:TMeetingTableColumns)=>{
    detailRef.value.openDialog(toRaw(row));
}
</script>
<style lang="scss" scoped>
    .colBlock {
        display: block;
    }
    .colNone {
        display: none;
    }
    .ml-2{margin: 3px;}
</style>