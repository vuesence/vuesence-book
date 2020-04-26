<template>
    <li
        class="nav-item"
        :class="`nav-item--${level}`"
    >
        <div class="nav-link-wrapper">
            <router-link
                :is="(item.to || item.id) ? 'router-link' : 'div'"
                :to="item.to || {name: 'json-page', params: {id: item.id}}"
                @click="onClick"
                class="nav-link"
                active-class="nav-link--active"
                :class="{'nav-link--active': item.isActive}"
            >
                {{item.title}}
            </router-link>
            <div v-if="hasChildren" class="nav-toggle" @click="isExpanded = !isExpanded">
                {{isExpanded ? '-' : '+'}}
            </div>
        </div>

        <div
            v-if="hasChildren && isExpanded"
            class="nav-children"
        >
            <ArticleNavigation
                :tree="item.sections"
                :level="level + 1"
            />
        </div>
    </li>
</template>

<script>
    import ArticleNavigation from "./ArticleNavigation";
    export default {
        name: "NavItem",
        components: {ArticleNavigation},
        computed: {
            hasChildren() {
                return this.item.sections && this.item.sections.length;
            }
        },
        props: {
            item: Object,
            level: Number,
        },
        methods: {
            onClick() {
                if(this.hasChildren) {
                    this.isExpanded = !this.isExpanded
                }
            }
        },
        data() {
            return {
                isExpanded: true
            }
        }
    }
</script>

<style>
    .nav-children {
        padding-left: 14px;
    }

    .nav-link-wrapper {
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 6px;
    }

    .nav-toggle {
        height: 20px;
        width: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background: #efefef;
    }

    .nav-item {
        margin-top: 10px;
    }

    .nav-link--active {
        font-weight: bold;
    }
</style>