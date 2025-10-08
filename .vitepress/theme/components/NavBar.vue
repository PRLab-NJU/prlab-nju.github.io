<script>
import NavBarMenu from './NavBarMenu.vue';
import NavBarTitle from './NavBarTitle.vue';

export default {
    components: {
        NavBarMenu,
        NavBarTitle
    },
    data() {
        return {
            isMenuOpen: false,
            scrollY: 0
        };
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        closeMenu() {
            this.isMenuOpen = false;
        },
        handleScroll() {
            this.scrollY = window.scrollY;
        }
    },
    computed: {
        navbarStyle() {
            const opacity = Math.min(this.scrollY / 600, 0.99);
            return {
                backgroundColor: this.scrollY > 0 ? `rgba(0, 0, 0, ${opacity * 0.6})` : 'transparent',
                backdropFilter: this.scrollY > 0 ? 'none' : 'none',
                transition: 'all 0.3s ease'
            };
        },
        titleSectionStyle() {
            return {
                backgroundColor: 'transparent',
                transition: 'all 0.3s ease'
            };
        },
        mobileMenuStyle() {
            const opacity = Math.min(this.scrollY / 600, 0.99);
            return {
                backgroundColor: this.scrollY > 0 ? `rgba(0, 0, 0, ${opacity * 0.6})` : 'transparent',
                backdropFilter: 'none',
                transition: 'all 0.3s ease'
            };
        }
    },
    watch: {
        isMenuOpen(newValue) {
            const body = document.body;
            if (newValue) {
                body.classList.add('disable-scroll');
            } else {
                body.classList.remove('disable-scroll');
            }
        }
    }
}
</script>

<template>
    <div class="fixed top-0 left-0 right-0 z-50" :style="navbarStyle">
        <div class="flex w-full h-16 select-none justify-center items-center">
            <div class="navbar-title-section" :style="titleSectionStyle">
                <NavBarTitle @title-clicked="closeMenu" />
            </div>
            <div class="flex items-center px-2">
                <button class="flex md:hidden text-white" @click="toggleMenu">
                    <span :class="isMenuOpen ? 'i-x h-6 w-6' : 'i-menu h-6 w-6'"></span>
                </button>
                <!-- Desktop Menu -->
                <div class="hidden md:flex md:items-center">
                    <NavBarMenu @menu-item-clicked="closeMenu" />
                </div>
                
                <!-- Mobile Menu Overlay -->
                <div v-if="isMenuOpen" class="fixed inset-0 z-40 md:hidden" @click="closeMenu">
                    <div class="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>
                
                <!-- Mobile Menu -->
                <div class="md:hidden fixed top-16 left-0 right-0 z-50 transform transition-all duration-300 ease-out"
                     :class="isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'"
                     :style="mobileMenuStyle">
                    <div class="bg-transparent rounded-lg mx-4 shadow-xl overflow-hidden">
                        <NavBarMenu @menu-item-clicked="closeMenu" class="flex-col" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.disable-scroll {
    overflow: hidden;
}

.navbar-title-section {
    background-color: transparent;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    min-width: 200px;
    transition: all 0.3s ease;
    position: relative;
    z-index: 10;
    overflow: visible;
}
</style>