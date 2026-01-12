<script>
import { ref, computed, watch } from 'vue';
import { useData } from 'vitepress';
import NavBarMenuItem from './NavBarMenuItem.vue';
import { useI18n } from '../i18n/index.js';

export default {
    components: {
        NavBarMenuItem
    },
    setup() {
        const { page } = useData();
        const currentPath = ref(page.value.relativePath);
        const t = useI18n('NavBar');

        watch(() => page.value.relativePath, (newPath) => {
            currentPath.value = newPath;
        });

        const menuItems = computed(() => [
            { text: t.value.menuPRLab, href: '/', active: currentPath.value === 'index.md' || currentPath.value === '' },
            { text: t.value.menuHome, href: '/nju/', active: currentPath.value.startsWith('/nju/') && !currentPath.value.startsWith('/nju/research/') && !currentPath.value.startsWith('/nju/people/') && !currentPath.value.startsWith('/nju/papers/') && !currentPath.value.startsWith('/nju/contact/') },
            { text: t.value.menuResearch, href: '/nju/research/', active: currentPath.value.startsWith('/nju/research/') },
            { text: t.value.menuTeam, href: '/nju/people/', active: currentPath.value.startsWith('/nju/people/') },
            { text: t.value.menuPapers, href: '/nju/papers/', active: currentPath.value.startsWith('/nju/papers/') },
            { text: t.value.menuContact, href: '/nju/contact/', active: currentPath.value.startsWith('/nju/contact/') },
        ]);

        return { menuItems };
    },
    methods: {
        handleItemClick() {
            this.$emit('menu-item-clicked');
        }
    }
}
</script>

<template>
    <div class="flex md:flex-row flex-col">
        <NavBarMenuItem v-for="item in menuItems" :key="item.text" :item="item" :isActive="item.active"
            @item-clicked="handleItemClick" />
    </div>
</template>