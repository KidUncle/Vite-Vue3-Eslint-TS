import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import module, { ModuleState } from './module';

export interface State {
  rootCount: number;
}

export interface InjectionState extends State {
  module: ModuleState;
}

// eslint-disable-next-line symbol-description
export const key: InjectionKey<Store<InjectionState>> = Symbol();

export const store = createStore<InjectionState>({
  // state() {
  //   return {
  //     rootCount: 111,
  //   }
  // },
  modules: {
    module,
  },
});

// 定义自己的‘useStore’ 组合式函数
export function useStore() {
  return baseUseStore(key);
}
