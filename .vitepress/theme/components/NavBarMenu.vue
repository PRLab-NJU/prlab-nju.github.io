<script>
import { ref, computed, watch } from 'vue';
import { useData } from 'vitepress';
import NavBarMenuItem from './NavBarMenuItem.vue';

export default {
    components: {
        NavBarMenuItem
    },
    setup() {
        const { page } = useData();
        const currentPath = ref(page.value.relativePath);

        watch(() => page.value.relativePath, (newPath) => {
            currentPath.value = newPath;
        });

        const menuItems = computed(() => [
            { text: 'PRLab', href: '/', active: currentPath.value === 'index.md' || currentPath.value === '' },
            { text: 'Home', href: '/nju/', active: currentPath.value.startsWith('/nju/') && !currentPath.value.startsWith('/nju/research/') && !currentPath.value.startsWith('/nju/people/') && !currentPath.value.startsWith('/nju/papers/') && !currentPath.value.startsWith('/nju/contact/') },
            { text: 'Research', href: '/nju/research/', active: currentPath.value.startsWith('/nju/research/') },
            { text: 'Team', href: '/nju/people/', active: currentPath.value.startsWith('/nju/people/') },
            { text: 'Papers', href: '/nju/papers/', active: currentPath.value.startsWith('/nju/papers/') },
            { text: 'Contact', href: '/nju/contact/', active: currentPath.value.startsWith('/nju/contact/') },
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