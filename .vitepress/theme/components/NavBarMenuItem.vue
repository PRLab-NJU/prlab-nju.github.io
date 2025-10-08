<script>
export default {
    props: {
        item: {
            type: Object,
            required: true
        },
        isActive: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClick() {
            this.$emit('item-clicked');
        }
    }
}
</script>

<template>
    <a :href="item.href" 
       :target="item.external ? '_blank' : undefined"
       :rel="item.external ? 'noopener noreferrer' : undefined"
       :class="{ 'text-custom-purple': isActive, 'text-white md:text-white text-gray-800': !isActive }" 
       @click="handleClick"
       class="text-xl md:text-lg px-4 py-4 md:py-2 flex items-center justify-center md:flex-none md:items-stretch md:justify-start">
        {{ item.text }}
    </a>
</template>

<style scoped>
a {
    text-decoration: none !important;
    font-family: 'Poppins', sans-serif !important;
    font-weight: 500 !important;
    letter-spacing: 0.025em !important;
    transition: all 0.3s ease !important;
}

a:hover {
    transform: translateY(-2px) !important;
    color: rgba(255, 255, 255, 0.8) !important;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
}
</style>