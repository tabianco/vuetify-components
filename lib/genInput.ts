import { inheritComponent } from '@tabianco/vue-inherit-component'
import type Vue from 'vue'
import type { Component, DefaultProps } from 'vue/types/options'

declare interface InputProps extends DefaultProps {
  disabled: Boolean
  readonly: Boolean
  textonly: Boolean
}

type InheritComponentOptions = Parameters<typeof inheritComponent>[1]
type Callable <Type> = (this: typeof Vue, props: InputProps) => Type

declare interface GenInputOptions {
  computedClass?: InheritComponentOptions['computedClass']
  disabledProps?: DefaultProps | Callable<DefaultProps>
  listeners?: InheritComponentOptions['listeners']
  readonlyProps?: DefaultProps | Callable<DefaultProps>
  regularProps?: DefaultProps | Callable<DefaultProps>
  textonlyProps?: DefaultProps | Callable<DefaultProps>
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
        const callProps = (field: keyof GenInputOptions): DefaultProps => {
          const value = options[field]

          return value === undefined
            ? {}
            : typeof value === 'function'
              ? (value as Callable<DefaultProps>).call(this, props)
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

      listeners: options.listeners,

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
