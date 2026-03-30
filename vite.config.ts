import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// ⚠️ Убрали kimi-plugin-inspect-react (может вызвать ошибки при сборке)

export default defineConfig({
  base: '/robitar-site/',  // ✅ ЗАМЕНИТЕ на имя ВАШЕГО репозитория
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});