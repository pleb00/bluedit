<script>
import { RouterLink } from 'vue-router'
import { useDetailStore } from '../stores/posts';
import { mapState, mapActions } from 'pinia';
import Swal from 'sweetalert2'

export default {
    name: "DetailsView",
    computed: {
        ...mapState(useDetailStore, ['postById'])
    },
    methods: {
        ...mapActions(useDetailStore, ['fetchDetails']),
        showQrCode() {
            Swal.fire({
                html:
                    '<div class="flex justify-center items-center">' +
                    `<svg height="400" width="400">${this.postById.qrCode}</svg>` +
                    '</div>',
            })
        }
    },
    async created() {
        this.fetchDetails(this.$route.params.id)
    }
}
</script>

<template>
    <div class="flex justify-center">
        <div class="card w-max h-max bg-base-100 shadow-xl max-w-5xl max-h-5xl">
            <div class="flex justify-center">
                <div class="artboard artboard-horizontal phone-3">
                    <div class="flex justify-center m-5">
                        <img :src="postById.imgUrl" alt="loading" class="rounded-xl  max-h-7xl h-96" />
                    </div>
                </div>
            </div>

            <div class="card-body items-center text-center">
                <h2 class="card-title">{{ postById.title }}</h2>
                <p>{{ postById.content }}</p>
                <div class="card-actions">
                    <button class="btn btn-primary" @click="showQrCode">SHARE</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<style></style>