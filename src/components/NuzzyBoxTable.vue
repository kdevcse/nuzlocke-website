<template>
  <div>
    <b-table 
      hover
      :items="getTableItems">
    </b-table>
  </div>
</template>
<script>
export default {
  name: 'NuzzyBoxTable',
  props: {
    data: Array
  },
  computed: {
    getTableItems() {
      return this.data.map(d => {
        return {
          Name: this.getPokeName(d.real_name),
          Nickname: d.nickname,
          Lvl: d.lvl,
          Types: this.getPokeTypes(d.types),
          Caught: this.getCaughtTxt(d.caught)
        }
      });
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