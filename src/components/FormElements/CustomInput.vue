<template>
  <label v-if="label">{{ label }}</label>
  <InputText
    v-bind="$attrs"
    :value="modelValue"
    :placeholder="label"
    @input="$emit('update:modelValue', $event.target.value)"
    class="field"
  />
</template>

<script lang="ts">
import { PropType } from "@vue/runtime-core";
export default {
  props: {
    label: {
      type: String as PropType<string>,
      default: "",
    },
    modelValue: {
      type: String as PropType<string>,
      default: "",
    },
  },
};
</script>

<style scoped></style>
