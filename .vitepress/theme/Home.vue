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
                <div class="description-left">
                    <div class="description-title">{{ t.descriptionTitle }}</div>
                    <p class="description-text" v-html="t.descriptionText1"></p>
                    <p class="description-text">{{ t.descriptionText2 }}</p>
                </div>
                <div class="description-right">
                    <div class="description-subtitle">{{ t.descriptionSubtitle }}</div>
                    <p class="description-text">{{ t.descriptionText3 }}</p>
                    <p class="description-text">
                        <a href="http://www.cripac.ia.ac.cn/CN/model/index.htm" class="highlight-link-casia" target="_blank" rel="noopener noreferrer"><strong class="highlight-casia">{{ t.casiaName }}</strong></a> – <a href="https://www.ia.ac.cn/" class="highlight-link-casia" target="_blank" rel="noopener noreferrer">{{ t.casiaLink }}</a>
                    </p>
                    <p class="description-text">
                        <a href="/nju/" class="highlight-link-nju" target="_blank" rel="noopener noreferrer"><strong class="highlight-nju">{{ t.njuName }}</strong></a> – <a href="https://is.nju.edu.cn/" class="highlight-link-nju" target="_blank" rel="noopener noreferrer">{{ t.njuLink }}</a>
                    </p>
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
    background: radial-gradient(ellipse at center, rgba(45, 45, 45, 1) 0%, rgba(25, 25, 25, 1) 50%, rgba(25, 25, 25, 1) 100%);
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    position: relative;
    z-index: 5;
}

.description-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 4rem 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
    position: relative;
    z-index: 6;
}

.description-left,
.description-right {
    display: flex;
    flex-direction: column;
}

.description-title,
.description-subtitle {
    font-family: 'Space+Grotesk', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.8);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 1.5rem;
    position: relative;
}

.description-title::after,
.description-subtitle::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 3rem;
    height: 2px;
    background: linear-gradient(90deg, #4A90E2, transparent);
}

.description-text {
    font-family: 'Space+Grotesk', sans-serif;
    font-size: 1.1rem;
    font-weight: 400;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.9);
    text-align: left;
    letter-spacing: 0.1px;
    margin: 0 0 1.5rem 0;
}

.highlight-name {
    color: #FFFFFF;
    font-weight: 700;
    font-family: 'Space+Grotesk', sans-serif;
}

.highlight-lab {
    color: #FFFFFF;
    font-weight: 700;
    font-family: 'Space+Grotesk', sans-serif;
}

.highlight-casia {
    color: #1470E3;
    font-weight: 700;
    font-family: 'Space+Grotesk', sans-serif;
}

.highlight-nju {
    color: #D400BE;
    font-weight: 700;
    font-family: 'Space+Grotesk', sans-serif;
}

.highlight-link-casia {
    color: #1470E3;
    text-decoration: none;
    font-weight: 600;
    font-family: 'Space+Grotesk', sans-serif;
    transition: all 0.3s ease;
}

.highlight-link-casia:hover {
    color: #0F5BB8;
}

.highlight-link-nju {
    color: #D400BE;
    text-decoration: none;
    font-weight: 600;
    font-family: 'Space+Grotesk', sans-serif;
    transition: all 0.3s ease;
}

.highlight-link-nju:hover {
    color: #B800A3;
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
        gap: 3rem;
        padding: 3rem 1.5rem;
        max-width: 100%;
    }
    
    .description-title,
    .description-subtitle {
        font-size: 1.1rem;
        margin-bottom: 1rem;
    }
    
    .description-text {
        font-size: 1rem;
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
    
    .description-title,
    .description-subtitle {
        font-size: 1rem;
        margin-bottom: 0.8rem;
    }
    
    .description-text {
        font-size: 0.95rem;
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