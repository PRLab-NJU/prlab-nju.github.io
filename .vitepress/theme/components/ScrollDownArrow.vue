<template>
    <div class="scroll-arrow-container" @click="scrollToContent">
        <div class="scroll-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ScrollDownArrow',
    props: {
        targetSelector: {
            type: String,
            default: '.description-section'
        }
    },
    methods: {
        scrollToContent() {
            // 滚动到指定目标区域
            const targetSection = document.querySelector(this.targetSelector);
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // 如果没有找到目标元素，尝试滚动到下一个主要区域
                const nextSection = document.querySelector('main, .main-section, .description-section');
                if (nextSection) {
                    nextSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        }
    }
}
</script>

<style scoped>
.scroll-arrow-container {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    z-index: 15;
    transition: all 0.3s ease;
}

.scroll-arrow-container:hover {
    transform: translateX(-50%) translateY(-5px);
}

.scroll-arrow {
    width: 50px;
    height: 50px;
    border: 2px solid rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    animation: float 3s ease-in-out infinite;
    transition: all 0.3s ease;
}

.scroll-arrow:hover {
    border-color: rgba(255, 255, 255, 0.9);
    color: rgba(255, 255, 255, 1);
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
}


@keyframes float {
    0%, 100% {
        transform: translateY(0px);
        opacity: 0.8;
    }
    50% {
        transform: translateY(-10px);
        opacity: 1;
    }
}


/* 响应式设计 */
@media (max-width: 768px) {
    .scroll-arrow {
        width: 45px;
        height: 45px;
    }
}

@media (max-width: 480px) {
    .scroll-arrow {
        width: 40px;
        height: 40px;
    }
}
</style>
