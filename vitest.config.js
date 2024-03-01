import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'src/components/base'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        exclude: ['src/components/base'],
        include: ['src/components', 'src/stores', 'src/App.vue']
      }
    }
  })
);
