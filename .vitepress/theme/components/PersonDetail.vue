<script>
export default {
    props: {
        member: {
            type: Object,
            required: true
        }
    },
    methods: {
        handleImageError(event) {
            // 如果图片加载失败，替换为默认头像
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
                Back to Team
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
                                :src="getMemberImage(member)" 
                                :alt="member.name" 
                                class="w-full h-full object-cover"
                                @error="handleImageError"
                            />
                        </div>
                    </div>
                    
                    <!-- Text Section -->
                    <div class="flex-1 text-center lg:text-left">
                        <h1 class="text-4xl font-bold text-gray-900 mb-2">
                            {{ member.name }}
                        </h1>
                        <h2 class="text-xl text-gray-600 mb-6">
                            {{ member.title }}
                        </h2>
                        
                        <!-- Contact Information as Text -->
                        <div class="space-y-2 text-left">
                            <!-- Online Links (excluding email) -->
                            <div v-if="member.links" class="space-y-2">
                                <div v-for="{ link, icon } in member.links" :key="link" class="flex items-center">
                                    <span v-if="icon !== 'email'" class="font-medium text-gray-700 w-20">
                                        <span v-if="icon === 'scholar'">Scholar:</span>
                                        <span v-else-if="icon === 'website'">Website:</span>
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
                            <div v-if="member.emails && member.emails.length > 0" class="space-y-2">
                                <div v-for="(email, index) in member.emails" :key="index" class="flex items-center">
                                    <span class="font-medium text-gray-700 w-20">
                                        {{ member.emails.length > 1 ? `Email ${index + 1}:` : 'Email:' }}
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
                            <div v-else-if="member.links && member.links.some(link => link.icon === 'email')" class="space-y-2">
                                <div v-for="{ link, icon } in member.links" :key="link" class="flex items-center">
                                    <span v-if="icon === 'email'" class="font-medium text-gray-700 w-20">Email:</span>
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
                            <div v-if="member.phone" class="flex items-center">
                                <span class="font-medium text-gray-700 w-20">Phone:</span>
                                <span class="text-gray-600">{{ member.phone }}</span>
                            </div>
                            
                            <!-- Office -->
                            <div v-if="member.office" class="flex items-center">
                                <span class="font-medium text-gray-700 w-20">Office:</span>
                                <span class="text-gray-600">{{ member.office }}</span>
                            </div>
                            
                            <!-- Address -->
                            <div v-if="member.address" class="flex items-start">
                                <span class="font-medium text-gray-700 w-20">Address:</span>
                                <span class="text-gray-600 flex-1">{{ member.address }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

                <!-- Biography Section -->
                <div v-if="member.biography" class="bg-white rounded-lg shadow-lg p-8">
                    <h3 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                        <svg class="w-6 h-6 mr-2 text-[#6a005f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Biography
                    </h3>
                    <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        <div v-html="member.biography"></div>
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
