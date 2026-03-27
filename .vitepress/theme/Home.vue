<template>
    <div>
        <div class="home-container">
            <HomeNav class="relative z-10"></HomeNav>
            <div class="content-wrapper">
                <div class="text-content">
                    <h1 class="main-title" :class="{ 'chinese-font': locale.currentLang === 'zh' }">{{ t.mainTitle }}</h1>
                    <h2 class="subtitle">{{ t.subtitle }}</h2>
                </div>
                
                <!-- 向下滚动箭头 -->
                <ScrollDownArrow />
            </div>
        </div>
        
        <!-- 介绍文字区域 -->
        <div class="description-section">
            <div class="description-container">
                <div class="description-panel description-left">
                    <div class="description-kicker">{{ t.descriptionTitle }}</div>
                    <h2 class="description-heading">PRLab</h2>
                    <p class="description-text lead-text" v-html="t.descriptionText1"></p>
                    <p v-if="t.descriptionText2" class="description-text">{{ t.descriptionText2 }}</p>
                </div>
                <div class="description-panel description-right">
                    <div class="description-kicker">{{ t.descriptionSubtitle }}</div>
                    <p class="description-text">{{ t.descriptionText3 }}</p>
                    <div class="composition-list">
                        <a href="http://www.cripac.ia.ac.cn/CN/model/index.htm" class="composition-item composition-item-casia" target="_blank" rel="noopener noreferrer">
                            <span class="composition-name highlight-casia">{{ t.casiaName }}</span>
                            <span class="composition-org">{{ t.casiaLink }}</span>
                        </a>
                        <a href="/nju/" class="composition-item composition-item-nju" target="_blank" rel="noopener noreferrer">
                            <span class="composition-name highlight-nju">{{ t.njuName }}</span>
                            <span class="composition-org">{{ t.njuLink }}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 按钮组件 -->
        <HomeButtons />
    </div>
</template>

<style scoped>
.home-container {
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-image: url('/images/bg9_cutted.jpg');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}

.home-container::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/images/bg9_cutted.jpg');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    filter: blur(1px);
    z-index: 1;
}

.home-container::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(100, 100, 100, 0.25), rgba(100, 100, 100, 0.25)),
        url('https://www.transparenttextures.com/patterns/concrete-wall.png');
    background-blend-mode: multiply;
    opacity: 0.6;
    z-index: 2;
}

.content-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 2rem;
    position: relative;
    z-index: 3;
}

.text-content {
    text-align: center;
    color: white;
    z-index: 3;
    position: relative;
    margin: 0;
    padding: 2rem 0;
}

.main-title {
    font-family: 'Poppins', sans-serif;
    font-size: 8rem;
    font-weight: 500;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    line-height: 1;
    margin-bottom: 1rem;
    letter-spacing: -0.01em;
    transition: font-family 0.3s ease;
}

.main-title.chinese-font {
    font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', 'STHeiti', 'SimHei', 'WenQuanYi Micro Hei', sans-serif;
    font-weight: 600;
    letter-spacing: 0.02em;
}

.subtitle {
    font-family: 'Poppins', sans-serif;
    font-size: 2.5rem;
    font-weight: 600;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    line-height: 1.2;
    margin-bottom: 1rem;
}

.description-section {
    width: 100vw;
    background:
        radial-gradient(circle at top left, rgba(40, 86, 135, 0.28), transparent 32%),
        radial-gradient(circle at bottom right, rgba(181, 16, 149, 0.22), transparent 28%),
        linear-gradient(135deg, #111827 0%, #16181d 45%, #0f1116 100%);
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    position: relative;
    z-index: 5;
}

.description-container {
    max-width: 1320px;
    margin: 0 auto;
    padding: 5rem 1.5rem;
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
    gap: 2rem;
    position: relative;
    z-index: 6;
}

.description-panel {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 2.4rem 2.2rem;
    border-radius: 28px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
    box-shadow: 0 26px 70px rgba(0, 0, 0, 0.28);
    backdrop-filter: blur(12px);
}

.description-kicker {
    font-family: 'Chakra Petch', sans-serif;
    font-size: 0.92rem;
    font-weight: 700;
    color: rgba(160, 210, 255, 0.92);
    text-transform: uppercase;
    letter-spacing: 0.18em;
    margin-bottom: 1rem;
    position: relative;
}

.description-kicker::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 3.5rem;
    height: 2px;
    background: linear-gradient(90deg, #6bb8ff, transparent);
}

.description-heading {
    font-family: 'Cormorant Garamond', 'Times New Roman', serif;
    font-size: clamp(2rem, 3vw, 3.2rem);
    line-height: 1.02;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin: 0 0 1rem 0;
}

.description-text {
    font-family: 'Source Serif 4', 'Georgia', 'Times New Roman', serif;
    font-size: 1.05rem;
    font-weight: 400;
    line-height: 1.85;
    color: rgba(255, 255, 255, 0.86);
    text-align: left;
    letter-spacing: 0.003em;
    margin: 0 0 1.5rem 0;
}

.lead-text {
    font-size: 1.14rem;
    color: rgba(255, 255, 255, 0.94);
}

.description-right .description-text:first-of-type {
    margin-top: 0.4rem;
    margin-bottom: 1rem;
}

.composition-list {
    display: grid;
    gap: 0.8rem;
    margin-top: 0.2rem;
}

.composition-item {
    display: flex;
    flex-direction: column;
    gap: 0.22rem;
    padding: 0.82rem 1.05rem 0.78rem;
    border-radius: 18px;
    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.04);
    transition: transform 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
}

