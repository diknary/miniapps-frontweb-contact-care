// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Adira Customer Information";
      return args;
    });
  },
  devServer: {
    port: 8081, // CHANGE YOUR PORT HERE!
  },
  transpileDependencies: [
    "vuex-persist",
    "vue-typeahead-bootstrap",
    "vue-simple-suggest",
  ],
};
