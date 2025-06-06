<template>
  <div class="xray-analysis container">
    <h2>病人 X 光片分析</h2>
    <input type="file" accept="image/*" @change="onFileChange" />
    <div v-if="imageUrl" class="image-wrapper">
      <img :src="imageUrl" ref="xrayImage" @load="onImageLoad" />
      <!-- Canvas 始终渲染，但通过 v-show 控制显示 -->
      <canvas ref="overlayCanvas" class="overlay-canvas" v-show="showCanvas"></canvas>
    </div>
    <!-- 仅在 showCanvas 为 true 时显示分析按钮，确保 canvas 已准备好 -->
    <button v-if="showCanvas" @click="analyze" class="btn btn-primary">分析</button>
    <div v-if="analysisResults.length" class="results">
      <h3>分析结果（示例）</h3>
      <ul>
        <li v-for="(item, index) in analysisResults" :key="index">
          {{ item.description }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue';
export default {
  name: 'XrayAnalysis',
  data() {
    return {
      imageFile: null,
      imageUrl: '',
      analysisResults: [],
      showCanvas: false
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        this.imageFile = file;
        this.imageUrl = URL.createObjectURL(file);
        this.analysisResults = [];
        this.showCanvas = false;
      }
    },
    onImageLoad() {
      // 等待 DOM 更新后再获取 canvas
      nextTick(() => {
        const img = this.$refs.xrayImage;
        const canvas = this.$refs.overlayCanvas;
        if (img && canvas) {
          // 同时设置 style 以保证覆盖比例
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          canvas.style.width = img.clientWidth + 'px';
          canvas.style.height = img.clientHeight + 'px';
          this.showCanvas = true;
        }
      });
    },
    analyze() {
      const canvas = this.$refs.overlayCanvas;
      if (!canvas) return;
      const ctx = canvas.getContext && canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 4;
      const rectWidth = canvas.width * 0.5;
      const rectHeight = canvas.height * 0.5;
      const x = (canvas.width - rectWidth) / 2;
      const y = (canvas.height - rectHeight) / 2;
      ctx.strokeRect(x, y, rectWidth, rectHeight);
      this.analysisResults = [
        { description: '肺部可能有阴影，建议进一步检查' },
        { description: '心脏大小正常' }
      ];
    }
  }
};
</script>

<style scoped>
.container {
  width: 90%;
  max-width: 800px;
  margin: 2rem auto;
  text-align: center;
}
.image-wrapper {
  position: relative;
  display: inline-block;
  margin: 1rem 0;
}
.image-wrapper img {
  max-width: 100%;
  height: auto;
  display: block;
}
.overlay-canvas {
  position: absolute;
  top: 0;
  left: 0;
}
.btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn:hover {
  background-color: #005fa3;
}
.results {
  margin-top: 1.5rem;
  text-align: left;
}
.results ul {
  list-style: disc inside;
}
</style>