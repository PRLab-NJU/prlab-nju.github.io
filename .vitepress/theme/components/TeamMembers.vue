<script>
import { computed } from 'vue'
import TeamMembersItem from './TeamMembersItem.vue'

export default {
    components: {
        TeamMembersItem
    },
    props: {
        members: {
            type: Array,
            required: true
        }
    },
    computed: {
        classes() {
            return [`count-${this.members.length}`]
        }
    }
}
</script>

<template>
    <div :class="classes">
        <div class="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-4">
            <div v-for="member in members" :key="member.name" class="item">
                <TeamMembersItem :member="member" @member-click="$emit('member-click', $event)" />
            </div>
        </div>
    </div>
</template>
