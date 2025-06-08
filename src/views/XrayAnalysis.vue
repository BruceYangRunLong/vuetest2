<template>
  <div class="xray-analysis-container">
    <!-- 动态背景粒子 -->
    <div class="particles">
      <div 
        v-for="i in 20" 
        :key="i" 
        class="particle" 
        :style="getParticleStyle(i)"
      ></div>
    </div>

    <div class="content-wrapper">
      <!-- 头部标题区域 -->
      <div class="header">
        <h2>X光片智能分析系统</h2>
        <p class="subtitle">上传X光片图像，获取专业的AI辅助分析结果</p>
      </div>

      <!-- 文件上传区域 -->
      <div class="upload-section">
        <div class="file-input-wrapper">
          <input 
            type="file" 
            accept="image/*" 
            @change="onFileChange" 
            class="file-input" 
            ref="fileInput"
          />
          <div class="file-input-display" @click="triggerFileInput">
            <svg class="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
            <div class="upload-text">点击上传X光片</div>
            <div class="upload-hint">支持 JPG、PNG、JPEG 格式</div>
          </div>
        </div>
      </div>

      <!-- 图像显示区域 -->
      <Transition name="slide-up" appear>
        <div v-if="imageUrl" class="image-container">
          <div class="image-wrapper">
            <img 
              :src="imageUrl" 
              ref="xrayImage" 
              @load="onImageLoad" 
              class="xray-image"
              alt="X光片图像"
            />
            <canvas 
              ref="overlayCanvas" 
              class="overlay-canvas" 
              v-show="showCanvas"
            ></canvas>
          </div>
          
          <!-- 分析按钮 -->
          <Transition name="fade" appear>
            <button 
              v-if="showCanvas" 
              @click="analyze" 
              class="analyze-btn"
              :disabled="isAnalyzing"
              :class="{ 'analyzing': isAnalyzing }"
            >
              <span v-if="!isAnalyzing">开始分析</span>
              <span v-else class="analyzing-text">
                <div class="loading-spinner"></div>
                分析中...
              </span>
            </button>
          </Transition>
        </div>
      </Transition>

      <!-- 分析结果区域 -->
      <Transition name="slide-up" appear>
        <div v-if="analysisResults.length" class="results">
          <h3 class="results-title">
            <svg class="results-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            分析结果
          </h3>
          <ul class="results-list">
            <TransitionGroup name="list" tag="div">
              <li 
                v-for="(item, index) in analysisResults" 
                :key="index"
                class="result-item"
                :style="{ '--delay': index * 0.1 + 's' }"
              >
                <div class="result-icon">🔍</div>
                <div class="result-content">
                  <div class="result-text">{{ item.description }}</div>
                  <div class="result-confidence" v-if="item.confidence">
                    置信度: {{ item.confidence }}%
                  </div>
                </div>
              </li>
            </TransitionGroup>
          </ul>
        </div>
      </Transition>
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
      showCanvas: false,
      isAnalyzing: false,
      particles: []
    };
  },
  mounted() {
    this.initializeParticles();
  },
  methods: {
    // 初始化粒子效果
    initializeParticles() {
      this.particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 6
      }));
    },
    
    // 获取粒子样式
    getParticleStyle(index) {
      const particle = this.particles[index - 1];
      if (!particle) return {};
      
      return {
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        animationDelay: `${particle.delay}s`
      };
    },

    // 触发文件选择
    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    // 文件变化处理
    onFileChange(e) {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        this.imageFile = file;
        this.imageUrl = URL.createObjectURL(file);
        this.analysisResults = [];
        this.showCanvas = false;
        this.isAnalyzing = false;
      }
    },

    // 图像加载完成
    onImageLoad() {
      nextTick(() => {
        const img = this.$refs.xrayImage;
        const canvas = this.$refs.overlayCanvas;
        
        if (img && canvas) {
          // 设置canvas尺寸以匹配图像
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          canvas.style.width = img.clientWidth + 'px';
          canvas.style.height = img.clientHeight + 'px';
          this.showCanvas = true;
        }
      });
    },

    // 执行分析
    async analyze() {
      if (!this.showCanvas || this.isAnalyzing) return;
      
      this.isAnalyzing = true;
      
      // 模拟分析过程
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const canvas = this.$refs.overlayCanvas;
      if (!canvas) {
        this.isAnalyzing = false;
        return;
      }
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        this.isAnalyzing = false;
        return;
      }
      
      // 清除之前的绘制
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 绘制检测框
      this.drawDetectionBoxes(ctx, canvas);
      
      // 设置分析结果
      this.analysisResults = [
        { 
          description: '左下肺叶发现可疑阴影，建议进一步CT检查',
          confidence: 85
        },
        { 
          description: '心脏轮廓大小正常，位置居中',
          confidence: 92
        },
        { 
          description: '右肺透亮度良好，未见明显异常',
          confidence: 88
        },
        { 
          description: '肋骨结构完整，未见骨折征象',
          confidence: 95
        },
        { 
          description: '胸廓对称，膈面清晰',
          confidence: 90
        }
      ];
      
      this.isAnalyzing = false;
    },

    // 绘制检测框
    drawDetectionBoxes(ctx, canvas) {
      // 设置绘制样式
      ctx.strokeStyle = 'rgba(255, 69, 58, 0.8)';
      ctx.lineWidth = 4;
      ctx.setLineDash([10, 5]);
      
      // 绘制多个检测区域
      const boxes = [
        {
          x: canvas.width * 0.2,
          y: canvas.height * 0.3,
          width: canvas.width * 0.4,
          height: canvas.height * 0.25
        },
        {
          x: canvas.width * 0.6,
          y: canvas.height * 0.5,
          width: canvas.width * 0.25,
          height: canvas.height * 0.2
        }
      ];
      
      boxes.forEach(box => {
        ctx.strokeRect(box.x, box.y, box.width, box.height);
      });
      
      // 添加标注文字
      ctx.fillStyle = 'rgba(255, 69, 58, 0.9)';
      ctx.font = '16px Arial';
      ctx.fillText('异常区域', boxes[0].x, boxes[0].y - 10);
      ctx.fillText('正常区域', boxes[1].x, boxes[1].y - 10);
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

/* 主容器 */
.xray-analysis-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow-x: hidden;
}

