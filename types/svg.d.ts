declare module '*.svg' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, any>

  export default component
}
