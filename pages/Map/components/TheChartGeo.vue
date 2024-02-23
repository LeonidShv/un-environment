<template>
	<svg-map :map="Taiwan" />
</template>

<script>
import { SvgMap } from "vue-svg-map";
import Taiwan from "@svg-maps/taiwan";

export default {
	name: "MyMap",
	components: {
		SvgMap
	},
	data() {
		return {
			Taiwan
		};
	}
};
</script>

<style src="vue-svg-map/dist/index.css"></style>