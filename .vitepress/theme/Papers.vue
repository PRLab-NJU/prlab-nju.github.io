<script>
import { data as papers } from './papers.data.js'
import { useData } from 'vitepress'
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'
import ScrollDownArrow from './components/ScrollDownArrow.vue'
import { useI18n } from './i18n/index.js'
import { locale } from './locale.js'

export default {
    setup() {
        const t = useI18n('Papers')
        return {
            t,
            locale
        }
    },
    components: {
        Nav,
        Footer,
        ScrollDownArrow
    },
    data() {
        const allPapers = papers
            .filter(paper => paper.url.endsWith('.html'))
            .map(paper => ({
                ...paper,
                year: new Date(paper.date).getFullYear().toString() || "",
            }));
        
        return {
            allPapers: allPapers,
            papers: allPapers,
            selectedYear: 'all',
            selectedTopic: 'all',
            frontmatter: useData().frontmatter
        };
    },
    computed: {
        availableYears() {
            const years = [...new Set(this.allPapers.map(paper => paper.year))];
            return years.sort((a, b) => b - a); // 从新到旧排序
        },
        availableTopics() {
            return ['Speech Technology', 'Data Intelligence', 'Embodied Intelligence', 'Generative AI', 'AI Safety', 'Medical AI','Multimodal AI'];
        },
        getTopicName() {
            return (topic) => {
                const topicMap = {
                    'Speech Technology': this.t.topicSpeechTechnology,
                    'Data Intelligence': this.t.topicDataIntelligence,
                    'Embodied Intelligence': this.t.topicEmbodiedIntelligence,
                    'Generative AI': this.t.topicGenerativeAI,
                    'AI Safety': this.t.topicAISafety,
                    'Medical AI': this.t.topicMedicalAI,
                    'Multimodal AI': this.t.topicMultimodalAI
                };
                return topicMap[topic] || topic;
            }
        }
    },
    methods: {
        formatAuthors(authors) {
            if (!authors || authors.length === 0) return '';
            if (authors.length <= 3) {
                return authors.join(', ');
            } else {
                return authors.slice(0, 3).join(', ') + ' et al.';
            }
        },
        getKeywordClass(keyword) {
            const keywordColors = {
                'Speech Technology': 'text-blue-500 border-blue-500',
                'Multimodal AI':'text-amber-500 border-amber-500' ,
                'Embodied Intelligence': 'text-cyan-400 border-cyan-400',
                'Generative AI': 'text-red-500 border-red-500',
                'AI Safety': 'text-green-500 border-green-500',
                'Medical AI': 'text-teal-500 border-teal-500',
                'Data Intelligence': 'text-purple-500 border-purple-500'
            };
            return keywordColors[keyword] || 'text-gray-500 border-gray-500';
        },
        getKeywordBgClass(keyword) {
            const keywordBgColors = {
                'Speech Technology': 'bg-blue-500',
                'Multimodal AI': 'bg-amber-500',
                'Embodied Intelligence': 'bg-cyan-400',
                'Generative AI': 'bg-red-500',
                'AI Safety': 'bg-green-500',
                'Medical AI': 'bg-teal-500',
                'Data Intelligence': 'bg-purple-500'
            };
            return keywordBgColors[keyword] || 'bg-gray-500';
        },
        filterPapers() {
            let filtered = this.allPapers;
            
            // 按年份筛选
            if (this.selectedYear !== 'all') {
                filtered = filtered.filter(paper => paper.year === this.selectedYear);
            }
            
            // 按主题筛选
            if (this.selectedTopic !== 'all') {
                filtered = filtered.filter(paper => 
                    paper.keywords && paper.keywords.includes(this.selectedTopic)
                );
            }
            
            this.papers = filtered;
        },
        selectYear(year) {
            this.selectedYear = year;
            this.filterPapers();
        },
        selectTopic(topic) {
            this.selectedTopic = topic;
            this.filterPapers();
        }
    }
}

