<template>
	<div>
		<b-form @submit="handleSubmit">
			<label for="create-run-name-input">Name:</label>
			<b-input id="create-run-name-input" required></b-input>
			<label for="create-run-version-select">Version:</label>
			<b-select id="create-run-version-select" required v-model="selectedVersion" :options="versions">
			</b-select>
		</b-form>
	</div>
</template>
<script>

export default {
	name: 'RunCreator',
	data: function() {
		return {
			selectedVersion: 'red',
			versions: [
				{ value: 'red', text: 'Red'},
				{ value: 'blue', text: 'Blue'},
				{ value: 'yellow', text: 'Yellow'},
				{ value: 'gold', text: 'Gold'},
				{ value: 'silver', text: 'Silver'},
				{ value: 'crystal', text: 'Crystal'},
				{ value: 'ruby', text: 'Ruby'},
				{ value: 'sapphire', text: 'Sapphire'},
				{ value: 'emerald', text: 'Emerald'},
				{ value: 'firered', text: 'FireRed'},
				{ value: 'leafgreen', text: 'LeafGreen'},
				{ value: 'diamond', text: 'Diamond'},
				{ value: 'pearl', text: 'Pearl'},
				{ value: 'platinum', text: 'Platinum'},
				{ value: 'heartgold', text: 'HeartGold'},
				{ value: 'soulsilver', text: 'SoulSilver'},
				{ value: 'black', text: 'Black'},
				{ value: 'white', text: 'White'},
				{ value: 'colosseum', text: 'Colosseum'},
				{ value: 'xd', text: 'XD'},
				{ value: 'black-2', text: 'Black 2'},
				{ value: 'white-2', text: 'White 2'},
				{ value: 'x', text: 'X'},
				{ value: 'y', text: 'Y'},
				{ value: 'omega-ruby', text: 'Omega Ruby'},
				{ value: 'alpha-sapphire', text: 'Alpha Sapphire'},
				{ value: 'sun', text: 'Sun'},
				{ value: 'moon', text: 'Moon'},
				{ value: 'ultra-sun', text: 'Ultra Sun'},
				{ value: 'ultra-moon', text: 'Ultra Moon'},
				{ value: 'lets-go-pikachu', text: 'Let\'s Go Pikachu'},
				{ value: 'lets-go-eevee', text: 'Let\'s Go Eevee'},
				{ value: 'sword', text: 'Sword'},
				{ value: 'shield', text: 'Shield'}
			]
		}
	},
	methods: {
		handleSubmit() {
			
		}
	}
}
</script>
<style scoped>

</style>