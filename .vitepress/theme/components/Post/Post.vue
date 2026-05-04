<script setup>
import { computed, inject } from 'vue';

import { data as iro } from '../../iro.data';
import { useData } from 'vitepress';

const iroDark = inject('iroDark');

const { page } = useData();

const date = computed(
    () => new Date(page.value.lastUpdated)
);

</script>

<template>
    <div class="iro-post-page">
        <div class="iro-blank" style="padding-top: 75px;"></div>
        <a class="iro-post-exit" href="/" title="返回首页" aria-label="返回首页">
            <fa-i icon="fa-solid fa-arrow-left"></fa-i>
        </a>
        <div class="iro-root" :class="{ 'iro-light': !iroDark, 'iro-dark': iroDark }">
            <main class="iro-post-main">
                <article>
                    <header class="iro-post-header">
                        <h1 class="iro-post-title">
                            {{ $frontmatter.title ?? '文章' }}
                        </h1>
                        <p class="iro-post-ctime">
                            最后更新时间：
                            <time :datetime="date.toISOString()">{{ date.toLocaleString() }}</time>
                        </p>
                        <hr />
                    </header>
                    <div class="iro-post-content">
                        <slot></slot>
                    </div>
                    <div class="iro-post-footer"></div>
                </article>
            </main>
        </div>
    </div>
</template>


<style scoped lang="scss">
.iro-post-page {
    position: relative;
}

.iro-root {
    width: min(860px, 100%);
    padding: 0 26px 80px 26px;
    margin: 0 auto 34px;
    animation: iro-main 1s;
    border: 1px solid rgba(255, 255, 255, 0.62);
    border-radius: 10px;
    box-shadow: 0 1px 30px -4px rgba(232, 232, 232, 0.78);
    backdrop-filter: saturate(180%) blur(10px);

    /*
        --iro-var-: ;
    */
    transition: --iro-var-1 0.8s ease !important;

    &::before {
        content: "";
        display: table;
        table-layout: fixed;
    }

    &.iro-light {
        --iro-var-1: rgba(255, 255, 255, 1);
        background-color: rgba(255, 255, 255, 0.76);
    }

    &.iro-dark {
        --iro-var-1: rgba(51, 51, 51, 1);
        background-color: rgba(30, 30, 30, 0.82);
        border-color: rgba(255, 255, 255, 0.08);
        box-shadow: 0 1px 30px -4px rgba(0, 0, 0, 0.26);
    }
}

.iro-post-exit {
    position: fixed;
    top: 94px;
    left: max(24px, calc((100vw - 860px) / 2 - 58px));
    z-index: 120;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border: 1px solid rgba(255, 255, 255, 0.62);
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.68);
    box-shadow: 0 1px 24px -6px rgba(120, 120, 120, 0.56);
    backdrop-filter: saturate(180%) blur(10px);
    color: var(--iro-theme-skin-matching, #5892eb);
    transition: color 0.2s ease-out, background 0.2s ease-out, transform 0.2s ease-out;

    &:hover {
        color: var(--iro-theme-skin, #8e78c6);
        transform: translateX(-2px);
    }
}

.iro-dark {
    .iro-post-exit {
        border-color: rgba(255, 255, 255, 0.08);
        background: rgba(30, 30, 30, 0.72);
        color: #cccccc;
        box-shadow: 0 1px 24px -6px rgba(0, 0, 0, 0.36);
    }
}

.iro-post-main {
    display: block;
    padding: 7.5% 0 0;
    margin-left: 10px;
}

:deep(h1),
:deep(h2),
:deep(h3),
:deep(h4),
:deep(h5),
:deep(h6) {
    margin-left: -10px;
    /* 或者你希望的任何缩进值 */
}

article {
    display: block;
    margin: 0 0 1.5em;
}

.iro-post-header {
    text-align: center;
    margin: auto;
}

.iro-post-title {
    animation: iro-fade-in-down 2s;
    font-size: 24px;
    font-weight: 300;

    &::before {
        display: block;
        content: " ";
        height: 80px;
        margin-top: -80px;
        visibility: hidden;
    }
}

.iro-post-ctime {
    font-size: 12px;
    margin: 0;
    color: #888;
    font-weight: var(--iro-global-font-weight);
    animation: iro-fade-in-down 2s;
}

hr {
    width: 30%;
    height: 0px;
    border: 0;
    margin: 20px auto;
}

.iro-post-content {
    position: relative;
}

@keyframes iro-main {
    0% {
        opacity: 0;
        transform: translateY(50px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 860px) {
    .iro-root {
        width: calc(100% - 28px);
        padding: 0 20px 72px 20px;
    }

    .iro-post-exit {
        top: 74px;
        left: 14px;
        width: 38px;
        height: 38px;
    }

    .iro-post-main {
        margin-left: 0;
    }
}
</style>
