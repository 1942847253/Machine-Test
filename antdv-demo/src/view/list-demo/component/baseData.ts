import { Rule } from "ant-design-vue/lib/form";
import { FIELD_TYPE } from "../baseData";

export const checkStatusOptions = [
    {
        value: FIELD_TYPE.SINGLE_TEXT,
        label: "单行文本",
    },
    {
        value: FIELD_TYPE.DATE,
        label: "日期",
    },
    {
        value: FIELD_TYPE.DROP_DOWN,
        label: "单选下拉",
    },
];

export const multipleStatusOptions = [
    { value: '选项一', },
    { value: '选项二', },
    { value: '选项三', },
];

export const fieldOptionValidatePass = async (_rule: Rule, value: string | string[]) => {
    if (Array.isArray(value) && value.length === 0) {
        return Promise.reject('请选择下拉类型');
    } else if (value === '') {
        return Promise.reject('请选择日期类型');
    }
    return Promise.resolve();
};