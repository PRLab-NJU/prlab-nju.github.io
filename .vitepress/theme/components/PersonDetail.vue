<script>
import { useI18n } from '../i18n/index.js'
import { locale } from '../locale.js'

export default {
    props: {
        member: {
            type: Object,
            required: true
        }
    },
    setup() {
        const t = useI18n('PersonDetail')
        return {
            t,
            locale
        }
    },
    computed: {
        localizedMember() {
            const lang = this.locale.currentLang
            const bilingualFields = ['name', 'title', 'address', 'office', 'biography']
            const localized = { ...this.member }

            bilingualFields.forEach((field) => {
                const value = localized[field]
                if (value && typeof value === 'object' && !Array.isArray(value)) {
                    if (value.en !== undefined || value.zh !== undefined) {
                        localized[field] = value[lang] || value.en || value.zh || ''
                    }
                }
            })

            return localized
        }
    },
    methods: {
        handleImageError(event) {
            event.target.src = '/assets/people/scholar.png';
        },
        getMemberImage(member) {
            return member.image || '/assets/people/scholar.png';
        }
    }
}
</script>

<template>
    <div class="person-detail-container">
        <!-- Back Button -->
        <div class="mb-8">
            <button 
                @click="$emit('back')"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6a005f] transition-colors"
            >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                {{ t.backToTeam }}
            </button>
        </div>

        <!-- Person Header -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div class="px-8 py-12">
                <div class="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                    <!-- Image Section -->
                    <div class="flex-shrink-0">
                        <div class="w-48 h-60 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                            <img 
                                :src="getMemberImage(localizedMember)" 
                                :alt="localizedMember.name" 
                                class="w-full h-full object-cover"
                                @error="handleImageError"
                            />
                        </div>
                    </div>
                    
                    <!-- Text Section -->
                    <div class="flex-1 text-center lg:text-left">
                        <h1 class="text-4xl font-bold text-gray-900 mb-2">
                            {{ localizedMember.name }}
                        </h1>
                        <h2 class="text-xl text-gray-600 mb-6">
                            {{ localizedMember.title }}
                        </h2>
                        
                        <!-- Contact Information as Text -->
                        <div class="space-y-2 text-left">
                            <!-- Online Links (excluding email) -->
                            <div v-if="localizedMember.links" class="space-y-2">
                                <div v-for="{ link, icon } in localizedMember.links" :key="link" class="flex items-center">
                                    <span v-if="icon !== 'email'" class="font-medium text-gray-700 w-20">
                                        <span v-if="icon === 'scholar'">{{ t.scholar }}:</span>
                                        <span v-else-if="icon === 'website'">{{ t.website }}:</span>
                                        <span v-else>{{ icon }}:</span>
                                    </span>
                                    <a 
                                        v-if="icon !== 'email'"
                                        :href="link" 
                                        class="text-[#6a005f] hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {{ link }}
                                    </a>
                                </div>
                            </div>
                            
                            <!-- Multiple Emails (priority) -->
                            <div v-if="localizedMember.emails && localizedMember.emails.length > 0" class="space-y-2">
                                <div v-for="(email, index) in localizedMember.emails" :key="index" class="flex items-center">
                                    <span class="font-medium text-gray-700 w-20">
                                        {{ localizedMember.emails.length > 1 ? `${t.email} ${index + 1}:` : `${t.email}:` }}
                                    </span>
                                    <a 
                                        :href="`mailto:${email}`" 
                                        class="text-[#6a005f] hover:underline"
                                    >
                                        {{ email }}
                                    </a>
                                </div>
                            </div>
                            
                            <!-- Single Email from links (fallback) -->
                            <div v-else-if="localizedMember.links && localizedMember.links.some(link => link.icon === 'email')" class="space-y-2">
                                <div v-for="{ link, icon } in localizedMember.links" :key="link" class="flex items-center">
                                    <span v-if="icon === 'email'" class="font-medium text-gray-700 w-20">{{ t.email }}:</span>
                                    <a 
                                        v-if="icon === 'email'"
                                        :href="`mailto:${link}`" 
                                        class="text-[#6a005f] hover:underline"
                                    >
                                        {{ link }}
                                    </a>
                                </div>
                            </div>
                            
                            <!-- Phone -->
                            <div v-if="localizedMember.phone" class="flex items-center">
                                <span class="font-medium text-gray-700 w-20">{{ t.phone }}:</span>
                                <span class="text-gray-600">{{ localizedMember.phone }}</span>
                            </div>
                            
                            <!-- Office -->
                            <div v-if="localizedMember.office" class="flex items-center">
                                <span class="font-medium text-gray-700 w-20">{{ t.office }}:</span>
                                <span class="text-gray-600">{{ localizedMember.office }}</span>
                            </div>
                            
                            <!-- Address -->
                            <div v-if="localizedMember.address" class="flex items-start">
                                <span class="font-medium text-gray-700 w-20">{{ t.address }}:</span>
                                <span class="text-gray-600 flex-1">{{ localizedMember.address }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

                <!-- Biography Section -->
        <div v-if="localizedMember.biography" class="bg-white rounded-lg shadow-lg p-8 mb-10">
            <h3 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <svg class="w-6 h-6 mr-2 text-[#6a005f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {{ t.biography }}
            </h3>
            <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <div v-html="localizedMember.biography"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.prose {
    color: #374151;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
    color: #111827;
    font-weight: 600;
}

.prose a {
    color: #6a005f;
    text-decoration: none;
}

.prose a:hover {
    text-decoration: underline;
}

.prose ul, .prose ol {
    padding-left: 1.5rem;
}

.prose li {
    margin: 0.5rem 0;
}

.prose blockquote {
    border-left: 4px solid #6a005f;
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: #6b7280;
}
</style>
