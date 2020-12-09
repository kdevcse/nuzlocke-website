<template>
	<b-card class="poke-container"
	border-variant="primary"
	header-bg-variant="primary"
	header-text-variant="white"
	header-tag="header">
		<template #header>
			<div class="align-middle header-container">
				<span class="">{{getCardTitle}}</span>
				<div v-bind:id="getPartyCardId" v-show="!pokedata.loading" class="float-right stats-info-icon-container">
					<b-icon icon="info-circle" class="stats-info-icon"></b-icon>
				</div>
			</div>
		</template>
		<b-skeleton-wrapper :loading="pokedata.loading">
			<template #loading>
				<b-row md="4" no-gutters>
					<div class="poke-img-container">
						<b-skeleton-img class="poke-img" width="96px"></b-skeleton-img>
					</div>
					<b-col class="poke-info-container" no-gutters>
						<b-skeleton></b-skeleton>
						<b-skeleton></b-skeleton>
						<b-skeleton></b-skeleton>
					</b-col>
				</b-row>
			</template>
			<b-row class="poke-card-row" no-gutters>
				<b-col md="4" class="poke-img-container">
					<img class="poke-img" :src="pokedata.img_url">
				</b-col>
				<b-col class="poke-info-container">
					<b-card-text v-if="pokedata.nickname"><strong>Nickname:</strong> {{pokedata.nickname}}</b-card-text>
					<b-card-text><strong>Type:</strong> {{getPokeTypes}}</b-card-text>
					<b-card-text><strong>Location:</strong> {{getLocationTxt}}</b-card-text>
					<b-card-text><strong>Caught:</strong> {{getCaughtTxt}}</b-card-text>
				</b-col>
			</b-row>
		</b-skeleton-wrapper>
		<b-popover placement="bottom" v-bind:target="getPartyCardId" triggers="hover" title="Base Stats">
				<p v-for="s in pokedata.stats" :key="s.name">{{s.name.toUpperCase()}}: {{s.val}}</p>
		</b-popover>
	</b-card>
</template>
<script>
export default {
	name: 'PokeCard',
	props: {
		pokedata: Object,
		index: Number
	},
	computed: {
		getCardTitle() {
			const titleDataExists = this.pokedata.real_name && this.pokedata.lvl;
			return titleDataExists ? `${this.pokedata.real_name} - Lvl.${this.pokedata.lvl}` : 'Loading...';
		},
		getPokeTypes() {
			const types = this.pokedata.types;
			if(!types || types.length === 0)
				return;

			let msg = types[0];
			if(types.length > 1){
				for(let i = 1; i < types.length; i++) {
					msg += `/${types[i]}`
				}
			}

			return msg;
		},
		getPartyCardId() {
			return `party-card-${this.index}`;
		},
		getLocationTxt(){
			const dashSplit = this.pokedata.location.split('-');
			let str = '';
			dashSplit.forEach(split => {
				str += (split.charAt(0).toUpperCase() + split.slice(1)) + ' ';
			});

			return str;
		},
		getCaughtTxt() {
			var dte = new Date(this.pokedata.caught);
			const options = { dateStyle: 'short', timeStyle: 'short' };
			return dte.toLocaleString('en-US', options);
		}
	}
}
</script>
<style scoped>
.poke-container {
	text-align: left;
	overflow: hidden;
	border: 1px solid;
	border-radius: 6px;
	background-color: #fff;
}
.poke-info-container {
	text-align: left;
    margin: 10px;
}
.poke-info-container > p {
	margin-bottom: 0.75rem;
}
.poke-lvl {
	margin: 0;
}
.poke-real-name{
	margin-top: 10px;
}
.poke-img-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.poke-img {
	margin-left: auto;
	margin-right: auto;
}
.card-body {
	padding: 0;
}
.stats-info-icon-container {
	cursor: pointer;
}
</style>