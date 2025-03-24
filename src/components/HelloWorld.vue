<script setup lang="ts">
import { ref } from 'vue';
import Button from 'primevue/button';
import Card from 'primevue/card';

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
    <h1 class="text-4xl font-bold mb-4">{{ msg }}</h1>

    <Card class="mb-4">
        <template #content>
            <Button 
                label="count is" 
                @click="count++"
                icon="pi pi-plus" 
                severity="primary" 
                class="mb-3"
            >
                <span class="ml-2">{{ count }}</span>
            </Button>
            <p>
                Edit
                <code>components/HelloWorld.vue</code> to test HMR
            </p>
        </template>
    </Card>

    <p class="mb-2">
        Check out
        <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank" class="text-primary">create-vue</a>, the
        official Vue + Vite starter
    </p>
    <p class="mb-2">
        Learn more about IDE Support for Vue in the
        <a href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank" class="text-primary">Vue Docs Scaling up Guide</a>.
    </p>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
.text-primary {
    color: var(--primary-color);
}
</style>
