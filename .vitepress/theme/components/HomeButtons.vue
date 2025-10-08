<template>
    <div class="buttons-section">
        <div class="selection-guide">
            <h3 class="guide-text">Choose a PRLab</h3>
            <p class="guide-subtitle">Select which Pattern Recognition Laboratory to explore</p>
        </div>
        <div class="buttons-container">
            <div 
                class="button-wrapper" 
                :class="{ expanded: activeButton === 'nju', collapsed: activeButton === 'casia' }"
                @mouseenter="setActiveButton('nju')"
            >
                <a href="/nju/" class="button njuz-button">
                    <div class="button-bg njuz-bg"></div>
                    <span class="button-text njuz-text">PRLab<span class="at-symbol">@</span><span class="highlight-nju">NJU</span></span>
                </a>
            </div>
            <div 
                class="button-wrapper" 
                :class="{ expanded: activeButton === 'casia', collapsed: activeButton === 'nju' }"
                @mouseenter="setActiveButton('casia')"
            >
                <a href="http://www.cripac.ia.ac.cn/CN/model/index.htm" class="button casia-button" target="_blank" rel="noopener noreferrer">
                    <div class="button-bg casia-bg"></div>
                    <span class="button-text casia-text">PRLab<span class="at-symbol">@</span><span class="highlight-casia">CASIA</span></span>
                </a>
            </div>
            <!-- 动态横线 -->
            <div 
                class="divider-line" 
                :class="{ 'left-position': activeButton === 'nju', 'right-position': activeButton === 'casia' }"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeButtons',
    data() {
        return {
            activeButton: 'nju' // 默认激活NJU按钮
        }
    },
    methods: {
        setActiveButton(button) {
            this.activeButton = button
        }
    }
}
</script>

<style scoped>
.buttons-section {
    position: relative;
    width: 100vw;
    min-height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 3rem 2rem;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    background: rgba(255, 255, 255, 1);
    border-top: 2px solid rgba(0, 0, 0, 0.1);
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    box-shadow: 
        inset 0 0 20px rgba(0, 0, 0, 0.1),
        0 0 15px rgba(0, 0, 0, 0.1);
    z-index: 10;
}

.selection-guide {
    position: relative;
    text-align: center;
    margin-bottom: 2rem;
    z-index: 12;
}

.guide-text {
    font-family: 'Poppins', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0 0 0.5rem 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    letter-spacing: -0.5px;
}

.guide-subtitle {
    font-family: 'Poppins', sans-serif;
    font-size: 1.2rem;
    font-weight: 400;
    color: #7f8c8d;
    margin: 0;
    letter-spacing: 0.5px;
    text-transform: uppercase;
}

.buttons-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4rem;
    background: rgba(255, 255, 255, 1);
    z-index: 1;
}

.buttons-section::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4rem;
    background: rgba(255, 255, 255, 1);
    z-index: 1;
}


.buttons-container {
    position: relative;
    display: flex;
    gap: 0;
    justify-content: center;
    width: 100vw;
    height: 300px;
    overflow: hidden;
    z-index: 15;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
}

.button-wrapper {
    height: 100%;
    position: relative;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 默认状态：左侧按钮展开，右侧按钮缩小 */
.button-wrapper.expanded {
    flex: 0 0 60%;
}

.button-wrapper.collapsed {
    flex: 0 0 40%;
}

.button {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    text-decoration: none;
    border-radius: 0;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 
        0 10px 20px rgba(0, 0, 0, 0.2);
    border: none;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.1);
    z-index: 3;
}

.button:hover {
    box-shadow: 
        0 15px 30px rgba(0, 0, 0, 0.3),
        0 0 20px rgba(255, 255, 255, 0.1);
}

.button-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: all 0.4s ease;
    border-radius: 0;
    opacity: 1;
}

.njuz-bg {
    background-image: url('/images/home/njusz.jpg');
}

.casia-bg {
    background-image: url('/images/home/casia.jpg');
}

.button-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 4;
    color: white;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 2.5rem;
    text-shadow: 
        0 2px 4px rgba(0, 0, 0, 0.8),
        0 1px 2px rgba(0, 0, 0, 0.6);
    text-align: center;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
}

.njuz-text {
    color: white;
}

.casia-text {
    color: white;
}

.at-symbol {
    color: white;
}

.highlight-nju {
    color: white;
}

.highlight-casia {
    color: white;
}

.divider-line {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    z-index: 20;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.divider-line.left-position {
    left: 60%;
}

.divider-line.right-position {
    left: 40%;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .buttons-section {
        min-height: 35vh;
        margin: 0;
        padding: 2rem 1rem;
        margin-left: calc(-50vw + 50%);
        margin-right: calc(-50vw + 50%);
    }

    
    .buttons-container {
        flex-direction: column;
        height: 400px;
        width: 100vw;
        gap: 0;
        margin-left: calc(-50vw + 50%);
        margin-right: calc(-50vw + 50%);
    }
    
    .button-wrapper {
        height: 50%;
    }
    
    .button-wrapper.expanded {
        flex: 0 0 60%;
    }
    
    .button-wrapper.collapsed {
        flex: 0 0 40%;
    }
    
    /* 竖屏模式：隐藏分割线 */
    .divider-line {
        display: none;
    }
    
    .button-text {
        font-size: 1.8rem;
    }
    
    .guide-text {
        font-size: 2rem;
    }
    
    .guide-subtitle {
        font-size: 1rem;
    }
}

@media (max-width: 480px) {
    .buttons-section {
        min-height: 30vh;
        margin: 0;
        padding: 1.5rem 0.8rem;
        margin-left: calc(-50vw + 50%);
        margin-right: calc(-50vw + 50%);
    }

    
    .buttons-container {
        height: 350px;
        width: 100vw;
        margin-left: calc(-50vw + 50%);
        margin-right: calc(-50vw + 50%);
    }
    
    .button-text {
        font-size: 1.8rem;
    }
    
    .guide-text {
        font-size: 1.8rem;
    }
    
    .guide-subtitle {
        font-size: 0.9rem;
    }
}
</style>
