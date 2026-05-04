<script setup>
import { useSlots } from 'vue';
import Cover from './Cover.vue';
import PostList from './PostList.vue';

import { data as iro } from '../../iro.data';

const slots = useSlots();
const showHomeContent = iro.home?.showContent ?? true;
const showPostList = iro.home?.showPostList ?? false;

</script>

<template>
    <Cover>
        <template v-if="slots['iro-signature']" v-slot:iro-signature>
            <slot name="iro-signature"></slot>
        </template>
    </Cover>
    <slot v-if="showHomeContent" name="iro-home-page">
        <Content />
    </slot>
    <slot v-if="showPostList" name="iro-post-list">
        <PostList></PostList>
    </slot>
</template>

<style scoped lang="scss"></style>
