<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps({
    mode: {
        type: String,
        default: 'cat',
    },
});

const cursorModes = ['cat', 'dot', 'system'];
const cursorMode = computed(() => cursorModes.includes(props.mode) ? props.mode : 'cat');
const dotEnabled = ref(false);
const visible = ref(false);
const hovering = ref(false);
const active = ref(false);
const cursorX = ref(-100);
const cursorY = ref(-100);
const dotX = ref(-100);
const dotY = ref(-100);

const target = { x: -100, y: -100 };
const current = { x: -100, y: -100 };
const interactiveSelector = [
    'a',
    'button',
    'input',
    'textarea',
    'select',
    'label',
    'summary',
    '[role="button"]',
    '[tabindex]:not([tabindex="-1"])',
    '.iro-social',
].join(',');

let rafId = 0;
let mediaQuery = null;

const cursorTransform = computed(() => `translate3d(${cursorX.value}px, ${cursorY.value}px, 0) translate(-50%, -50%)`);
const dotTransform = computed(() => `translate3d(${dotX.value}px, ${dotY.value}px, 0) translate(-50%, -50%)`);

const setHtmlCursorClass = () => {
    const html = document.documentElement;
    html.classList.remove('iro-cat-cursor', 'iro-dot-cursor');

    if (cursorMode.value == 'cat') {
        html.classList.add('iro-cat-cursor');
    }

    if (cursorMode.value == 'dot' && !isCoarsePointer()) {
        html.classList.add('iro-dot-cursor');
    }
};

const isCoarsePointer = () => {
    mediaQuery ??= window.matchMedia('(pointer: coarse)');
    return mediaQuery.matches;
};

const updateHoverState = event => {
    const element = event.target instanceof Element ? event.target : null;
    hovering.value = Boolean(element?.closest(interactiveSelector));
};

const onPointerMove = event => {
    if (event.pointerType == 'touch') return;

    visible.value = true;
    target.x = event.clientX;
    target.y = event.clientY;
    dotX.value = event.clientX;
    dotY.value = event.clientY;
    updateHoverState(event);
};

const onPointerDown = () => {
    active.value = true;
};

const onPointerUp = () => {
    active.value = false;
};

const onPointerLeave = () => {
    visible.value = false;
    active.value = false;
};

const animateCursor = () => {
    current.x += (target.x - current.x) * 0.22;
    current.y += (target.y - current.y) * 0.22;
    cursorX.value = current.x;
    cursorY.value = current.y;
    rafId = requestAnimationFrame(animateCursor);
};

const enableDotCursor = () => {
    if (isCoarsePointer()) {
        dotEnabled.value = false;
        return;
    }

    dotEnabled.value = true;
    addEventListener('pointermove', onPointerMove);
    addEventListener('pointerdown', onPointerDown);
    addEventListener('pointerup', onPointerUp);
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    rafId = requestAnimationFrame(animateCursor);
};

const disableDotCursor = () => {
    dotEnabled.value = false;
    visible.value = false;
    active.value = false;
    hovering.value = false;
    removeEventListener('pointermove', onPointerMove);
    removeEventListener('pointerdown', onPointerDown);
    removeEventListener('pointerup', onPointerUp);
    document.documentElement.removeEventListener('pointerleave', onPointerLeave);

    if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
    }
};

const applyCursorMode = () => {
    disableDotCursor();
    setHtmlCursorClass();

    if (cursorMode.value == 'dot') {
        enableDotCursor();
    }
};

onMounted(() => {
    applyCursorMode();
});

watch(cursorMode, applyCursorMode);

onUnmounted(() => {
    disableDotCursor();
    document.documentElement.classList.remove('iro-cat-cursor', 'iro-dot-cursor');
});
</script>

<template>
    <div v-if="dotEnabled" class="iro-cursor-layer" aria-hidden="true">
        <div class="iro-cursor"
            :class="{ 'is-visible': visible, 'is-hover': hovering, 'is-active': active }"
            :style="{ transform: cursorTransform }"></div>
        <div class="iro-cursor-dot"
            :class="{ 'is-visible': visible, 'is-hover': hovering, 'is-active': active }"
            :style="{ transform: dotTransform }"></div>
    </div>
</template>

<style scoped lang="scss">
.iro-cursor-layer {
    pointer-events: none;
}

.iro-cursor,
.iro-cursor-dot {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    opacity: 0;
    z-index: 2147483647;
    will-change: transform;
}

.iro-cursor {
    width: 22px;
    height: 22px;
    border: 1.5px solid rgba(255, 255, 255, 0.74);
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.10);
    box-shadow: 0 0 16px rgba(80, 80, 80, 0.18);
    backdrop-filter: blur(1px);
    transition: opacity 0.18s ease, width 0.18s ease, height 0.18s ease, background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;

    &.is-visible {
        opacity: 1;
    }

    &.is-hover {
        width: 26px;
        height: 26px;
        border-color: rgba(255, 255, 255, 0.88);
        background: rgba(255, 255, 255, 0.14);
        box-shadow: 0 0 20px rgba(80, 80, 80, 0.22);
    }

    &.is-active {
        width: 18px;
        height: 18px;
        background: rgba(255, 255, 255, 0.18);
    }
}

.iro-cursor-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(120, 120, 120, 0.92);
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.34);
    transition: opacity 0.18s ease, width 0.18s ease, height 0.18s ease, background 0.18s ease;

    &.is-visible {
        opacity: 1;
    }

    &.is-hover {
        width: 9px;
        height: 9px;
        background: rgba(96, 96, 96, 0.96);
    }

    &.is-active {
        width: 7px;
        height: 7px;
    }
}

@media (pointer: coarse) {
    .iro-cursor-layer {
        display: none;
    }
}
</style>
