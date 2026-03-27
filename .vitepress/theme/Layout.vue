<script setup>
import { Content, useData } from 'vitepress'
import NotFound from './NotFound.vue'
import NJU from './NJU.vue'
import Contact from './Contact.vue'
import Home from './Home.vue'
import Team from "./Team.vue";
import Papers from "./Papers.vue";
import ContentPage from './ContentPage.vue'
import Research from './Research.vue';

const { page, frontmatter } = useData()
</script>

<template>
  <div id="app" class="flex flex-col min-h-screen">
    <Home v-if="frontmatter.home" />
    <NJU v-else-if="frontmatter.nju" />
    <Papers v-else-if="frontmatter.papers" />
    <Team v-else-if="frontmatter.team" />
    <Research v-else-if="frontmatter.research" />
    <Contact v-else-if="frontmatter.contact" />
    <NotFound v-else-if="page.isNotFound" />
    <ContentPage v-else />
  </div>
</template>