/* 动态背景粒子 */
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  50% { 
    transform: translateY(-20px) rotate(180deg); 
  }
}

/* 内容容器 */
.content-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 900px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.1),
    0 8px 32px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  padding: 3rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.content-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.5), transparent);
}

/* 头部区域 */
.header {
  margin-bottom: 2.5rem;
}

h2 {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.subtitle {
  color: #64748b;
  font-size: 1.1rem;
  font-weight: 400;
}

/* 上传区域 */
.upload-section {
  margin-bottom: 2.5rem;
}

.file-input-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 400px;
}

.file-input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.file-input-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 2rem;
  border: 2px dashed #cbd5e1;
  border-radius: 16px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.file-input-display::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
  transition: left 0.6s;
}

.file-input-display:hover {
  border-color: #667eea;
  background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%);
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.15);
}

.file-input-display:hover::before {
  left: 100%;
}

.upload-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1rem;
  opacity: 0.7;
  color: #667eea;
}

.upload-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.5rem;
}

.upload-hint {
  font-size: 0.9rem;
  color: #64748b;
}

/* 图像容器 */
.image-container {
  margin: 2rem 0;
}

.image-wrapper {
  position: relative;
  display: inline-block;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  background: #f8fafc;
  max-width: 100%;
}

.xray-image {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: 16px;
}

.overlay-canvas {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 16px;
}

/* 分析按钮 */
.analyze-btn {
  margin-top: 2rem;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 
    0 12px 32px rgba(102, 126, 234, 0.3),
    0 4px 12px rgba(102, 126, 234, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  min-width: 160px;
}

.analyze-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s;
}

.analyze-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 
    0 16px 40px rgba(102, 126, 234, 0.4),
    0 8px 20px rgba(102, 126, 234, 0.3);
}

.analyze-btn:hover:not(:disabled)::before {
  left: 100%;
}

.analyze-btn:disabled {
  opacity: 0.8;
  cursor: not-allowed;
}

.analyzing-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { 
    transform: rotate(360deg); 
  }
}

/* 结果区域 */
.results {
  margin-top: 2.5rem;
  text-align: left;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(203, 213, 225, 0.5);
}

.results-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.results-icon {
  width: 24px;
  height: 24px;
  opacity: 0.8;
}

.results-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.result-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border-left: 4px solid #667eea;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  animation: slideInResult 0.5s ease-out;
  animation-delay: var(--delay);
  animation-fill-mode: both;
}

.result-item:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.result-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.result-content {
  flex: 1;
}

.result-text {
  font-size: 1rem;
  color: #475569;
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.result-confidence {
  font-size: 0.875rem;
  color: #667eea;
  font-weight: 600;
}

@keyframes slideInResult {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Vue过渡动画 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.list-enter-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.list-move {
  transition: transform 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 2rem 1.5rem;
    margin: 1rem;
  }

  h2 {
    font-size: 2rem;
  }

  .file-input-display {
    padding: 2rem 1.5rem;
  }

  .analyze-btn {
    padding: 0.875rem 2rem;
    font-size: 1rem;
  }

  .result-item {
    padding: 1rem;
  }
}
</style>