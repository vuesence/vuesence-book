<template>
    <li
        class="vsb-nav-item"
        :class="`vsb-nav-item--${level}`"
    >
        <div class="vsb-nav-title">
            <router-link
                :is="(item.to || !item.sections) ? 'router-link' : 'div'"
                :to="item.to || {name: 'article', params: {id: item.id}}"
                @click.native="handleScrollToSection"
                @click="handleExpand"
                class="vsb-nav-link"
                :class="{'vsb-nav-link--active': item.isActive}"
            >
                {{item.title}}
            </router-link>
            <div v-if="hasChildren" class="vsb-nav-toggle" @clicsectionsk="isExpanded = !isExpanded">
                {{isExpanded ? '-' : '+'}}
            </div>
        </div>

        <div
            v-if="hasChildren && isExpanded"
            class="vsb-nav-children"
        >
            <NavigationItemContent
                :tree="item.sections"
                :level="level + 1"
                :articleNav="articleNav"
            />
        </div>
    </li>
</template>

<script>
    import NavigationItemContent from "./NavigationItemContent";
    import VsbEventBus from "../vsb-event-bus";
    
    export default {
        name: "NavigationItem",
        components: {NavigationItemContent},
        computed: {
            hasChildren() {
                return this.item.sections && this.item.sections.length;
            }
        },
        props: {
            item: Object,
            level: Number,
            articleNav: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            handleExpand() {
                if(this.hasChildren) {
                    this.isExpanded = !this.isExpanded
                }
            },
            handleScrollToSection() {
                VsbEventBus.$emit("scrollTo", this.item);
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
    .vsb-nav-children {
        padding-left: 14px;
    }

    .vsb-nav-title {
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 6px;
        cursor: pointer;
    }

    .vsb-nav-toggle {
        height: 20px;
        width: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background: #efefef;
    }

    .vsb-nav-item {
        margin-top: 10px;
    }

    .vsb-nav-link--active {
        font-weight: bold;
    }

    .vsb-main-navigation .router-link-active {
        font-weight: bold;
    }
</style>