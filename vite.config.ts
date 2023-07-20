import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'
import vitePluginEslint from 'vite-plugin-eslint'
import unpluginAutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    resolve: {
      // 配置别名
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    clearScreen: false, // 避免 Vite 清屏而错过在终端中打印某些关键信息
    envPrefix: ['VITE_'], // 以 *** 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中
    build: {
      minify: 'terser', // 混淆器，terser 构建后文件体积更小；默认为 esbuild，比 terser 快 20-40 倍，压缩率只差 1%-2%
      terserOptions: {
        // 生产环境移除
        compress: {
          drop_console: env.VITE_USER_NODE_ENV === 'production',
          drop_debugger: env.VITE_USER_NODE_ENV === 'production'
        }
      }
    },
    plugins: [
      uni(), // 挂载 uni-app
      Unocss(), // 即时原子 CSS 引擎
      vitePluginEslint({ cache: false }), // 禁用 eslint 缓存
      // 自动导入
      unpluginAutoImport({
        eslintrc: {
          enabled: true,
          filepath: '.eslintrc-auto-import.json',
          globalsPropValue: true
        },
        imports: ['vue', 'uni-app'], // 预设插件
        dts: 'src/types/auto-imports.d.ts' // 指定生成全局指令的文件目录
      })
    ]
  })
}
