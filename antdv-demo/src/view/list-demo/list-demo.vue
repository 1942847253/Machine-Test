<template>
  <Table :columns="Columns" :data-source="tableDate">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'fieldType'">
        {{ getFieldType(record.fieldType) }}
      </template>
      <template v-if="column.dataIndex === 'whetherMust'">
        {{ record.whetherMust === WHETHER_MUST.MUST ? "是" : "否" }}
      </template>
      <template v-if="column.dataIndex === 'fieldOption'">
        {{ getFieldOptions(record.fieldOption) }}
      </template>
      <template v-if="column.dataIndex === 'operation'">
        <a @click="editConfig(record)">编辑</a>
      </template>
    </template>
  </Table>
  <DemoConfig
    :configVisible="configVisible"
    :fieldItem="fieldItem"
    @configClose="configClose"
    @saveItemConfig="saveItemConfig"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { Button, Table } from "ant-design-vue";
import DemoConfig from "./component/DemoConfig.vue";
import {
  Columns,
  fieldList,
  FIELD_TYPE,
  IFieldItem,
  WHETHER_MUST,
} from "./baseData";

export default defineComponent({
  components: {
    Button,
    Table,
    DemoConfig,
  },
  setup() {
    const tableDate = reactive<IFieldItem[]>(fieldList);
    const configVisible = ref<boolean>(false);
    const fieldItem = ref<IFieldItem>({} as IFieldItem);

    const getFieldType = (fieldType: number): string => {
      switch (fieldType) {
        case FIELD_TYPE.SINGLE_TEXT:
          return "单行文本";
        case FIELD_TYPE.DATE:
          return "日期";
        case FIELD_TYPE.DROP_DOWN:
          return "单选下拉";
        default:
          return "";
      }
    };

    const getFieldOptions = (option: string | string[]): string => {
      if (Array.isArray(option)) {
        return option.join(" 、");
      } else if (option !== "") {
        return option;
      } else {
        return "无";
      }
    };

    const editConfig = (Item: any): void => {
      configVisible.value = true;
      fieldItem.value = Item;
    };

    const configClose = () => {
      configVisible.value = false;
    };

    const saveItemConfig = (propItem: IFieldItem) => {
      configVisible.value = false;
      tableDate.forEach((item) => {
        if (item.id === propItem.id) {
          Object.keys(item).forEach((key) => {
            item[key] = propItem[key];
          });
        }
      });
    };
    return {
      Columns,
      tableDate,
      fieldItem,
      FIELD_TYPE,
      WHETHER_MUST,
      getFieldType,
      configVisible,
      editConfig,
      configClose,
      getFieldOptions,
      saveItemConfig,
    };
  },
});
</script>

<style></style>
