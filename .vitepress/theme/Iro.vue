<script setup>
import { useSlots } from 'vue';
import Layout from './Layout.vue';

const slots = useSlots();
</script>

<template>
    <ClientOnly>
        <Layout>
            <template v-if="slots['iro-home-page']" v-slot:iro-home-page>
                <slot name="iro-home-page"></slot>
            </template>
            <template v-if="slots['iro-signature']" v-slot:iro-signature>
                <slot name="iro-signature"></slot>
            </template>
            <template v-if="slots['iro-not-found']" v-slot:iro-not-found>
                <slot name="iro-not-found"></slot>
            </template>
            <template v-if="slots['iro-page']" v-slot:iro-page>
                <slot name="iro-page"></slot>
            </template>
            <template v-if="slots['iro-home']" v-slot:iro-home>
                <slot name="iro-home"></slot>
            </template>
            <template v-if="slots['iro-post-list']" v-slot:iro-post-list>
                <slot name="iro-post-list"></slot>
            </template>
            <template v-if="slots['iro-post']" v-slot:iro-post>
                <slot name="iro-post"></slot>
            </template>
            <template v-if="slots['iro-other']" v-slot:iro-other>
                <slot name="iro-other"></slot>
            </template>
            <template v-if="slots['iro-footer']" v-slot:iro-footer>
                <slot name="iro-footer"></slot>
            </template>
        </Layout>
    </ClientOnly>
</template>
