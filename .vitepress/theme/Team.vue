<script>
import { data as people } from './people.data.js';
import TeamMembers from './components/TeamMembers.vue';
import SocialLink from './components/SocialLink.vue';
import Alumni from './Alumni.vue';
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'
import ScrollDownArrow from './components/ScrollDownArrow.vue'

export default {
    components: {
        TeamMembers,
        SocialLink,
        Alumni,
        Nav,
        Footer,
        ScrollDownArrow
    },
    data() {
        const categorizedData = this.categorizeMembers(people);
        return {
            categories: this.getOrderedCategories(categorizedData),
            membersByCategory: categorizedData,
            activeTab: 'team'
        };
    },
    methods: {
        categorizeMembers(people) {
            const result = people
                .filter(person => person.url.endsWith('.html'))
                .reduce((acc, person) => {
                    // 直接使用category字段，不再合并
                    if (!acc[person.category]) {
                        acc[person.category] = [];
                    }
                    acc[person.category].push(person);
                    return acc;
                }, {});
            
            // 对Fulltime Faculty类别中的成员进行排序
            if (result['Fulltime Faculty']) {
                result['Fulltime Faculty'] = this.sortFacultyMembers(result['Fulltime Faculty']);
            }
            
            // 对Adjunct Faculty类别中的成员进行排序
            if (result['Adjunct Faculty']) {
                result['Adjunct Faculty'] = this.sortAdjunctFacultyMembers(result['Adjunct Faculty']);
            }
            
            // 对学生类别中的成员进行排序
            if (result['Student']) {
                result['Student'] = this.sortStudentMembers(result['Student']);
            }
            
            return result;
        },
        sortFacultyMembers(facultyMembers) {
            const rankOrder = {
                'Professor': 1,
                'Associate Professor': 2,
                'Assistant Professor': 3,
            };
            
            return facultyMembers.sort((a, b) => {
                // 首先按title中的职位排序
                const rankA = rankOrder[a.title] || 999;
                const rankB = rankOrder[b.title] || 999;
                
                if (rankA !== rankB) {
                    return rankA - rankB;
                }
                
                // 职位相同时按姓名排序
                return a.name.localeCompare(b.name);
            });
        },
        sortStudentMembers(studentMembers) {
            const rankOrder = {
                'Doctoral Student': 1,
                'Master Student': 2
            };
            
            return studentMembers.sort((a, b) => {
                // 首先按title中的学位排序（博士在前）
                const rankA = rankOrder[a.title] || 999;
                const rankB = rankOrder[b.title] || 999;
                
                if (rankA !== rankB) {
                    return rankA - rankB;
                }
                
                // 学位相同时按姓名排序
                return a.name.localeCompare(b.name);
            });
        },
        sortAdjunctFacultyMembers(adjunctFacultyMembers) {
            // 定义Adjunct Faculty的固定排序顺序
            const customOrder = [
                'Zhaoxiang Zhang',
                'Liang Wang', 
                'Zhenan Sun',
                'Ran He',
                'Jing Dong',
                'Yan Huang'
            ];
            
            return adjunctFacultyMembers.sort((a, b) => {
                const indexA = customOrder.indexOf(a.name);
                const indexB = customOrder.indexOf(b.name);
                
                // 如果两个名字都在自定义顺序中，按自定义顺序排序
                if (indexA !== -1 && indexB !== -1) {
                    return indexA - indexB;
                }
                
                // 如果只有一个名字在自定义顺序中，优先显示
                if (indexA !== -1) return -1;
                if (indexB !== -1) return 1;
                
                // 如果都不在自定义顺序中，按姓名排序
                return a.name.localeCompare(b.name);
            });
        },
        getOrderedCategories(categorizedData) {
            const categoryOrder = [
                'Principal Investigator',
                'Fulltime Faculty',
                'Adjunct Faculty',
                'Student',
                'Research Assistant',
                'Management Team'
            ];
            
            const orderedCategories = [];
            const otherCategories = [];
            
            categoryOrder.forEach(category => {
                if (categorizedData[category]) {
                    orderedCategories.push(category);
                }
            });
            
            Object.keys(categorizedData).forEach(category => {
                if (!categoryOrder.includes(category)) {
                    otherCategories.push(category);
                }
            });
            
            return [...orderedCategories, ...otherCategories.sort()];
        },
        isFacultyCategory(category) {
            const facultyCategories = [
                'Principal Investigator'
            ];
            return facultyCategories.includes(category);
        },
        switchTab(tab) {
            this.activeTab = tab;
        }
    }
}
</script>

