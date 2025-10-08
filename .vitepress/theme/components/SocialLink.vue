<script>
export default {
    props: {
        icon: String,
        link: String,
    },
    data() {
        return {
            showNotification: false
        };
    },
    computed: {
        svg() {
            if (this.icon === 'google-scholar' || this.icon === 'scholar') {
                return `<svg class="w-5 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: scaleY(0.9);">
                    <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
                </svg>`;
            }
            return `<span class="i-social-${this.icon}" />`;
        },
    },
    methods: {
        handleClick() {
            if (this.icon === 'email') {
                navigator.clipboard.writeText(this.link).then(() => {
                    this.showNotification = true;
                    setTimeout(() => {
                        this.showNotification = false;
                    }, 1000);
                }, (err) => {
                    console.error('Failed to copy email: ', err);
                });
            } else {
                window.open(this.link, '_blank', 'noopener');
            }
        },
    }
}
</script>

<template>
    <transition name="fade">
        <div v-if="showNotification"
            class="fixed top-2 left-1/2 transform -translate-x-1/2 border-2 border-custom-orange bg-white text-custom-purple text-center py-2 px-4 rounded-lg z-50">
            Email address copied to clipboard!
        </div>
    </transition>
    <div @click.stop="handleClick"
        class="flex justify-center items-center w-9 h-9 text-gray-600 transition-color duration-500 hover:text-custom-purple hover:duration-300"
        v-html="svg">
    </div>
</template>

<style>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>