<template>
        <div class="overlay flex items-center justify-center" v-if="show">
        <AtomSpinner class="absolute w-52 h-52 " :animation-duration="1000" :size="60" color="#ff1d5e"/>
    </div>

</template>
<script setup>
import { ref, computed, onMounted ,defineProps} from 'vue'
import { AtomSpinner } from 'epic-spinners'
const props = defineProps({
    show: Boolean
});
</script>
<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Màu nền và độ trong suốt */
  z-index: 9999; /* Đảm bảo overlay nằm trên tất cả các phần tử khác */
}
</style>