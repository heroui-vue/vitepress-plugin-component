<script setup lang="ts">
import { computed, ref } from "vue";
import "highlight.js/styles/stackoverflow-light.css";
import hljs from "highlight.js";

const props = defineProps<{
    source: string;
}>();

const activeTab = ref<"preview" | "code">("preview");
const copied = ref(false);

const sourceCode = computed(() => {
    let code = props.source;
    try {
        code = atob(props.source);
    } catch (e) {}

    const { value } = hljs.highlight(code, { language: "html" });
    return value;
});

async function copyCode() {
    await navigator.clipboard.writeText(sourceCode.value);
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
                    :checked="value === 'preview'"
                />
                <label :for="`tab-${value}`" @click="activeTab = value">{{
                    label
                }}</label>
            </template>
        </header>

        <main v-if="activeTab === 'preview'">
            <slot />
        </main>

        <section v-else-if="activeTab === 'code'">
            <span v-html="sourceCode" />
        </section>
    </div>
</template>

<style scoped>
/* 样式部分保持不变 */
.vp-component-tabs {
    margin: 16px 0;
}

.vp-component-tabs > header {
    display: flex;
    position: relative;
    padding: 0 12px;
    background-color: var(--vp-c-bg-soft);
    border-radius: 8px;
    overflow-x: auto;
    overflow-y: hidden;
    box-shadow: inset 0 -1px var(--vp-code-tab-divider);
}

.vp-component-tabs > header input:checked + label,
.vp-component-tabs > header label:hover {
    color: var(--vp-code-tab-active-text-color);
}
.vp-component-tabs > header > label {
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    border-bottom: 1px solid transparent;
    padding: 0 12px;
    line-height: 48px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-code-tab-text-color);
    white-space: nowrap;
    cursor: pointer;
    transition:
        color 0.25s,
        background-color 0.25s;
}

.vp-component-tabs > header input:checked + label::after {
    background-color: var(--vp-code-tab-active-bar-color);
}
.vp-component-tabs > header label::after {
    content: "";
    height: 2px;
    border-radius: 2px;
    left: 8px;
    right: 8px;
    position: absolute;
    bottom: -1px;

    transition: background-color 0.25s;
}

.vp-component-tabs > main {
    margin-top: 8px;
    outline: 1px solid var(--vp-code-tab-divider);
    background-color: var(--vp-nav-bg-color);
    padding: 20px;
    border-radius: 8px;
}

.vp-component-tabs > section {
    background-color: var(--vp-c-bg-soft);
    border-radius: 8px;
    padding: 24px;
}
</style>
