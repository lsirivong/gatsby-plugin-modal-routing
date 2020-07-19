const { DefinePlugin } = require('webpack')
const path = require('path')

// Gatsby makes taking a componen input difficult, so we need to do this here to load the
// "modalComponentPath" prop, so that replaceComponentRender can access it later
// @see https://stackoverflow.com/questions/62972003/gatsby-plug-in-how-can-i-take-a-component-as-a-plug-in-option
exports.onCreateWebpackConfig = ({ actions }, { modalComponentPath }) => {
  actions.setWebpackConfig({
    plugins: [
      new DefinePlugin({
        '___MODAL_COMPONENT___': JSON.stringify(modalComponentPath)
      })
    ]
  })
}