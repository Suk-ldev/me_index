<script setup>
import { inject, nextTick, onMounted, onUnmounted, ref } from 'vue';

import { data as iro } from '../iro.data';

const iroDark = inject('iroDark');
const footer = iro.footer ?? {};
const footerEl = ref(null);
const isShown = ref(false);

const themeText = footer.themeText || 'Sakurairo Vitepress';
const themeUrl = footer.themeUrl || 'https://github.com/Suk-ldev/me_index';
const authorText = footer.authorText || 'Suk';
const authorUrl = footer.authorUrl || '';

let ticking = false;

const getDocumentHeight = () => Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
);

const updateFooterSpace = () => {
    if (!footerEl.value) return;

    const height = Math.ceil(footerEl.value.offsetHeight * 1.3);
    document.documentElement.style.setProperty('--iro-footer-space', `${height}px`);
};

const checkFooter = () => {
    updateFooterSpace();

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const documentHeight = getDocumentHeight();
    const nearBottom = scrollTop + window.innerHeight >= documentHeight - 100;

    isShown.value = nearBottom || documentHeight <= window.innerHeight + 1;
};

const requestCheckFooter = () => {
    if (ticking) return;

    ticking = true;
    requestAnimationFrame(() => {
        checkFooter();
        ticking = false;
    });
};

onMounted(async() => {
    await nextTick();
    requestCheckFooter();
    setTimeout(requestCheckFooter, 100);
    addEventListener('scroll', requestCheckFooter);
    addEventListener('resize', requestCheckFooter);
});

onUnmounted(() => {
    removeEventListener('scroll', requestCheckFooter);
    removeEventListener('resize', requestCheckFooter);
    document.documentElement.style.removeProperty('--iro-footer-space');
});
</script>

<template>
    <div class="iro-root" :class="{ 'iro-light': !iroDark, 'iro-dark': iroDark }">
        <footer ref="footerEl" id="colophon" class="iro-footer" role="contentinfo"
            :class="{ 'iro-light': !iroDark, 'iro-dark': iroDark, show: isShown }">
            <div class="iro-footer-shell">
                <div v-if="footer.showSakuraIcon ?? false" class="iro-sakura-icon">
                    <img src="/res/iro/sakura_icon.svg" draggable="false" alt="">
                </div>

                <div class="iro-footer-content">
                    <p v-if="footer.beforeSlot && footer.content" class="iro-footer-info" v-html="footer.content"></p>
                    <slot name="iro-footer"></slot>
                    <p v-if="!footer.beforeSlot && footer.content" class="iro-footer-info" v-html="footer.content"></p>
                    <p v-if="footer.stats" class="iro-site-stats" v-html="footer.stats"></p>
                </div>

                <div class="iro-theme-info">
                    <a :href="themeUrl" rel="noopener" target="_blank">Theme {{ themeText }}</a>
                    <a v-if="authorUrl" :href="authorUrl" rel="noopener" target="_blank">by {{ authorText }}</a>
                    <span v-else>by {{ authorText }}</span>
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped lang="scss">
.iro-footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: -100%;
    z-index: 99;
    width: 90%;
    max-width: 820px;
    margin: 15px auto;
    padding: 14px 0;
    border: 1px solid rgba(255, 255, 255, 0.62);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.72);
    box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.05);
    backdrop-filter: saturate(180%) blur(10px);
    font-size: 14px;
    font-weight: var(--iro-global-font-weight);
    will-change: bottom, background, box-shadow;
    transition: all 1s ease-in-out;

    &.show {
        bottom: 0;
        transition: opacity 0.6s ease-in-out,
            transform 0.6s ease-in-out,
            background 0.6s ease-in-out,
            box-shadow 0.6s ease-in-out,
            bottom 0.9s cubic-bezier(0.22, 0.84, 0.46, 1.04);
    }
}

.iro-dark.iro-footer {
    border-color: rgba(255, 255, 255, 0.08);
    background: rgba(30, 30, 30, 0.9);
    box-shadow: 0 -5px 16px rgba(0, 0, 0, 0.2);
}

.iro-footer-shell {
    margin: 0 auto;
    padding: 0 20px;
}

.iro-sakura-icon {
    display: flex;
    justify-content: center;
    margin-bottom: 8px;

    img {
        width: 22px;
        height: 22px;
        opacity: 0.72;
    }
}

.iro-footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    gap: 15px;
}

.iro-footer-info,
.iro-site-stats {
    margin: 0;
    color: rgba(0, 0, 0, 0.52);
    line-height: 1.7;
}

.iro-dark {
    .iro-footer-info,
    .iro-site-stats {
        color: rgba(255, 255, 255, 0.68);
    }
}

.iro-theme-info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px 12px;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    color: rgba(0, 0, 0, 0.42);

    a,
    span {
        color: inherit;
        line-height: 1.6;
        transition: color 0.2s ease-out;
    }

    a:hover {
        color: var(--iro-theme-skin-matching, #5892eb);
    }
}

.iro-dark {
    .iro-theme-info {
        border-top-color: rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.54);
    }
}

@media (max-width: 860px) {
    .iro-footer {
        width: 92%;
        padding: 12px 0;
    }

    .iro-footer-shell {
        padding: 0 16px;
    }

    .iro-footer-content {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
}
</style>