</script>

<template>
    <header class="relative h-[100vh]"> 
        <div class="bg-container absolute inset-0">
            <div class="content-wrapper">
                <div class="text-content">
                    <h1 class="main-title" :class="{ 'chinese-font': locale.currentLang === 'zh' }">{{ t.mainTitle }}</h1>
                </div>
                <ScrollDownArrow target-selector="main" />
            </div>
        </div> 
        <Nav class="relative z-10"></Nav>
    </header>
    <main class="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-height-[100vh] pt-20 pb-16">
        <!-- Filter Section -->
        <div class="mb-8 p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">{{ t.filterTitle }}</h2>
            
            <!-- Year Filter -->
            <div class="mb-4">
                <h3 class="text-sm font-medium text-gray-700 mb-2">{{ t.filterYear }}</h3>
                <div class="flex flex-wrap gap-2">
                    <button 
                        @click="selectYear('all')"
                        :class="[
                            'px-3 py-1 rounded-full text-sm font-medium border-2 transition-colors',
                            selectedYear === 'all' 
                                ? 'bg-gray-800 text-white border-gray-800' 
                                : 'text-gray-600 border-gray-300 hover:border-gray-500'
                        ]"
                    >
                        {{ t.filterAll }}
                    </button>
                    <button 
                        v-for="year in availableYears" 
                        :key="year"
                        @click="selectYear(year)"
                        :class="[
                            'px-3 py-1 rounded-full text-sm font-medium border-2 transition-colors',
                            selectedYear === year 
                                ? 'bg-gray-800 text-white border-gray-800' 
                                : 'text-gray-600 border-gray-300 hover:border-gray-500'
                        ]"
                    >
                        {{ year }}
                    </button>
                </div>
            </div>
            
            <!-- Topic Filter -->
            <div>
                <h3 class="text-sm font-medium text-gray-700 mb-2">{{ t.filterTopic }}</h3>
                <div class="flex flex-wrap gap-2">
                    <button 
                        @click="selectTopic('all')"
                        :class="[
                            'px-3 py-1 rounded-full text-sm font-medium border-2 transition-colors',
                            selectedTopic === 'all' 
                                ? 'bg-gray-800 text-white border-gray-800' 
                                : 'text-gray-600 border-gray-300 hover:border-gray-500'
                        ]"
                    >
                        {{ t.filterAll }}
                    </button>
                    <button 
                        v-for="topic in availableTopics" 
                        :key="topic"
                        @click="selectTopic(topic)"
                        :class="[
                            'px-3 py-1 rounded-full text-sm font-medium border-2 transition-colors',
                            selectedTopic === topic 
                                ? getKeywordBgClass(topic) + ' text-white border-transparent' 
                                : getKeywordClass(topic) + ' hover:bg-opacity-10'
                        ]"
                    >
                        {{ getTopicName(topic) }}
                    </button>
                </div>
            </div>
        </div>
        
        <div class="space-y-6">
            <div v-for="paper in papers" :key="paper.title" class="bg-white rounded-lg shadow-lg overflow-hidden">
                <!-- Mobile Layout: Image centered -->
                <div class="flex flex-col md:hidden">
                    <!-- Centered Image Section -->
                    <div class="flex justify-center p-4">
                        <img 
                            :src="paper.image || '/assets/papers/default.jpg'" 
                            :alt="paper.title"
                            class="w-48 h-32 object-cover rounded-lg"
                        />
                    </div>
                    
                    <!-- Content Section -->
                    <div class="p-4 flex flex-col justify-between">
                        <div>
                            <!-- Title -->
                            <h2 class="text-lg font-bold text-gray-800 mb-2 leading-tight text-center">
                                {{ paper.title }}
                            </h2>
                            
                            <!-- Authors -->
                            <p class="text-gray-600 mb-2 text-sm text-center">
                                {{ formatAuthors(paper.authors) }}
                            </p>
                            
                            <!-- Journal and Year -->
                            <p class="text-sm text-gray-500 mb-3 text-center">
                                {{ paper.journal }}, {{ paper.year }}
                            </p>
                            
                            <!-- Keywords -->
                            <div v-if="paper.keywords && paper.keywords.length" class="flex flex-wrap gap-2 mb-3 justify-center">
                                <span 
                                    v-for="keyword in paper.keywords" 
                                    :key="keyword"
                                    :class="getKeywordClass(keyword)"
                                    class="px-3 py-1 rounded-full text-sm font-medium border-2"
                                >
                                    {{ getTopicName(keyword) }}
                                </span>
                            </div>
                        </div>
                        
                        <!-- Links -->
                        <div class="flex gap-4 flex-wrap justify-center">
                            <a v-for="linkItem in paper.link" 
                               :key="linkItem.name"
                               :href="linkItem.url" 
                               target="_blank"
                               class="text-blue-600 hover:text-blue-800 font-medium">
                                [{{ linkItem.name }}]
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- Desktop Layout: Image on left -->
                <div class="hidden md:flex flex-row">
                    <!-- Left Image Section -->
                    <div class="md:w-1/4 flex-shrink-0">
                        <img 
                            :src="paper.image || '/assets/papers/default.jpg'" 
                            :alt="paper.title"
                            class="w-full h-40 md:h-40 object-cover max-w-xs"
                        />
                    </div>
                    
                    <!-- Right Content Section -->
                    <div class="md:w-3/4 p-4 flex flex-col justify-between">
                        <div>
                            <!-- Title -->
                            <h2 class="text-lg font-bold text-gray-800 mb-2 leading-tight">
                                {{ paper.title }}
                            </h2>
                            
                            <!-- Authors -->
                            <p class="text-gray-600 mb-2 text-sm">
                                {{ formatAuthors(paper.authors) }}
                            </p>
                            
                            <!-- Journal and Year -->
                            <p class="text-sm text-gray-500 mb-3">
                                {{ paper.journal }}, {{ paper.year }}
                            </p>
                            
                            <!-- Keywords -->
                            <div v-if="paper.keywords && paper.keywords.length" class="flex flex-wrap gap-2 mb-3">
                                <span 
                                    v-for="keyword in paper.keywords" 
                                    :key="keyword"
                                    :class="getKeywordClass(keyword)"
                                    class="px-3 py-1 rounded-full text-sm font-medium border-2"
                                >
                                    {{ getTopicName(keyword) }}
                                </span>
                            </div>
                        </div>
                        
                        <!-- Links -->
                        <div class="flex gap-4 flex-wrap">
                            <a v-for="linkItem in paper.link" 
                               :key="linkItem.name"
                               :href="linkItem.url" 
                               target="_blank"
                               class="text-blue-600 hover:text-blue-800 font-medium">
                                [{{ linkItem.name }}]
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <Footer></Footer>
</template>

<style scoped>
.bg-container {
    background-image: url('/images/bg11.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow-y: auto;
}

.bg-container::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/images/bg11.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    /* filter: blur(1px); */
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
    transition: font-family 0.3s ease;
}

.main-title.chinese-font {
    font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', 'STHeiti', 'SimHei', 'WenQuanYi Micro Hei', sans-serif;
    font-weight: 600;
    letter-spacing: 0.02em;
    font-size: 3.5rem;
}

@media (min-width: 640px) {
    .main-title {
        font-size: 4rem;
    }
    .main-title.chinese-font {
        font-size: 4.5rem;
    }
}

@media (min-width: 768px) {
    .main-title {
        font-size: 5rem;
    }
    .main-title.chinese-font {
        font-size: 5.5rem;
    }
}

@media (min-width: 1024px) {
    .main-title {
        font-size: 6rem;
    }
    .main-title.chinese-font {
        font-size: 6.5rem;
    }
}
</style>