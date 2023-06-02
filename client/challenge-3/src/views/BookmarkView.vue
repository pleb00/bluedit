<script>
import { RouterLink } from 'vue-router'
import { useBookmarkStore } from '../stores/bookmark';
import { mapState, mapActions } from 'pinia';
import ContentCard from "../components/ContentCard.vue"
export default {
    name: "PostsView",
    components: {
        ContentCard
    },
    computed: {
        ...mapState(useBookmarkStore, ['bookmarks'])
    },
    methods: {
        ...mapActions(useBookmarkStore, ['fetchBookmark']),
    },
    async created() {
        this.fetchBookmark()
    }
}
</script>

<template>
    <div v-for="book in bookmarks" :key="book.id" class="p-4 rounded-xl">
        <RouterLink :to="'/details/' + book.id">
            <ContentCard :post="book.Post" />
        </RouterLink>
    </div>
</template>

<style></style>