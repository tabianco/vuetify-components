# @tabianco/vuetify-components

[![GitHub Actions](https://github.com/tabianco/vuetify-components/workflows/ci/badge.svg?branch=main)](https://github.com/tabianco/vuetify-components/actions?query=workflow%3Aci)
[![npm (scoped with tag)](https://flat.badgen.net/npm/v/@tabianco/vuetify-components)](https://npmjs.com/package/@tabianco/vuetify-components)
[![npm](https://flat.badgen.net/npm/dt/@tabianco/vuetify-components)](https://npmjs.com/package/@tabianco/vuetify-components)

Vuetify component tweaks for v2.

_Note: this library works only with Vue2_

## Usage

1. Add this package to your dependencies

```bash
$ npm i -S @tabianco/vuetify-components @tabianco/vue-inherit-component
# or
$ yarn add @tabianco/vuetify-components @tabianco/vue-inherit-component
```

2. Use in your component `.vue` file

```javascript
import { genInput } from '@tabianco/vuetify-components'
```

## Full example

A full example creating a component inheriting `VTextField`.

```javascript
import { VTextField } from 'vuetify/lib'
import { genInput } from '@tabianco/vuetify-components'

export default genInput(VTextField, {
  readonlyProps (props) {
    return {
      color: props.dark ? 'white' : 'primary'
    }
  },

  regularProps: {
    color: 'primary'
  }
})
```

## License

MIT - Tabian Co.
