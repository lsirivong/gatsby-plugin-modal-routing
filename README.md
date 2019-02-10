# gatsby-plugin-modal-routing

Adds support for viewing gatsby pages within modals at their gatsby defined routes.

## Install

```
npm install --save gatsby-plugin-modal-routing
```

## Motivation

The problem: how to handle modals (stateful routes) with gatsby's page based routing?

We want a modal to open within the context of whatever page it was linked to, change
the browser's URL, and render server-side allowing permalink navigation.

Current Gatsby V2 examples which use `PageRenderer` flicker when re-rendering content
underneath the modal. This plugin aims to handle modal routing edge cases and provide
a consistent rendering experience with a flexible API.

## How to use

**Note that this plugin is currently in alpha, and this API is subject to change**

Add the plugin to your `gatsby-config.js`:

```js
// gatsby-config.js

module.exports = {
  plugins: [
    `gatsby-plugin-modal-routing`
  ]
];
```

### Plugin Options

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-modal-routing`,
      options: {
        // A selector to set react-modal's app root to, default is `#___gatsby`
        // See http://reactcommunity.org/react-modal/accessibility/#app-element
        appElement: '#___gatsby',

        // Object of props that will be passed to the react-modal container
        // See http://reactcommunity.org/react-modal/#usage
        modalProps: { },
      }
    }
  ]
];
```

### Rendering page content in modals

Your gatsby pages will now recieve these props:

- `modal` (`boolean`) - indicates if the page content will be rendered in a modal. Use
this to conditionally render modal content like a close button.
- `modalCloseTo` (`string`) - if the page content is rendering in a modal, denotes the
pathname of the page where the modal was opened, otherwise `null`.

Example:

```js
// pages/modal-example.js

import React from 'react'
import { Link } from 'gatsby'

const ModalExamplePage = ({ modal = false, modalCloseTo = null }) => (
  </div>
    {modal ? (
      <Link to={modalCloseTo}>
        Close
      </Link>
    ) : (
      <header>
        <h1>
          Website Title
        </h1>
      </header>
    )}

    <h2>Modal Page</h2>

    <Link to="/">Go back to the homepage</Link>
  </div>
)

exports default ModalExamplePage
```

### Opening a page in a modal

Pass `{ modal: true }` as Link state to open the pathname in a modal.

Example:

```
// src/components/some-component.js

import { Link } from 'gatsby'

...

<Link
  to="/login/"
  state={{
    modal: true
  }}
>
  Login
</Link>
```

