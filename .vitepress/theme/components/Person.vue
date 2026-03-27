<script>
import { useData } from 'vitepress'
import SocialLink from './SocialLink.vue'
import { useI18n } from '../i18n/index.js'
import { locale } from '../locale.js'

export default {
    components: {
        SocialLink
    },
    setup() {
        const { frontmatter } = useData()
        const t = useI18n('PersonDetail')

        return {
            frontmatter,
            locale,
            t
        }
    },
    methods: {
        handleImageError(event) {
            event.target.src = '/assets/people/scholar.png'
        },
        localizeField(value) {
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                if (value.en !== undefined || value.zh !== undefined) {
                    return value[this.locale.currentLang] || value.en || value.zh || ''
                }
            }
            return value
        }
    }
}
</script>

<template>
    <div :key="locale.currentLang" class="person-page max-w-4xl py-8">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div class="px-8 py-12">
                <div class="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                    <div class="flex-shrink-0">
                        <div class="w-48 h-60 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                            <img
                                :src="frontmatter.image || '/assets/people/scholar.png'"
                                :alt="localizeField(frontmatter.name)"
                                class="w-full h-full object-cover"
                                @error="handleImageError"
                            >
                        </div>
                    </div>

                    <div class="flex-1 text-center lg:text-left">
                        <h1 class="text-4xl font-bold text-gray-900 mb-2">
                            {{ localizeField(frontmatter.name) }}
                        </h1>
                        <h2 class="text-xl text-gray-600 mb-6">
                            {{ localizeField(frontmatter.title) }}
                        </h2>

                        <div v-if="frontmatter.links" class="inline-flex space-x-2 mt-1 mb-6">
                            <SocialLink
                                v-for="{ link, icon } in frontmatter.links"
                                :key="link"
                                class="inline"
                                :icon="icon"
                                :link="link"
                            />
                        </div>

                        <div class="space-y-2 text-left">
                            <div v-if="frontmatter.emails && frontmatter.emails.length > 0" class="space-y-2">
                                <div v-for="(email, index) in frontmatter.emails" :key="index" class="flex items-center">
                                    <span class="font-medium text-gray-700 w-20">
                                        {{ frontmatter.emails.length > 1 ? `${t.email} ${index + 1}:` : `${t.email}:` }}
                                    </span>
                                    <a :href="`mailto:${email}`" class="text-[#6a005f] hover:underline">
                                        {{ email }}
                                    </a>
                                </div>
                            </div>

                            <div v-else-if="frontmatter.links && frontmatter.links.some(link => link.icon === 'email')" class="space-y-2">
                                <div v-for="{ link, icon } in frontmatter.links" :key="link" class="flex items-center">
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

                            <div v-if="frontmatter.phone" class="flex items-center">
                                <span class="font-medium text-gray-700 w-20">{{ t.phone }}:</span>
                                <span class="text-gray-600">{{ frontmatter.phone }}</span>
                            </div>

                            <div v-if="frontmatter.office" class="flex items-center">
                                <span class="font-medium text-gray-700 w-20">{{ t.office }}:</span>
                                <span class="text-gray-600">{{ localizeField(frontmatter.office) }}</span>
                            </div>

                            <div v-if="frontmatter.address" class="flex items-start">
                                <span class="font-medium text-gray-700 w-20">{{ t.address }}:</span>
                                <span class="text-gray-600 flex-1">{{ localizeField(frontmatter.address) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="frontmatter.biography" :key="`biography-${locale.currentLang}`" class="bg-white rounded-lg shadow-lg p-8 mb-10">
            <h3 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <svg class="w-6 h-6 mr-2 text-[#6a005f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {{ t.biography }}
            </h3>
            <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <div v-html="localizeField(frontmatter.biography)"></div>
            </div>
        </div>

        <div class="prose">
            <slot />
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
