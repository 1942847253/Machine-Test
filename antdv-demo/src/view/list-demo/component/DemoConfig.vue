<template>
  <Drawer
    width="600"
    :title="`编辑字段`"
    :closable="false"
    :visible="configVisible"
    class="edit-drawer"
  >
    <a-form :model="formState" :rules="rules" ref="formRef">
      <a-form-item label="字段名称" name="fieldName">
        <Input v-model:value="formState.fieldName" />
      </a-form-item>
      <a-form-item label="字段类型" name="fieldType">
        <Select
          v-model:value="formState.fieldType"
          @change="fieldTypeChange"
          :options="checkStatusOptions"
        >
        </Select>
      </a-form-item>
      <a-form-item label="是否必填" name="whetherMust">
        <a-radio-group v-model:value="formState.whetherMust">
          <a-radio :value="0">是</a-radio>
          <a-radio :value="1">否</a-radio>
        </a-radio-group>
      </a-form-item>
      <div v-if="formState.fieldType !== FIELD_TYPE.SINGLE_TEXT">
        <a-form-item
          v-if="formState.fieldType === FIELD_TYPE.DATE"
          label="日期类型"
          name="fieldOption"
        >
          <a-radio-group v-model:value="formState.fieldOption">
            <a-radio :style="radioStyle" value="年-月">年-月</a-radio>
            <a-radio :style="radioStyle" value="年-月-日">年-月-日</a-radio>
            <a-radio :style="radioStyle" value="年-月-日  时-分">
              年-月-日 时-分
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          v-if="formState.fieldType === FIELD_TYPE.DROP_DOWN"
          label="下拉类型"
          name="fieldOption"
        >
          <Select
            v-model:value="formState.fieldOption"
            mode="multiple"
            placeholder="请选择下拉类型"
            :options="multipleStatusOptions"
          >
          </Select>
        </a-form-item>
      </div>
    </a-form>
    <template #footer>
      <div class="drawer-footer">
        <Button @click="() => emit('configClose')">取消</Button>
        <Button
          type="primary"
          @click="saveData"
          style="margin-left: 15px"
          :loading="loading"
        >
          确定
        </Button>
      </div>
    </template>
  </Drawer>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, watch } from "vue";
import {
  Drawer,
  Button,
  Form,
  Input,
  Select,
  Radio,
  message,
} from "ant-design-vue";
import { FIELD_TYPE, IFieldItem } from "../baseData";
import {
  checkStatusOptions,
  fieldOptionValidatePass,
  multipleStatusOptions,
} from "./baseData";
import { Rule } from "ant-design-vue/lib/form";
import { SelectValue } from "ant-design-vue/lib/select";

export default defineComponent({
  props: {
    fieldItem: {
      type: Object as PropType<IFieldItem>,
      default: {},
    },
    configVisible: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Drawer,
    Button,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Radio.name]: Radio,
    [Radio.Group.name]: Radio.Group,
    Input,
    Select,
  },
  emits: ["configClose", "saveItemConfig"],
  setup(props, { emit }) {
    const formRef = ref();
    const loading = ref<boolean>(false);
    const formState = ref<IFieldItem>({} as IFieldItem);
    const radioStyle = reactive({
      display: "flex",
      height: "30px",
      lineHeight: "30px",
    });

    const rules: Record<string, Rule[]> = {
      fieldName: [
        { required: true, message: "请输入字段名称", trigger: "change" },
      ],
      fieldType: [
        { required: true, message: "请选择字段类型", trigger: "change" },
      ],
      whetherMust: [
        { required: true, message: "请选择字段类型", trigger: "change" },
      ],
      fieldOption: [
        {
          required: true,
          validator: fieldOptionValidatePass,
          trigger: "change",
        },
      ],
    };

    watch(
      () => props.configVisible,
      (val) => {
        val && (formState.value = JSON.parse(JSON.stringify(props.fieldItem)));
      }
    );
    const fieldTypeChange = (value: SelectValue) => {
      if (value === FIELD_TYPE.DROP_DOWN) {
        formState.value.fieldOption = [];
      } else {
        formState.value.fieldOption = "";
      }
    };

    const saveData = () => {
      formRef.value.validate().then(() => {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          message.success("修改成功");
          emit("saveItemConfig", formState.value);
        }, 500);
      });
    };

    return {
      emit,
      rules,
      loading,
      FIELD_TYPE,
      saveData,
      formState,
      radioStyle,
      formRef,
      fieldTypeChange,
      checkStatusOptions,
      multipleStatusOptions,
    };
  },
});
</script>

<style>
body {
  padding: 10px;
}
</style>
