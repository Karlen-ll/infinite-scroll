import { h, defineComponent, computed, PropType } from 'vue'

/** Icon of sprite */
export default defineComponent({
  props: {
    /** Название иконки
     * @required */
    name: {
      type: String as PropType<'top' | 'user'>,
      required: true,
    },

    /** Имя тега
     * @default 'span' */
    tag: {
      type: String,
      default: 'span',
    },

    /** Отображение иконки в дереве доступности
     * @default true */
    ariaHidden: {
      type: [Boolean, String],
      default: true,
    },
  },

  setup(props, context) {
    const isHidden = computed(() => (props.ariaHidden === true ? 'true' : 'false'))

    return () =>
      h(
        props.tag,
        {
          class: ['icon', `icon--${props.name}`],
          'aria-hidden': isHidden.value,
        },
        context.slots
      )
  },
})
