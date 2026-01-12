<script>
import { data as people } from './people.data.js';
import TeamMembers from './components/TeamMembers.vue';
import SocialLink from './components/SocialLink.vue';
import PersonDetail from './components/PersonDetail.vue';
import Alumni from './Alumni.vue';
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'
import ScrollDownArrow from './components/ScrollDownArrow.vue'
import { useI18n } from './i18n/index.js'
import { locale } from './locale.js'

export default {
    setup() {
        const t = useI18n('Team')
        return {
            t,
            locale
        }
    },
    components: {
        TeamMembers,
        SocialLink,
        PersonDetail,
        Alumni,
        Nav,
        Footer,
        ScrollDownArrow
    },
    data() {
        return {
            rawPeople: people,
            activeTab: 'faculty',
            selectedMember: null,
            showPersonDetail: false,
            savedScrollPosition: 0
        };
    },
    computed: {
        localizedPeople() {
            const lang = this.locale.currentLang;
            return this.rawPeople.map(person => {
                const localized = { ...person };
                const bilingualFields = ['name', 'title', 'desc', 'briefIntro', 'biography', 'address', 'office'];
                bilingualFields.forEach(field => {
                    if (localized[field] && typeof localized[field] === 'object' && !Array.isArray(localized[field])) {
                        if (localized[field].en !== undefined || localized[field].zh !== undefined) {
                            // 保存英文名字用于排序
                            if (field === 'name' && localized[field].en) {
                                localized.nameEn = localized[field].en;
                            }
                            // 保存英文标题用于分类
                            if (field === 'title' && localized[field].en) {
                                localized.titleEn = localized[field].en;
                            }
                            localized[field] = localized[field][lang] || localized[field].en || localized[field].zh || '';
                        }
                    }
                });
                // 如果 name 字段已经是字符串（没有双语结构），也设置 nameEn 用于排序
                if (!localized.nameEn && typeof localized.name === 'string') {
                    localized.nameEn = localized.name;
                }
                // 如果 title 字段已经是字符串（没有双语结构），也设置 titleEn 用于分类
                if (!localized.titleEn && typeof localized.title === 'string') {
                    localized.titleEn = localized.title;
                }
                return localized;
            });
        },
        membersByCategory() {
            return this.categorizeMembers(this.localizedPeople);
        },
        categories() {
            return this.getOrderedCategories(this.membersByCategory);
        },
        facultyCategories() {
            const facultyCategoryOrder = [
                'Principal Investigator',
                'Fulltime Faculty',
                'Adjunct Faculty',
                'Research Assistant',
                'Management Team'
            ];
            
            return facultyCategoryOrder.filter(category => this.membersByCategory[category]);
        },
        studentCategories() {
            const studentCategoryOrder = [
                'Doctoral Student',
                'Master Student'
            ];
            
            return studentCategoryOrder.filter(category => this.membersByCategory[category]);
        },
        getCategoryName() {
            return (category) => {
                const categoryMap = {
                    'Principal Investigator': this.t.categoryPrincipalInvestigator,
                    'Fulltime Faculty': this.t.categoryFulltimeFaculty,
                    'Adjunct Faculty': this.t.categoryAdjunctFaculty,
                    'Doctoral Student': this.t.categoryDoctoralStudent,
                    'Master Student': this.t.categoryMasterStudent,
                    'Research Assistant': this.t.categoryResearchAssistant,
                    'Management Team': this.t.categoryManagementTeam
                };
                return categoryMap[category] || category;
            }
        }
    },
    methods: {
        categorizeMembers(people) {
            const result = people
                .filter(person => person.url.endsWith('.html'))
                .reduce((acc, person) => {
                    if (person.category === 'Student') {
                        const titleEn = person.titleEn || person.title;
                        const titleCurrent = person.title;
                        const isDoctoral = titleEn === 'Doctoral Student' || 
                                         titleCurrent === 'Doctoral Student' ||
                                         titleCurrent === '博士研究生';
                        const studentCategory = isDoctoral ? 'Doctoral Student' : 'Master Student';
                        if (!acc[studentCategory]) {
                            acc[studentCategory] = [];
                        }
                        acc[studentCategory].push(person);
                    } else {
                        if (!acc[person.category]) {
                            acc[person.category] = [];
                        }
                        acc[person.category].push(person);
                    }
                    return acc;
                }, {});
            
            if (result['Fulltime Faculty']) {
                result['Fulltime Faculty'] = this.sortFacultyMembers(result['Fulltime Faculty']);
            }
            
            if (result['Adjunct Faculty']) {
                result['Adjunct Faculty'] = this.sortAdjunctFacultyMembers(result['Adjunct Faculty']);
            }
            
            if (result['Doctoral Student']) {
                result['Doctoral Student'] = this.sortStudentMembers(result['Doctoral Student']);
            }
            
            if (result['Master Student']) {
                result['Master Student'] = this.sortStudentMembers(result['Master Student']);
            }
            
            return result;
        },
        sortFacultyMembers(facultyMembers) {
            const customOrder = [
                'Caifeng Shan',
                'Fang Zhao',
                'Ke Xu',
                'Shuai Wang',
                'Yanbo Fan',
                'Yuqi Fang',
                'Chenyang Si',
                'Yueming Lv',
                'Chaoyou Fu'
            ];
            
            return facultyMembers.sort((a, b) => {
                const nameA = a.nameEn || a.name;
                const nameB = b.nameEn || b.name;
                
                const indexA = customOrder.indexOf(nameA);
                const indexB = customOrder.indexOf(nameB);
                
                if (indexA !== -1 && indexB !== -1) {
                    return indexA - indexB;
                }
                
                if (indexA !== -1) return -1;
                if (indexB !== -1) return 1;
                
                return nameA.localeCompare(nameB);
            });
        },
        sortStudentMembers(studentMembers) {
            return studentMembers.sort((a, b) => {
                const nameA = a.nameEn || a.name;
                const nameB = b.nameEn || b.name;
                return nameA.localeCompare(nameB);
            });
        },
        sortAdjunctFacultyMembers(adjunctFacultyMembers) {
            const customOrder = [
                'Zhaoxiang Zhang',
                'Liang Wang', 
                'Zhenan Sun',
                'Ran He',
                'Jing Dong',
                'Yan Huang'
            ];
            
            return adjunctFacultyMembers.sort((a, b) => {
                const nameA = a.nameEn || a.name;
                const nameB = b.nameEn || b.name;
                
                const indexA = customOrder.indexOf(nameA);
                const indexB = customOrder.indexOf(nameB);
                
                if (indexA !== -1 && indexB !== -1) {
                    return indexA - indexB;
                }
                
                if (indexA !== -1) return -1;
                if (indexB !== -1) return 1;
                
                return nameA.localeCompare(nameB);
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
        },
        getMemberImage(member) {
            return member.image || '/assets/people/scholar.png';
        },
        handleImageError(event) {
            event.target.src = '/assets/people/scholar.png';
        },
        goToPersonPage(member) {
            this.savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            this.selectedMember = member;
            this.showPersonDetail = true;
            this.$nextTick(() => {
                const mainElement = document.querySelector('main');
                if (mainElement) {
                    mainElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        },
        backToTeam() {
            // 返回团队页面
            this.showPersonDetail = false;
            this.selectedMember = null;
            // 恢复滚动位置
            this.$nextTick(() => {
                window.scrollTo(0, this.savedScrollPosition);
            });
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
    <main class="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-5xl xl:px-0 min-height-[100vh] pt-20">
        <div>
            <!-- Person Detail View -->
            <div v-if="showPersonDetail && selectedMember">
                <PersonDetail 
                    :member="selectedMember" 
                    @back="backToTeam"
                />
            </div>
            
            <!-- Team List View -->
            <div v-else>
                <div class="pt-6 pb-8 space-y-2 md:space-y-5">
                    <h1
                        class="text-3xl leading-9 font-bold text-gray-800 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        {{ t.pageTitle }}
                    </h1>
                </div>
                
                <!-- Tab Navigation -->
                <div class="flex border-b border-gray-200 mb-8">
                    <button 
                        @click="switchTab('faculty')"
                        :class="[
                            'px-6 py-3 text-sm font-medium border-b-2 transition-colors',
                            activeTab === 'faculty' 
                                ? 'border-[#6a005f] text-[#6a005f]' 
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        ]"
                    >
                        {{ t.tabFaculty }}
                    </button>
                    <button 
                        @click="switchTab('students')"
                        :class="[
                            'px-6 py-3 text-sm font-medium border-b-2 transition-colors',
                            activeTab === 'students' 
                                ? 'border-[#6a005f] text-[#6a005f]' 
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        ]"
                    >
                        {{ t.tabStudents }}
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
                        {{ t.tabAlumni }}
                    </button>
                </div>
                
                <div v-if="activeTab === 'faculty'">
                    <div v-for="category in facultyCategories" :key="category" class="category-section my-6">
                        <div class="pt-6 pb-8 space-y-2 md:space-y-5">
                            <h1
                                class="text-xl leading-9 font-bold text-gray-800 tracking-tight text-center md:text-left sm:text-2xl sm:leading-10 md:text-4xl md:leading-14">
                                {{ getCategoryName(category) }}
                            </h1>
                        </div>
                        
                        <div v-if="isFacultyCategory(category)" class="space-y-8">
                            <div v-for="member in membersByCategory[category]" :key="member.name" class="faculty-section">
                                <div 
                                    class="flex flex-col md:flex-row items-start gap-6 cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors"
                                    @click="goToPersonPage(member)"
                                >
                                    <div class="w-48 flex-shrink-0">
                                        <img 
                                            :src="getMemberImage(member)" 
                                            :alt="member.name" 
                                            class="w-48 h-60 object-cover rounded-lg shadow-lg"
                                            @error="handleImageError"
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
                        
                        <!-- Other faculty categories with TeamMembers component -->
                        <TeamMembers 
                            v-else-if="membersByCategory[category] && membersByCategory[category].length"
                            :members="membersByCategory[category]"
                            @member-click="goToPersonPage"
                        />
                    </div>
                </div>
                
                <!-- Students Content -->
                <div v-if="activeTab === 'students'">
                    <div v-for="category in studentCategories" :key="category" class="category-section my-6">
                        <div class="pt-6 pb-8 space-y-2 md:space-y-5">
                            <h1
                                class="text-xl leading-9 font-bold text-gray-800 tracking-tight text-center md:text-left sm:text-2xl sm:leading-10 md:text-4xl md:leading-14">
                                {{ getCategoryName(category) }}
                            </h1>
                        </div>
                        
                        <!-- Students with TeamMembers component -->
                        <TeamMembers 
                            v-if="membersByCategory[category] && membersByCategory[category].length"
                            :members="membersByCategory[category]"
                            @member-click="goToPersonPage"
                        />
                    </div>
                </div>
                
                <!-- Alumni Content -->
                <div v-if="activeTab === 'alumni'">
                    <Alumni />
                </div>
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