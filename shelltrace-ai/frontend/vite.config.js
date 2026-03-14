import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'vendor';
            if (id.includes('framer-motion') || id.includes('lucide-react') || id.includes('cytoscape')) return 'ui-libs';
            if (id.includes('react-force-graph-3d') || id.includes('three')) return 'graph-libs';
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 2000,
  },
  optimizeDeps: {
    include: ['react-force-graph-3d', 'three']
  }
})
