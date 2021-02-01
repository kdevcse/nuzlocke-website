<template>
  <div>
    <b-table
      striped
      bordered
      hover
      :fields="getTableFields"
      :items="getTableItems">
      <template #cell(Image)="data">
        <b-img
          :width="getGenerationSize"
          :height="getGenerationSize"
          :src="data.value">
        </b-img>
      </template>
      <template #cell(Tools)="data">
        <PokeCardToolbar 
          :pokedata="data.value"
          :run="run"
          :runId="runId">
        </PokeCardToolbar>
      </template>
    </b-table>
  </div>
</template>
<script>
import PokeCardToolbar from '@/components/PokeCardToolbar.vue';

export default {
  name: 'NuzzyBoxTable',
  components: {
    PokeCardToolbar
  },
  props: {
    data: Array,
    run: Object,
    runId: String
  },
  computed: {
    getTableItems() {
      return this.data.map(d => {
        return {
          Image: d.img_url,
          Name: this.getPokeName(d.real_name),
          Nickname: d.nickname,
          Lvl: d.lvl,
          Types: this.getPokeTypes(d.types),
          Caught: this.getCaughtTxt(d.caught),
          Tools: d
        }
      });
    },
    getTableFields() {
      return [
        { key: 'Image', sortable: false, tdClass: 'align-middle' },
        { key: 'Name', sortable: true, tdClass: 'align-middle' },
        { key: 'Nickname', sortable: true, tdClass: 'align-middle' },
        { key: 'Lvl.', sortable: true, tdClass: 'align-middle' },
        { key: 'Types', sortable: true, tdClass: 'align-middle' },
        { key: 'Caught', sortable: true, tdClass: 'align-middle' },
        { key: 'Tools', sortable: false, headerTitle: '', tdClass: 'align-middle' }
      ]
    },
    getGenerationSize() {
      switch (this.run.generation) {
      case 'generation-i':
        return '40px';
      case 'generation-ii':
        return '40px';
      case 'generation-iii':
        return '64px';
      case 'generation-iv':
        return '80px';
      case 'generation-v':
        return '96px';
      case 'generation-vi':
        return '120px';
      case 'generation-vii':
        return '128px';
      default:
        return '128px';
      }
    }
  },
  methods: {
    getPokeName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1)
    },
    getLocationTxt(location) {
      const dashSplit = location.split('-');
      let str = '';
      dashSplit.forEach(split => {
        str += (split.charAt(0).toUpperCase() + split.slice(1)) + ' ';
      });

      return str;
    },
    getPokeTypes(types) {
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
    getCaughtTxt(caught) {
      var dte = new Date(caught);
      const options = { dateStyle: 'short', timeStyle: 'short' };
      return dte.toLocaleString('en-US', options);
    }
  }
}
</script>
<style scoped>
</style>