<template>
  <b-card
    class="poke-container"
    :border-variant="getHeaderBackgroundColor"
    :header-bg-variant="getHeaderBackgroundColor"
    header-text-variant="white"
    header-tag="header">
    <template #header>
      <div class="align-middle header-container">
        <span>
          {{getCardTitle}}
          <font-awesome-icon 
            v-if="getGenderIcon"
            :icon="getGenderIcon">
          </font-awesome-icon>
        </span>
        <div
          :id="getPartyCardId"
          v-show="!loading"
          class="float-right stats-info-icon-container">
          <font-awesome-icon
            :icon="['fas', 'chart-bar']"
            class="stats-info-icon"></font-awesome-icon>
        </div>
      </div>
    </template>
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <b-row
          class="poke-card-row"
          no-gutters>
          <b-col 
            md="4.5"
            class="poke-img-container fake-img-container">
            <b-skeleton-img class="poke-img"></b-skeleton-img>
          </b-col>
          <b-col class="poke-info-container">
            <b-skeleton
              height="1.1rem"
              class="my-2"></b-skeleton>
            <b-skeleton
              height="1.1rem"
              class="my-2"></b-skeleton>
            <b-skeleton
              height="1.1rem"
              class="my-2"></b-skeleton>
            <b-skeleton
              height="1.1rem"
              class="my-2"></b-skeleton>
          </b-col>
        </b-row>
      </template>
      <b-row
        class="poke-card-row"
        no-gutters>
        <b-col
          md="4"
          class="poke-img-container">
          <img
            class="poke-img"
            :src="pokedata.img_url">
        </b-col>
        <b-col class="poke-info-container">
          <b-card-text
            class="pokecard-info-txt"
            v-if="pokedata.nickname">
            <strong>Nickname:</strong> {{pokedata.nickname}}
          </b-card-text>
          <b-card-text class="pokecard-info-txt">
            <strong>Type:</strong> {{getPokeTypes}}
          </b-card-text>
          <b-card-text 
            class="pokecard-info-txt"
            v-if="pokedata.location">
            <strong>Location:</strong> {{getLocationTxt}}
          </b-card-text>
          <b-card-text class="pokecard-info-txt">
            <strong>Caught:</strong> {{getCaughtTxt}}
          </b-card-text>
          <b-card-text 
            v-if="pokedata.death"
            class="pokecard-info-txt">
            <strong>Death:</strong> {{getDeathTxt}}
          </b-card-text>
        </b-col>
      </b-row>
    </b-skeleton-wrapper>
    <b-popover
      placement="bottom"
      :target="getPartyCardId"
      triggers="hover"
      title="Base Stats">
      <p
        class="stat-txt"
        v-for="s in pokedata.stats"
        :key="s.name">
        {{s.name.toUpperCase()}}: {{s.val}}
      </p>
    </b-popover>
    <template #footer>
      <PokeCardToolbar 
        :demo="demo"
        :pokedata="pokedata"
        :run="run"
        :runId="runId">
      </PokeCardToolbar>
    </template>
  </b-card>
</template>
<script>
import PokeCardToolbar from '@/components/PokeCardToolbar.vue';

export default {
  name: 'PokeCard',
  components: {
    PokeCardToolbar
  },
  props: {
    pokedata: Object,
    loading: Boolean,
    index: Number,
    demo: Boolean,
    run: Object,
    runId: String
  },
  computed: {
    getCardTitle() {
      const titleDataExists = this.getPokeName && this.pokedata.lvl;
      return titleDataExists ? `${this.getPokeName} - Lvl.${this.pokedata.lvl}` : 'Loading...';
    },
    getPokeName() {
      return this.pokedata.real_name.charAt(0).toUpperCase() + this.pokedata.real_name.slice(1)
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
    },
    getDeathTxt() {
      var dte = new Date(this.pokedata.death);
      const options = { dateStyle: 'short', timeStyle: 'short' };
      return dte.toLocaleString('en-US', options);
    },
    getGenderIcon() {
      switch(this.pokedata.gender) {
      case -1:
        return ['fas', 'genderless'];
      case 0:
        return ['fas', 'mars'];
      case 1:
        return ['fas', 'venus'];
      default: 
        return null;
      }
    },
    getHeaderBackgroundColor() {
      return this.pokedata.death ? 'danger' : 'primary';
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
  height: 100%;
  min-height: 250px;
}
.poke-card-row {
	height: 100%;
}
.poke-info-container {
	text-align: left;
  margin: .6rem;
}
.pokecard-info-txt {
  margin: 7px 0;
  margin-bottom: 0 ;
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
.fake-img-container > div {
  height: 96px;
  width: 96px;
  margin-left: 10px;
  border-radius: 6px;
}
.poke-img {
	margin-left: auto;
	margin-right: auto;
}
.poke-img-container >  {
  margin-left: 5px;
}
.card-body {
	padding: 0;
}
.card-footer {
  background-color: white;
}
.stats-info-icon-container {
	cursor: pointer;
}
.stat-txt {
  margin: 5px 0px;
  padding: 0px;
}
</style>