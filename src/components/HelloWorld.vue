<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a
      href="https://marketplace.visualstudio.com/items?itemName=octref.vetur"
      target="_blank"
    >
      Vetur
    </a>
    or
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    (if using
    <code>&lt;script setup&gt;</code>)
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <el-button type="primary" @click="increment">测试element-plus</el-button>
  <h1>{{ rootCount }}</h1>
  <h1>{{ count1 }}</h1>
  <h1>{{ moduleGetters }}</h1>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue';
import { useStore } from '../store/index';

export default defineComponent({
  name: 'HelloWorld',

  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup: () => {
    const count = ref(0);
    const store = useStore();

    return {
      count,
      rootState: computed(() => store.state.rootCount),
      count1: computed(() => store.state.module.count),
      moduleGetters: computed(() => store.getters.getCount),
      increment: () => store.commit('increment'),
    };
  },
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>

<style scoped lang="sass">
a
  color: $primary
</style>
