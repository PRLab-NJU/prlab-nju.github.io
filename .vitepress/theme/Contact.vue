<script>
import { data as contacts } from './contact.data.js';
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
            contacts: this.sortContactsByDate(contacts)
        };
    },
    methods: {
        sortContactsByDate(contacts) {
            return contacts.sort((a, b) => {
                // 将日期字符串转换为Date对象进行比较
                const dateA = new Date(a['update-date']);
                const dateB = new Date(b['update-date']);
                // 最新的日期在前
                return dateB - dateA;
            });
        },
        getRecruitmentLink(contact) {
            if (contact.recruitmentLink) {
                return contact.recruitmentLink;
            }
            return contact.url;
        },
        openRecruitmentLink(contact) {
            const link = this.getRecruitmentLink(contact);
            if (link) {
                window.open(link, '_blank');
            }
        }
    }
}

</script>

<template>
    <header class="relative h-[100vh]"> 
        <div class="bg-container absolute inset-0">
            <div class="content-wrapper">
                <div class="text-content">
                    <h1 class="main-title">Contact</h1>
                </div>
                <ScrollDownArrow target-selector="main" />
            </div>
        </div> 
        <Nav class="relative z-10"></Nav>
    </header>
    <main class="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-5xl xl:px-0 min-height-[100vh] pt-20">
        <!-- Welcome Information -->
        <section class="mb-12">
            <div class="bg-white rounded-lg shadow-lg p-8">
                <h2 class="text-3xl font-bold text-gray-800 mb-4">Welcome to Contact Us</h2>
                <p class="text-lg text-gray-600 leading-relaxed">
                    NJU PRLab always welcomes faculty and students to contact us for academic exchange. 
                    We are dedicated to research in artificial intelligence and related fields, 
                    and welcome researchers interested in relevant areas to contact us for academic discussions and collaborative research.
                </p>
            </div>
        </section>

        <!-- Faculty Enrollment Information -->
        <section class="mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-8">Open Positions</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div 
                    v-for="contact in contacts" 
                    :key="contact.name"
                    class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                    @click="openRecruitmentLink(contact)"
                >
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ contact.name }}</h3>
                    <div class="space-y-3">
                        <div class="flex items-center">
                            <svg class="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <span class="text-gray-600">{{ contact['update-date'] }}</span>
                        </div>
                        <div class="flex items-center">
                            <svg class="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            <span class="text-gray-600">{{ contact['target-student'] }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <Footer></Footer>
</template>

<style scoped>
.bg-container {
    background-image: url('/images/bg6.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow-y: auto;
}

.bg-container::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/images/bg13.jpg');
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