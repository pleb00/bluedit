<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['passCredential']);
const callback = (response) => {
    emit('passCredential', response);
}
</script>

<template>
    <GoogleLogin :callback="callback" />
</template>