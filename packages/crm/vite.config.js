import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import ElementPlus from 'unplugin-element-plus/vite';
import pkg from './package.json';
import { viteRequire } from 'vite-require';

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      vue(),
      // 为 Element Plus 按需引入样式
      ElementPlus({
        // options
      }),
      // vite中使用require
      viteRequire(/* options */),
    ],
    resolve: {
      // 别名
      alias: {
        '@root': resolve(__dirname),
        '@': resolve(__dirname, 'src'),
        // 同package.json项目名，使当前项目和其他项目可用同名方式引用，方便粘贴代码
        [pkg.name]: resolve(__dirname),
      },
    },
    base: './',
    server: {
      host: '0.0.0.0',
      port: parseInt(env.VITE_SERVER_PORT),
      fs: {
        strict: false,
      },
    },
    build: {
      // 打包输出目录
      outDir: `../../dist/${env.VITE_BUILD_OUTDIRNAME}`,
      // 设置最终构建的浏览器兼容目标
      target: 'esnext',
      // sourcemap
      sourcemap: true,
      // chunk大小警告的限制(KB)
      chunkSizeWarningLimit: 2 ** 10 * 1, // 1MB
      // 构建时是否清空目录
      emptyOutDir: false,
    },
  }
});