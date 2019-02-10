# gatsby-plugin-modal-routing

Adds support for viewing gatsby pages within modals at their gatsby defined routes.

## Install

npm install --save gatsby-plugin-modal-routing

## Motivation

The problem: how to handle modals (stateful routes) with gatsby's page based routing?

We want a modal to open within the context of whatever page it was linked to, change
the browser's URL, and render server-side allowing permalink navigation.

Current Gatsby V2 examples which use `PageRenderer` flicker when re-rendering content
underneath the modal. This plugin aims to handle modal routing edge cases and provide
a consistent rendering experience.

## How to use

**Note that this plugin is currently in alpha, and this API is subject to change**

Add the plugin to your `gatsby-config.js`:

```js
module.exports = {
    plugins: [
      `gatsby-plugin-modal-routing`
    ]
];
```

### Rendering page content in modals

Your gatsby pages will now recieve these props:

- `modal` boolean - indicates if the page content will be rendered in a modal
- `modalCloseTo` string - if the page content is rendering in a modal, denotes the
pathname of the page where the modal was opened, otherwise `null`.

Example:

```
todo
```

### Opening a page in a modal

Use Link state to tell `gatsby-plugin-modal-routing` to the pathname in a modal.

For example, given this existing link to a login page:

```
import { Link } from 'gatsby'

...

<Link
  to="/login/"
>
  Login
</Link>
```

```diff
import { Link } from 'gatsby'

...

 <Link
   to="/login/"
+  state={{
+    modal: true
+  }}
 >
   Login
 </Link>
```

