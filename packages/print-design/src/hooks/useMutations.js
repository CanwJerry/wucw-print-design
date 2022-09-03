import { mapMutations } from 'vuex';

const mutations = {
  ...mapMutations([
    'addDateJsonListItem', 
    'delDateJsonListItem', 
    'clearDataJson', 
    'updateSelectItem'
  ])
}


export default mutations;