<template>
    <div id="party-container">
        <div class="run-party-title-bar">
            <h3>Party</h3>
        </div>
        <div id="all-pokes-container">
            <b-card class="poke-container" 
            v-for="(p, index) in data" 
            v-bind:key="p.id"
            v-bind:index="index"
            border-variant="primary"
            header-bg-variant="primary"
            header-text-variant="white"
            header-tag="header">
                <template #header>
                    <div class="align-middle header-container">
                        <span class="">{{getCardTitle(p)}}</span>
                        <div v-bind:id="getPartyCardId(index)" v-show="!p.loading" class="float-right stats-info-icon-container">
                            <b-icon icon="info-circle" class="stats-info-icon"></b-icon>
                        </div>
                    </div>
                </template>
                <b-skeleton-wrapper :loading="p.loading">
                    <template #loading>
                    <b-row md="4" no-gutters>
                        <b-skeleton-img class="poke-img" width="125px"></b-skeleton-img>
                        <b-col class="poke-info-container" no-gutters>
                            <b-skeleton></b-skeleton>
                            <b-skeleton></b-skeleton>
                            <b-skeleton></b-skeleton>
                        </b-col>
                    </b-row>
                    </template>
                    <b-row md="4" no-gutters>
                        <img class="poke-img" :src="p.img_url">
                        <b-col class="poke-info-container" no-gutters>
                            <b-card-text v-if="p.nickname"><strong>Nickname:</strong> {{p.nickname}}</b-card-text>
                            <b-card-text><strong>Type:</strong> {{getPokeTypes(p.types)}}</b-card-text>
                            <b-card-text><strong>Caught:</strong> {{p.location}}</b-card-text>
                        </b-col>
                    </b-row>
                </b-skeleton-wrapper>
                <b-popover placement="bottom" v-bind:target="getPartyCardId(index)" triggers="hover" title="Base Stats">
                    <p v-for="s in p.stats" :key="s.name">{{s.name.toUpperCase()}}: {{s.val}}</p>
                </b-popover>
            </b-card>
        </div>
    </div>
</template>
<script>
export default {
    name: 'NuzzyParty',
    props: {
        data: Array
    },
    methods: {
		getCardTitle(p) {
			const titleDataExists = p.real_name && p.lvl;
			return titleDataExists ? `${p.real_name} - Lvl.${p.lvl}` : 'Loading...';
		},
		getPokeTypes(types){
			if(!types || types.length === 0)
				return;

			let msg = types[0];
			if(types.length > 1){
				for(let i = 1; i < types.length; i++){
					msg += `/${types[i]}`
				}
			}

			return msg;
		},
		getPartyCardId(id){
			return `party-card-${id}`;
		}
    }
}
</script>
<style scoped>
#party-container {
    padding: 20px 0px;
}
#all-pokes-container {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-column-gap: 15px;
    margin: 0px auto;
    max-width: 1200px;
    padding: 30px 0px;
}
.poke-container {
	text-align: left;
	overflow: hidden;
	border: 1px solid;
	border-radius: 6px;
	background-color: #fff;
}
.poke-info-container {
	text-align: left;
	margin-left: 10px;
	padding: 10px;
}
.poke-lvl {
	margin: 0;
}
.poke-real-name{
	margin-top: 10px;
}
.poke-img {
	height: 125px;
	width: 125px;
	padding: 10px;
	margin-left: auto;
	margin-right: auto;

}
.card-body {
	padding: 5px;
}
.stats-info-icon-container {
	cursor: pointer;
}
.run-party-title-bar {
    text-align: left;
    margin-bottom: 15px;
}
.run-party-title-bar > h3 {
    border-bottom: black 1px solid;
    margin-bottom: 15px;
    padding-bottom: 15px;
}
</style>