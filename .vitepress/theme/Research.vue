<script>
import { data as aimsData } from './research.data.js'
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'
import ScrollDownArrow from './components/ScrollDownArrow.vue'

export default {
    components: {
        Nav,
        Footer,
        ScrollDownArrow
    },
    data() {
        return {
            aims: aimsData,
        };
    },
    computed: {
        researchAim() {
            // Get the aim where aim.research is true
            return this.aims.find((aim) => aim.isAim);
        }
    }
}
</script>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const researchGrid = ref(null)
const speechCard = ref(null)
const multimodalCard = ref(null)
const embodiedCard = ref(null)
const generativeCard = ref(null)
const safetyCard = ref(null)
const medicalCard = ref(null)

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
}

let observer = null

const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in-up')
    }
  })
}

onMounted(() => {
  observer = new IntersectionObserver(handleIntersection, observerOptions)
  
  // 观察所有研究卡片
  const cards = [
    speechCard.value,
    multimodalCard.value,
    embodiedCard.value,
    generativeCard.value,
    safetyCard.value,
    medicalCard.value
  ]
  
  cards.forEach((card, index) => {
    if (card) {
      // 为每个卡片添加延迟
      card.style.animationDelay = `${index * 0.1}s`
      observer.observe(card)
    }
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
    <header class="relative h-[100vh]"> 
        <div class="bg-container absolute inset-0">
            <div class="content-wrapper">
                <div class="text-content">
                    <h1 class="main-title">Research</h1>
                </div>
                <ScrollDownArrow target-selector="main" />
            </div>
        </div> 
        <Nav class="relative z-10"></Nav>
    </header>
    <main class="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-5xl xl:px-0 min-height-[100vh] pt-20">
        <!-- Research Directions Section -->
        <div class="py-20">
            <div class="pt-6 pb-8 space-y-2 md:space-y-5">
                <h1
                    class="text-3xl leading-9 font-bold text-gray-800 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                    Our Research
                </h1>
            </div>
            <div class="w-full border-t border-gray-200"></div>
            
            <div class="pt-8 pb-8">
                <p class="text-lg text-gray-600 leading-relaxed">
                    Our laboratory focuses on six key research areas that drive innovation in artificial intelligence and computer science. We are committed to advancing the frontiers of AI through cutting-edge research and practical applications.
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20" ref="researchGrid">
                <!-- Speech Research -->
                <div class="group speech-bg rounded-lg border border-gray-200 p-8 hover:border-blue-300 hover:shadow-md transition-all duration-300 research-card" ref="speechCard">
                    <div class="border-l-4 border-blue-500 pl-6 mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">Speech Technology</h3>
                        <div class="text-sm text-blue-600 font-medium uppercase tracking-wide">Audio Processing</div>
                    </div>
                    <p class="text-gray-600 leading-relaxed">
                        Advanced speech recognition, synthesis, and processing technologies. We develop cutting-edge algorithms for natural language understanding, voice conversion, and multilingual speech systems that enable seamless human-computer interaction.
                    </p>
                </div>

                <!-- Multimodal Research -->
                <div class="group multimodal-bg rounded-lg border border-gray-200 p-8 hover:border-purple-300 hover:shadow-md transition-all duration-300 research-card" ref="multimodalCard">
                    <div class="border-l-4 border-purple-500 pl-6 mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">Multimodal AI</h3>
                        <div class="text-sm text-purple-600 font-medium uppercase tracking-wide">Cross-Modal Learning</div>
                    </div>
                    <p class="text-gray-600 leading-relaxed">
                        Integration of visual, auditory, and textual information processing. Our research spans cross-modal learning, vision-language understanding, and multimodal fusion techniques that enable AI systems to process and understand complex real-world scenarios.
                    </p>
                </div>

                <!-- Embodied AI Research -->
                <div class="group embodied-bg rounded-lg border border-gray-200 p-8 hover:border-cyan-300 hover:shadow-md transition-all duration-300 research-card" ref="embodiedCard">
                    <div class="border-l-4 border-cyan-400 pl-6 mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">Embodied Intelligence</h3>
                        <div class="text-sm text-cyan-500 font-medium uppercase tracking-wide">Robotics & Interaction</div>
                    </div>
                    <p class="text-gray-600 leading-relaxed">
                        AI systems that interact with the physical world through robotics and embodied agents. We focus on spatial reasoning, manipulation, navigation, and human-robot collaboration in real-world environments.
                    </p>
                </div>

                <!-- Generative AI Research -->
                <div class="group generative-bg rounded-lg border border-gray-200 p-8 hover:border-red-300 hover:shadow-md transition-all duration-300 research-card" ref="generativeCard">
                    <div class="border-l-4 border-red-500 pl-6 mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">Generative AI</h3>
                        <div class="text-sm text-red-600 font-medium uppercase tracking-wide">Content Creation</div>
                    </div>
                    <p class="text-gray-600 leading-relaxed">
                        Advanced generative models for content creation, including text, images, and videos. Our work encompasses large language models, diffusion models, and creative AI systems that push the boundaries of artificial creativity.
                    </p>
                </div>

                <!-- AI Safety Research -->
                <div class="group safety-bg rounded-lg border border-gray-200 p-8 hover:border-green-300 hover:shadow-md transition-all duration-300 research-card" ref="safetyCard">
                    <div class="border-l-4 border-green-500 pl-6 mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">AI Safety</h3>
                        <div class="text-sm text-green-600 font-medium uppercase tracking-wide">Trustworthy AI</div>
                    </div>
                    <p class="text-gray-600 leading-relaxed">
                        Ensuring the safety, reliability, and ethical deployment of AI systems. We research adversarial robustness, AI alignment, interpretability, and responsible AI development to build trustworthy intelligent systems.
                    </p>
                </div>

                <!-- Medical AI Research -->
                <div class="group medical-bg rounded-lg border border-gray-200 p-8 hover:border-teal-300 hover:shadow-md transition-all duration-300 research-card" ref="medicalCard">
                    <div class="border-l-4 border-teal-500 pl-6 mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">Medical AI</h3>
                        <div class="text-sm text-teal-600 font-medium uppercase tracking-wide">Healthcare Innovation</div>
                    </div>
                    <p class="text-gray-600 leading-relaxed">
                        AI applications in healthcare and medical diagnosis. Our research includes medical image analysis, drug discovery, personalized medicine, and clinical decision support systems that improve patient outcomes and healthcare delivery.
                    </p>
                </div>
            </div>
        </div>

    </main>
    <Footer></Footer>
</template>

<style scoped>
.bg-container {
    background-image: url('/images/bg16.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow-y: auto;
}

.bg-container::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/images/bg16.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(1px);
    z-index: 1;
}

.bg-container::after {
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
    height: 100vh;
    padding: 2rem;
    position: relative;
    z-index: 3;
}

.text-content {
    text-align: center;
    color: white;
}

.main-title {
    font-family: 'Poppins', sans-serif;
    font-size: 3rem;
    font-weight: 500;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    line-height: 1;
    margin-bottom: 1rem;
    letter-spacing: -0.01em;
}

@media (min-width: 640px) {
    .main-title {
        font-size: 4rem;
    }
}

@media (min-width: 768px) {
    .main-title {
        font-size: 5rem;
    }
}

@media (min-width: 1024px) {
    .main-title {
        font-size: 6rem;
    }
}

.research-aims p {
    @apply text-sm md:text-base lg:text-lg text-gray-500 mt-2 md:mt-4 lg:mt-6;
}

.research-aims img {
    @apply mx-auto md:float-left md:mr-4 my-4 max-w-sm md:max-w-md;
}

.research-aims h2 {
    @apply text-2xl md:text-3xl lg:text-4xl text-gray-600 mt-4 md:mt-6 lg:mt-12 mb-2 select-none underline font-semibold !important;
}

/* Research card backgrounds with 25% opacity */
.speech-bg {
    background-image: url('/images/research/Speech Technology.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
}

.speech-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 0.5rem;
    z-index: 1;
}

.speech-bg > * {
    position: relative;
    z-index: 2;
}

.multimodal-bg {
    background-image: url('/images/research/Multimodal AI.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
}

.multimodal-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 0.5rem;
    z-index: 1;
}

.multimodal-bg > * {
    position: relative;
    z-index: 2;
}

.embodied-bg {
    background-image: url('/images/research/Embodied Intelligence.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
}

.embodied-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 0.5rem;
    z-index: 1;
}

.embodied-bg > * {
    position: relative;
    z-index: 2;
}

.generative-bg {
    background-image: url('/images/research/Generative AI.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
}

.generative-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 0.5rem;
    z-index: 1;
}

.generative-bg > * {
    position: relative;
    z-index: 2;
}

.safety-bg {
    background-image: url('/images/research/AI Safety.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
}

.safety-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 0.5rem;
    z-index: 1;
}

.safety-bg > * {
    position: relative;
    z-index: 2;
}

.medical-bg {
    background-image: url('/images/research/Medical AI.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
}

.medical-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 0.5rem;
    z-index: 1;
}

.medical-bg > * {
    position: relative;
    z-index: 2;
}

/* Custom colors for specific research areas */
.embodied-bg .border-l-4 {
    border-left-color: #4DD0E1 !important;
}

.embodied-bg .text-cyan-500 {
    color: #4DD0E1 !important;
}

.embodied-bg:hover {
    border-color: #4DD0E1 !important;
}

/* 滚动动画样式 */
.research-card {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
}

.research-card.animate-fade-in-up {
    opacity: 1;
    transform: translateY(0);
}

/* 动画类 - 直接使用transition，无需keyframes */
</style>