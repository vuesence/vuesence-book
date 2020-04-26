<template>
    <li
        class="nav-item"
        :class="`nav-item--${level}`"
    >
        <div class="nav-title">
            <router-link
                :is="(item.to || !item.sections) ? 'router-link' : 'div'"
                :to="item.to || {name: 'article', params: {id: item.id}}"
                @click="onClick"
                class="nav-link"
                active-class1="nav-link--active"
                :class="{'nav-link--active': item.isActive}"
            >
                {{item.title}}
            </router-link>
            <div v-if="hasChildren" class="nav-toggle" @clicsectionsk="isExpanded = !isExpanded">
                {{isExpanded ? '-' : '+'}}
            </div>
        </div>

        <div
            v-if="hasChildren && isExpanded"
            class="nav-children"
        >
            <NavigationItemContent
                :tree="item.sections"
                :level="level + 1"
            />
        </div>
    </li>
</template>

<script>
    import NavigationItemContent from "./NavigationItemContent";
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

    .nav-title {
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 6px;
        cursor: pointer;
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

    .main-navigation .router-link-active {
        font-weight: bold;
    }
</style>