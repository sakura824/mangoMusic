<template>
	<div id="nav">
		<top></top>
		<index></index>
		<Audio></Audio>
	</div>
</template>

<script>
	import Audio from './components/Audio'
	import Index from './components/Index.vue'
	import Top from './components/Top.vue'
	export default {
		components: {
			Top,
			Index,
			Audio
		},
		created() {
			localStorage.clear();
			this.$router.push('/discovery')
		}
	}
</script>

<style>
</style>
