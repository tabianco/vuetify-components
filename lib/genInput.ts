import { inheritComponent } from '@tabianco/vue-inherit-component'
import type { Component, DefaultProps } from 'vue/types/options'

declare interface InputProps extends DefaultProps {
  disabled: Boolean
  readonly: Boolean
  textonly: Boolean
}

declare interface GenInputOptions {
  computedClass?: (props: InputProps) => any
  disabledProps?: DefaultProps | ((props: InputProps) => DefaultProps)
  readonlyProps?: DefaultProps | ((props: InputProps) => DefaultProps)
  regularProps?: DefaultProps | ((props: InputProps) => DefaultProps)
  textonlyProps?: DefaultProps | ((props: InputProps) => DefaultProps)
}

export default function genInput
  <
    BaseComponent=Component<any, any, any, DefaultProps>
  >
(
  baseComponent: BaseComponent,
  options: GenInputOptions = {
    disabledProps: {},
    readonlyProps: {},
    regularProps: {},
    textonlyProps: {}
  }
) {
  return inheritComponent(
    baseComponent,
    {
      computedClass: options.computedClass,

      computedProps (props) {
        function callProps (field: keyof GenInputOptions): DefaultProps {
          const value = options[field]

          return value === undefined
            ? {}
            : typeof value === 'function'
              ? value(props)
              : value
        }

        if (props.textonly) {
          return {
            ...props,
            disabled: false,
            flat: true,
            hideDetails: true,
            outlined: false,
            readonly: true,
            rules: [],
            solo: true,
            ...callProps('textonlyProps')
          }
        } else if (props.disabled) {
          return {
            ...props,
            ...callProps('regularProps'),
            ...callProps('disabledProps')
          }
        } else if (props.readonly) {
          return {
            ...props,
            ...callProps('regularProps'),
            ...callProps('readonlyProps')
          }
        } else {
          return {
            ...props,
            ...callProps('regularProps')
          }
        }
      },

      props: {
        disabled: {
          type: Boolean
        },

        readonly: {
          type: Boolean
        },

        textonly: {
          type: Boolean
        }
      }
    }
  )
}
