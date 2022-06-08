import { ColumnsType } from "ant-design-vue/lib/table";
import { DefaultRecordType } from "ant-design-vue/lib/vc-table/interface";
import { reactive } from "vue";

export enum FIELD_TYPE {
    SINGLE_TEXT = 0, // 单行文本
    DATE = 1, // 日期
    DROP_DOWN = 2, // 单选下拉
}

export enum WHETHER_MUST {
    MUST = 0, // 必须
    UN_MUST = 1 // 非必须
}

export interface IFieldItem {
    id: number;
    fieldName: string; // 字段名称
    fieldType: FIELD_TYPE; // 字段类型
    whetherMust: number; // 是否必填
    fieldOption: string | string[]; // 字段选项
}

export const fieldList: IFieldItem[] = [
    {
        id: 1,
        fieldName: '字段一',
        fieldType: 0,
        whetherMust: 0,
        fieldOption: '',
    },
    {
        id: 2,
        fieldName: '字段二',
        fieldType: 1,
        whetherMust: 1,
        fieldOption: '年-月-日',
    },
    {
        id: 3,
        fieldName: '字段三',
        fieldType: 2,
        whetherMust: 0,
        fieldOption: ['选项一', '选项二'],
    }
]

export const Columns: ColumnsType<DefaultRecordType> = reactive([
    {
        title: '字段名称',
        dataIndex: 'fieldName',
    },
    {
        title: '字段类型',
        dataIndex: 'fieldType',
    },
    {
        title: '是否必填',
        dataIndex: 'whetherMust',
    },
    {
        title: '字段选项',
        dataIndex: 'fieldOption',
    },
    {
        title: '操作',
        dataIndex: 'operation',
    }
]);