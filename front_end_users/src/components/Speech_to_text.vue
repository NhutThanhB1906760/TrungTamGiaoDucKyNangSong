<template>
  <div class="">
    <!-- <va-card v-if="transcription" class="h-fit text-lg">
      <div>{{ transcription }}</div>
    </va-card> -->
    <va-button @click="startRecording" round size="large" v-if="!isRecording" color="info" gradient
      class="block px-2 py-1 md:py-2 ">
      <i class="fa-solid fa-microphone text-2xl "></i> </va-button>
    <va-button @click="stopRecording" round size="large" v-if="isRecording" color="info" gradient
      class="block py-1 md:py-2 animate-pulse">
      <i class="fa-solid fa-microphone-slash text-2xl  "></i> </va-button>
    <!-- <button @click="startRecording" :disabled="isRecording" class="border">Start Recording</button> <br>
      <button @click="stopRecording" :disabled="!isRecording" class="border">Stop Recording</button><br> -->
    <!-- <button @click="convertToText" :disabled="!canConvert" class="border">Convert to Text</button> -->

  </div>
</template>
  
<script>
import RecordRTC from 'recordrtc';
import axios from 'axios';
import { useRouter } from 'vue-router'

export default {
  data() {
    return {
      recorder: null,
      isRecording: false,
      canConvert: false,
      transcription: '',
      timeoutId: null
    };
  },
  methods: {
    startRecording() {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          this.recorder = RecordRTC(stream, {
            type: 'audio',
          });
          this.recorder.startRecording();
          this.isRecording = true;
          this.canConvert = false;
        })
        .catch((error) => {
          console.error('Failed to access microphone:', error);
        });
    },
    stopRecording() {
      this.recorder.stopRecording(() => {
        this.isRecording = false;
        this.canConvert = true;
        this.convertToText()
      });
    },
    setupVariable() {

      this.transcription = ''; // Khởi tạo biến rỗng, bạn có thể thay đổi thành giá trị mặc định tùy ý
      console.log(this.transcription);
      clearTimeout(this.timeoutId);
      // console.log("Biến đã được thiết lập sau 5 giây:", myVariable);
      // 5000 milliseconds = 5 giây
    },
    convert(str) {
      const cleanedStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
      // Chuyển đổi "đ" thành "d"
      return cleanedStr;
    },
    convertToText() {
      this.recorder.getDataURL((audioDataURL) => {
        const audioBlob = this.dataURItoBlob(audioDataURL);
        const formData = new FormData();
        formData.append('audio', audioBlob);

        const apiKey = '0D71bbFZg2AuEo8cwlPIjMAKdWzw1svF';

        axios
          .post('https://api.fpt.ai/hmi/asr/general', formData, {
            headers: {
              'api-key': apiKey,
            },
          })
          .then((response) => {
            this.transcription = response.data.hypotheses[0].utterance;
            this.$emit('message-sent', response.data.hypotheses[0].utterance);
            console.log(response.data.hypotheses[0].utterance);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      });
      this.timeoutId = setTimeout(this.setupVariable, 7000);
    },
    dataURItoBlob(dataURI) {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    },

  },
  computed: {
    setText() {
      return this.transcription
    }
  }
};
</script>

