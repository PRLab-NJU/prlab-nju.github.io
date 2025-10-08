<script>
import { useData } from 'vitepress'

export default {
    setup() {
        const { page, frontmatter } = useData()
        return {
            page,
            frontmatter
        }
    }
}

</script>

<template>
    <div class="post-container">
        <div class="prose max-w-none">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.post-container {
    @apply px-6 py-8 mx-auto;
    max-width: 1200px;
}

@media (min-width: 768px) {
    .post-container {
        @apply px-8 py-12;
    }
}

@media (min-width: 1024px) {
    .post-container {
        @apply px-12 py-16;
    }
}
</style>