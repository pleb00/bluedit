<script>
import { RouterLink } from 'vue-router'
import { usePostsStore } from '../stores/posts';
import { mapState, mapActions } from 'pinia';
import ContentCard from "../components/ContentCard.vue"
export default {
    name: "PostsView",
    data() {
        return {
            search: ""
        }
    },
    components: {
        ContentCard
    },
    computed: {
        ...mapState(usePostsStore, ['posts', 'page', 'totalPosts', 'totalPage']),
    },
    methods: {
        ...mapActions(usePostsStore, ['fetchPosts']),
    },
    async created() {
        this.fetchPosts(1)
    }
}
</script>

<template>
    <div class="flex justify-center">
        <input v-model="search" type="text" placeholder="What are you looking for exactly?"
            class="input input-bordered input-primary w-full max-w-xs" />
        <button @click="fetchPosts(1, search)" class="btn btn-active btn-primary ml-2">Search</button>
    </div>

    <div v-for="post in posts" :key="post.id" class="p-4 rounded-xl">
        <ContentCard :post="post" :display=true />
    </div>

    <div class="flex justify-center py-5">
        <div v-for="page in totalPage" :key="page.id">
            <div class="btn-group">
                <div class="px-2">
                    <button class="btn btn-md btn-ghost" @click="fetchPosts(page, null)">{{ page }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>