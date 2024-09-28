<template>
  <label>
    <input type="checkbox" @change="onChange" />
    {{ label }}
  </label>
</template>

<script setup>
const props = defineProps({
  label: String,
});
console.log(props.label);

const emits = defineEmits(["check", "uncheck"]);
const onChange = (e) => {
  if (e.currentTarget.checked) {
    emits("check", e.currentTarget);
  } else {
    emits("uncheck", e.currentTarget);
  }
};
</script>
