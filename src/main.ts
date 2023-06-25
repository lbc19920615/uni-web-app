import 'uno.css';
// @ts-ignore
import { createSSRApp } from 'vue';
import App from './App.vue';
import store from '@/store';

// 路由格式化
import { spaNavigate } from '@/utils/navigate';
const _oldnavigateBack = uni.navigateBack;
uni.navigateBack = function (args, ...rest) {
  spaNavigate(() => {
    _oldnavigateBack(args);
  });
};

const _oldredirectTo = uni.redirectTo;
uni.redirectTo = function (args, ...rest) {
  spaNavigate(() => {
    _oldredirectTo(args);
  });
};

const _oldnavigateTo = uni.navigateTo;
uni.navigateTo = function (args, ...rest) {
  spaNavigate(() => {
    _oldnavigateTo(args);
  });
};

const _oldswitchTab = uni.switchTab;
uni.switchTab = function (args, ...rest) {
  spaNavigate(() => {
    _oldswitchTab(args);
  });
};

export function createApp() {
  const app = createSSRApp(App).use(store);
  return {
    app
  };
}
