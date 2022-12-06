import { defineStore } from 'pinia';

const userStore = defineStore('userInfo', {
  state: () => ({
    name: 'wucw'
  }),
});

export default userStore;

