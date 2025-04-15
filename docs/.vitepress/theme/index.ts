import DefaultTheme from 'vitepress/theme'

// import './style.css'
import '../../../packages/assets/css/tailwind.css'
import ComponentGrid from './components/ComponentGrid.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('ComponentGrid', ComponentGrid)
  },
}
