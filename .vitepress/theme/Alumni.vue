<script>
import { alumni } from '../../nju/people/alumni.js';

export default {
    data() {
        const alumniByCategory = this.categorizeAlumni(alumni);
        return {
            alumniCategories: alumniByCategory
        };
    },
    methods: {
        categorizeAlumni(alumni) {
            const titles = ["Doctoral Student", "Master Student"];
            const alumniCategories = {};
            titles.forEach(title => {
                alumniCategories[title] = alumni.filter(a => a.title === title);
            });
            return alumniCategories;
        }
    }
}
</script>

<template>
    <div>
        <!-- <div class="w-full border-t border-gray-200"></div> -->
        
        <div v-for=" title in ['Doctoral Student', 'Master Student']" :key="title">
            <div class="alumni-section my-8">
                <div class="pt-8 pb-10 space-y-2 md:space-y-5">
                    <h1
                        class="text-xl leading-9 font-bold text-gray-800 tracking-tight text-center md:text-left sm:text-2xl sm:leading-10 md:text-4xl md:leading-14">
                        {{ title }}s
                    </h1>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="alum in alumniCategories[title]" :key="alum.name" class="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div class="font-bold text-lg text-gray-800 mb-2">{{ alum.name }}</div>
                        <div class="text-gray-600 text-sm mb-3">{{ alum.start }} - {{ alum.end }}</div>
                        <div v-if="alum.currentPosition" v-html="alum.currentPosition" class="text-gray-700 text-sm leading-relaxed"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
