<script>
import { RouterLink } from 'vue-router'
import { useBookmarkStore } from '../stores/bookmark';
import { mapState, mapActions } from 'pinia';

export default {
    name: "ContentCard",
    props: ['post', 'display'],
    methods: {
        ...mapActions(useBookmarkStore, ['addBookmark']),
        sendRequest(id) {
            this.addBookmark(id)
        },
    },
}
</script>

<template>
    <div class="card lg:card-side bg-slate-100 shadow-xl">
        <img :src="post.imgUrl" class="max-w-xs w-96" />
        <div class="card-body">
            <RouterLink :to="'/details/' + post.id">
                <h2 class="card-title hover:text-blue-500">
                    {{ post.title }}
                </h2>
            </RouterLink>
            <div class="font-bold">
                <p>{{ post.Category.name }}</p>
            </div>
            <p>{{ post.content }}</p>

            <div v-if="display === true">
                <div class="card-actions justify-end">
                    <button class="btn btn-primary" @click="sendRequest(post.id)">
                        Add to Bookmark
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>