<template>
    <header class="relative h-[100vh]"> 
        <div class="bg-container absolute inset-0">
            <div class="content-wrapper">
                <div class="text-content">
                    <h1 class="main-title">Team</h1>
                </div>
                <ScrollDownArrow target-selector="main" />
            </div>
        </div> 
        <Nav class="relative z-10"></Nav>
    </header>
    <main class="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-5xl xl:px-0 min-height-[100vh] pt-20">
        <div>
            <div class="pt-6 pb-8 space-y-2 md:space-y-5">
                <h1
                    class="text-3xl leading-9 font-bold text-gray-800 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                    Team
                </h1>
            </div>
            
            <!-- Tab Navigation -->
            <div class="flex border-b border-gray-200 mb-8">
                <button 
                    @click="switchTab('team')"
                    :class="[
                        'px-6 py-3 text-sm font-medium border-b-2 transition-colors',
                        activeTab === 'team' 
                            ? 'border-[#6a005f] text-[#6a005f]' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    ]"
                >
                    Current Team
                </button>
                <button 
                    @click="switchTab('alumni')"
                    :class="[
                        'px-6 py-3 text-sm font-medium border-b-2 transition-colors',
                        activeTab === 'alumni' 
                            ? 'border-[#6a005f] text-[#6a005f]' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    ]"
                >
                    Alumni
                </button>
            </div>
            
            <!-- Team Content -->
            <div v-if="activeTab === 'team'">
                <div v-for="category in categories" :key="category" class="category-section my-6">
                    <div class="pt-6 pb-8 space-y-2 md:space-y-5">
                        <h1
                            class="text-xl leading-9 font-bold text-gray-800 tracking-tight text-center md:text-left sm:text-2xl sm:leading-10 md:text-4xl md:leading-14">
                            {{ category }}
                        </h1>
                    </div>
                    
                    <!-- Faculty Members with special layout -->
                    <div v-if="isFacultyCategory(category)" class="space-y-8">
                        <div v-for="member in membersByCategory[category]" :key="member.name" class="faculty-section">
                            <div class="flex flex-col md:flex-row items-start gap-6">
                                <!-- Image Section -->
                                <div class="w-48 flex-shrink-0">
                                    <img 
                                        :src="member.image || '/assets/people/default.jpg'" 
                                        :alt="member.name" 
                                        class="w-48 h-60 object-cover rounded-lg shadow-lg"
                                    />
                                    <!-- Social Links -->
                                    <div v-if="member.links" class="flex justify-center gap-2 mt-4">
                                        <SocialLink v-for="{ link, icon } in member.links" :key="link" :icon="icon" :link="link" />
                                    </div>
                                </div>
                                <!-- Text Section -->
                                <div class="flex-1 space-y-4">
                                    <h2 class="text-2xl font-bold text-gray-800">{{ member.name }}</h2>
                                    <p v-if="member.briefIntro" class="text-gray-600 text-lg leading-relaxed">
                                        {{ member.briefIntro }}
                                    </p>
                                    <div class="text-gray-700 leading-relaxed">
                                        <div v-html="member.desc"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Other categories with TeamMembers component -->
                    <TeamMembers 
                        v-else
                        :members="membersByCategory[category]"
                        v-if="membersByCategory[category] && membersByCategory[category].length"
                    />
                </div>
            </div>
            
            <!-- Alumni Content -->
            <div v-if="activeTab === 'alumni'">
                <Alumni />
            </div>
        </div>
    </main>
    <Footer></Footer>
</template>

<style scoped>
.bg-container {
    background-image: url('/images/bg4.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow-y: auto;
}

.bg-container::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/images/bg14.jpg');
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
</style>