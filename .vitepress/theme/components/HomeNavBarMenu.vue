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
            { text: t.value.menuPRLabNJU, href: '/nju/', active: currentPath.value.startsWith('/nju/') },
            { text: t.value.menuPRLabCASIA, href: 'http://www.cripac.ia.ac.cn/CN/model/index.htm', active: false, external: true },
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