# gatsby-plugin-modal-routing

Adds support for viewing gatsby pages within modals at their gatsby defined routes.

## Examples

- https://gatsby-starter-with-gatsby-plugin-modal-routing.netlify.com/
- https://gatsbygram-with-gatsby-plugin-modal-routing.netlify.com/

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

Any gatsby page may be rendered in a modal if it is routed to appropriately (see next
section below for creating a modal link).

The `ModalRoutingContext` React.Context component can be used to conditionally render
content if the page is rendered in a modal.

The Context consumer is passes an object with `modal` and `closeTo` properties to it's
child render function

- `modal` (`boolean`) - indicates if the page content will be rendered in a modal. Use
this to conditionally render modal content like a close button.
- `closeTo` (`string`) - if the page content is rendering in a modal, denotes the
pathname of the page where the modal was opened, otherwise `null`.

Example:

```js
// pages/modal-example.js

import React from 'react'
import { Link } from 'gatsby'
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing'

const ModalExamplePage = () => (
  <ModalRoutingContext.Consumer>
    {({ modal, closeTo }) => (
      <div>
        {modal ? (
          <Link to={closeTo}>
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
    )}
  </ModalRoutingContext.Consumer>
)

export default ModalExamplePage
```

### Opening a page in a modal

Pages can be opened in a modal context by passing the `{ modal: true }` flag to Link state.

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

`gatsby-plugin-modal-routing` also provides a `Link` component as a convenience to encapsulate
this flag for you.

This is equivalent to the example above:

```
// src/components/some-component.js

import { Link } from 'gatsby-plugin-modal-routing'

...

<Link
  to="/login/"
  asModal
>
  Login
</Link>
```

## Scroll State

When the site opens a modal, gatsby's default scroll update is prevented, so that the
underlying page remains scrolled at the same position.

When routing to a non-modal page **from** a modal, gatsby's default scroll update is
allowed, causing the page to scroll to the top. This is the case even if the non-modal
page is the same as the underlying page.

To prevent this, pass the `{ noScroll: true }` flag to Link state.

```
// src/components/modal-content.js

import { Link } from 'gatsby'

...

<Link
  to="/"
  state={{
    noScroll: true
  }}
>
  Close Modal
</Link>
```

As a convenience, this plugin's `Link` component will detect if the `to` pathname matches the
content rendered under the modal and set the `noScroll` flag for you.

```
// src/components/modal-content.js

import { Link } from 'gatsby-plugin-modal-routing'

...

<Link
  to="/"
>
  Close Modal
</Link>
```

To prevent scrolling on the underlying page **after** navigation to a modal is complete, see [this thread](https://github.com/reactjs/react-modal/issues/191) for different strategies.
