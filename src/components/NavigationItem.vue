<template>
	<li class="vsb-nav-item" :class="`vsb-nav-item--${level}`">
		<div class="vsb-nav-title">

			<a
				v-if="item.to || !item.sections"
				@click="handleClick"
				class="vsb-nav-link"
				:class="{ 'vsb-nav-link--active': isActive || item.isActive }"
				rel="link"
			>
				{{ item.title }}
			</a>
			<div
				v-else
				@click="handleExpand"
				class="vsb-nav-link"
				:class="{ 'vsb-nav-link--active': isActive }"
			>
				{{ item.title }}
			</div>

			<div
				v-if="hasChildren"
				class="vsb-nav-toggle"
				@click="isExpanded = !isExpanded"
				:class="{ 'vsb-nav-toggle--active': item.isExpanded }"
			>
				<!-- {{ isExpanded ? "-" : "+" }} -->
				<span @click="handleExpand" class="arrow">
					<svg width="24" height="24" viewBox="0 0 24 24">
						<path
							fill="#565656"
							d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
						></path>
						<path d="M0 0h24v24H0z" fill="none"></path>
					</svg>
				</span>
			</div>
		</div>

		<div v-if="hasChildren && isExpanded" class="vsb-nav-section">
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
import { VsbEventBus } from "../utils";

export default {
	name: "NavigationItem",
	components: { NavigationItemContent },
	computed: {
		hasChildren() {
			return this.item.sections && this.item.sections.length;
		},
	},
	data() {
		return {
			isActive: false,
			isExpanded: true,
		}
	},
	props: {
		item: Object,
		level: Number,
		articleNav: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		handleExpand() {
			if (this.hasChildren) {
				this.isExpanded = !this.isExpanded;
			}
		},
		handleClick() {			
			if (this.$el.closest(".vsb-article-navigation")) {
				VsbEventBus.$emit("scrollToInArticle", this.item);
			} else {				
				VsbEventBus.$emit("navigateToArticle", this.item);
				// this.$refs.link.classList.add("");
			}
		},
	},
	mounted() {
		if (!this.$el.closest(".vsb-article-navigation")) {
			VsbEventBus.$on("navigateToArticle", (itm) => {
				if (this.item.id != itm.id) {
					// this.item.isActive = false;
					this.isActive = false;
				} else {
					// this.item.isActive = true;
					this.isActive = true;
				}
			});
		}
	},
	watch: {
		item: {
			handler() {
				// this.isActive = this.item.isActive;
				// console.log(this.$el.querySelector(".vsb-nav-link"));
				
				// if (this.item.isActive) {
				// 	this.$el.querySelector(".vsb-nav-link").classList.add("vsb-nav-link--active");
				// } else {
				// 	this.$el.querySelector(".vsb-nav-link").classList.remove("vsb-nav-link--active");
				// }
				// console.log("aaaaaaaaaa");
				// console.log(this.item.isActive);
				// console.log(this.item);
				// this.$forceUpdate();
			}
			
		}
	}
};
</script>