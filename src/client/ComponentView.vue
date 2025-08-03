<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
    src: string;
    highlightedSrc?: string;
}>();

const highlightedSrc = ref("");
const activedTab = ref<"preview" | "code">("preview");
const copied = ref(false);

watch(
    [() => props.src, () => props.highlightedSrc],
    async ([src, highlight = ""]) => {
        highlightedSrc.value = atob(highlight);
        try {
            src = atob(src);
        } catch (e) {}
    },
    {
        immediate: true,
    },
);

async function copyCode() {
    await navigator.clipboard.writeText(props.src);
    copied.value = true;
    setTimeout(() => {
        copied.value = false;
    }, 2000);
}
</script>

<template>
    <div class="vp-component-tabs">
        <header>
            <template
                v-for="{ label, value } in [
                    { label: '预览', value: 'preview' },
                    { label: '源代码', value: 'code' },
                ] as const"
                :key="value"
            >
                <input
                    :id="`tab-${value}`"
                    type="radio"
                    name="vp-component-tabs"
                    style="position: fixed; opacity: 0; pointer-events: none"
                    :data-checked="activedTab === value"
                />
                <label :for="`tab-${value}`" @click="activedTab = value">{{
                    label
                }}</label>
            </template>
        </header>

        <main v-if="activedTab === 'preview'">
            <slot />
        </main>

        <section v-else-if="activedTab === 'code'">
            <span v-html="highlightedSrc" />
        </section>
    </div>
</template>

<style>
.vp-component-tabs {
    margin: 16px 0;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: min-content 1fr;
    row-gap: 16px;
}

.vp-component-tabs > header {
    display: flex;
    position: relative;
    border-radius: 8px;
    overflow-x: auto;
    overflow-y: hidden;
}

.vp-component-tabs > header input + label {
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    padding: 8px 12px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-code-tab-text-color);
    white-space: nowrap;
    cursor: pointer;
    transition:
        color 0.25s,
        background-color 0.25s;
}

.vp-component-tabs > header input + label::after {
    content: "";
    position: absolute;
    height: 4px;
    border-radius: 2px;
    left: 8px;
    right: 8px;
    bottom: -1px;
    transition: background-color 0.25s;
}
.vp-component-tabs > header input[data-checked="true"] + label::after {
    background-color: var(--vp-code-tab-active-bar-color);
}
.vp-component-tabs > header input[data-checked="true"] + label,
.vp-component-tabs > header label:hover {
    color: var(--vp-code-tab-active-text-color);
}

.vp-component-tabs > main {
    padding: 20px;
    background-color: var(--vp-nav-bg-color);
    border-radius: 8px;
    outline: 1px solid var(--vp-c-divider);
}

.vp-component-tabs > section {
    background-color: var(--vp-code-block-bg);
    border-radius: 8px;
    padding: 24px;
    overflow: auto;
}
</style>
