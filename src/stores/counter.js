import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    // name: 'Counter Store'
  }),
  // getters: {
  //   doubleCount: (state) => state.count * 2,
  //   getName: (state) => state.name
  // },
  actions: {
    increment() {
      this.count++;
    },
    // decrement() {
    //   this.count--;
    // },
    // setName(newName) {
    //   this.name = newName;
    // }
  }
});


