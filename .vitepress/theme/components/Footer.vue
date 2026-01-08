<script setup>
import { useData } from 'vitepress';
import { inject, ref } from 'vue';

import { data as iro } from '../iro.data';

const iroDark = inject('iroDark');

</script>

<template>
    <div class="iro-root" :class="{ 'iro-light': !iroDark, 'iro-dark': iroDark }">
        <footer class="iro-footer" :class="{ 'iro-light': !iroDark, 'iro-dark': iroDark }">
            <div class="iro-header-container">
                <div class="iro-sakura-icon">
                    <img src="/res/iro/sakura_icon.svg" draggable="false" alt="sakura icon">
                </div>
                <p v-if="iro?.footer?.beforeSlot" v-html="iro.footer.content"></p>
                <slot name="iro-footer"></slot>
                <p v-if="!iro?.footer?.beforeSlot" v-html="iro.footer.content"></p>
                <span class="iro-theme-info">
                    <a href="https://github.keqing.moe/keqingmoe/sakurairo">Theme VitePress Sakurairo</a> <a
                        href="https://me.imsuk.cn">by Suk</a>
                </span>
            </div>
        </footer>
    </div>
</template>

<style scoped lang="scss">
.iro-root {
    &.iro-light {
        --iro-var-1: transparent;
    }

    &.iro-dark {
        --iro-var-1: transparent;
    }
}

.iro-footer {
    position: relative !important;
    padding: 10px 0;
    background: var(--iro-var-1);
    transition: all 0.8s ease;
    display: block;

    font-size: 13px;
    font-weight: var(--iro-global-font-weight);

    .iro-sakura-icon {
        display: none;
    }

    :deep(a) {
        color: rgba(255, 255, 255, 0.8);

        &:hover {
            color: var(--iro-theme-skin-matching, #F9D938);
        }
    }

    :deep(p) {
        color: rgba(255, 255, 255, 0.8);
    }
}

.iro-header-container {
    margin: 0 auto;
    max-width: var(--vp-layout-max-width);
    text-align: center;
}

.iro-theme-info {
    color: rgba(255, 255, 255, 0.8);
}
</style>
