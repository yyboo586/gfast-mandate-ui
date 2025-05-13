export interface TMeetingTableColumns {    
    roomNumber:string;  // ID    
    topic:string;  //  
    type:number;  //      
    mode:number;  //    
    distance:number;  //    
    status:number;  //    
    location:string;  //    
    creatorInfo:UserInfo;
    moderatorInfo:UserInfo; 
    description:string;  //    
    createTime:string;  //    
    startTime:string;  //    
    endTime:string;  //  
    Members:UserInfo[];  
}

export interface UserInfo {
    id:string;
    name:string;
    roles:string[];
    status:string;
    updateTime:string;
    joinTime:string;
    exitTime:string;
};


export interface TMeetingInfoData { 
    roomNumber:string|undefined; // ID    
    topic:string|undefined; //    
    type:number|undefined; //    
    mode:string|undefined; //    
    distance:number|undefined; //    
    status:string|undefined; //    
    location:string|undefined; //    
    creatorInfo:UserInfo;
    moderatorInfo:UserInfo;  
    description:string|undefined; //    
    createTime:string|undefined; //    
    startTime:string|undefined; //    
    endTime:string|undefined; // 
    members:UserInfo[];   
}


export interface TMeetingTableDataState {
    ids:any[];
    tableData: {
        data: Array<TMeetingTableColumns>;
        total: number;
        loading: boolean;
        param: { // 查询会议列表的参数集合
            pageNum: number;
            pageSize: number;            
            id: number|undefined;            
            roomNumber: string|undefined;            
            topic: string|undefined;            
            mode: number|undefined;            
            distance: number|undefined;            
            type: number|undefined;            
            status: number|undefined;            
            location: string|undefined;            
            creatorId: string|undefined;            
            description: string|undefined;            
            createTime: string|undefined;            
            startTime: string|undefined;            
            endTime: string|undefined;            
            dateRange: string[];
        };
    };
}


export interface TMeetingEditState{
    loading:boolean;
    isShowDialog: boolean;
    formData:TMeetingInfoData;
    rules: object;
}