.composition-item:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.07);
    color: inherit;
}

.composition-item-casia:hover {
    border-color: rgba(20, 112, 227, 0.42);
}

.composition-item-nju:hover {
    border-color: rgba(212, 0, 190, 0.36);
}

.composition-name {
    font-family: 'Cormorant Garamond', 'Times New Roman', serif;
    font-size: 1.08rem;
    font-weight: 600;
    letter-spacing: 0.01em;
}

.composition-org {
    font-family: 'Source Serif 4', 'Georgia', 'Times New Roman', serif;
    font-size: 0.93rem;
    line-height: 1.45;
    color: rgba(255, 255, 255, 0.76);
}

.highlight-name {
    color: #FFFFFF;
    font-weight: 700;
    font-family: 'Cormorant Garamond', 'Times New Roman', serif;
}

.highlight-lab {
    color: #FFFFFF;
    font-weight: 700;
    font-family: 'Cormorant Garamond', 'Times New Roman', serif;
}

.highlight-casia {
    color: #1470E3;
    font-weight: 700;
    font-family: 'Cormorant Garamond', 'Times New Roman', serif;
}

.highlight-nju {
    color: #D400BE;
    font-weight: 700;
    font-family: 'Cormorant Garamond', 'Times New Roman', serif;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .main-title {
        font-size: 5rem;
    }
    
    .subtitle {
        font-size: 2rem;
        margin-bottom: 0.5rem;
    }
    
    .description-section {
        margin-left: calc(-50vw + 50%);
        margin-right: calc(-50vw + 50%);
    }
    
    .description-container {
        grid-template-columns: 1fr;
        gap: 1.25rem;
        padding: 3rem 1.5rem;
        max-width: 100%;
    }
    
    .description-panel {
        padding: 1.7rem 1.35rem;
        border-radius: 22px;
    }

    .description-heading {
        margin-bottom: 1rem;
    }

    .description-right .description-text:first-of-type {
        margin-top: 0;
    }
    
    .description-text {
        font-size: 1rem;
        line-height: 1.8;
    }
    
    .text-content {
        margin: 0;
        padding: 1rem 0;
    }
}

@media (max-width: 480px) {
    .main-title {
        font-size: 3rem;
    }
    
    .subtitle {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
    }
    
    .description-container {
        gap: 2.5rem;
        padding: 2rem 1rem;
        max-width: 100%;
    }
    
    .description-kicker {
        font-size: 0.82rem;
    }
    
    .description-text {
        font-size: 0.95rem;
    }

    .lead-text {
        font-size: 1rem;
    }

    .composition-name {
        font-size: 1.05rem;
    }
    
    .content-wrapper {
        padding: 1rem;
    }
    
    .text-content {
        margin: 0;
        padding: 0.5rem 0;
    }
}
</style>

<script>
import { computed } from 'vue'
import { useI18n } from './i18n/index.js'
import { locale } from './locale.js'
import HomeNav from './components/HomeNav.vue'
import HomeButtons from './components/HomeButtons.vue'
import ScrollDownArrow from './components/ScrollDownArrow.vue'

export default {
    components: {
        HomeNav,
        HomeButtons,
        ScrollDownArrow
    },
    setup() {
        const t = useI18n('Home')
        
        return {
            t,
            locale
        }
    }
}
</script>
