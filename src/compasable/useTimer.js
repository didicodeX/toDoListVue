import { onMounted, onUnmounted, ref } from "vue";

export function useTimer(initial = 0) {
  const time = ref(initial);

  let timer = 0;
  onMounted(() => {
    setInterval(() => {
      time.value++;
    }, 1000);
  });

  onUnmounted(() => {
    clearInterval(timer);
  });

  return time;
}
