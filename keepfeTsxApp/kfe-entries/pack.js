const findPreset = (presets, name) => {
    let index
    presets.map((preset, idx) => {
        if (preset[0].includes(name)){
            index = idx
        }
    })
    return index
}

module.exports = {
  client: {
    injectResolve: function(conf) {
    },
    injectLoader: function(conf) {
        conf.module
        .rule('tsxcompile')
        .use('babelloader')
        .tap(options => {
            options.presets[findPreset(options.presets, 'babel-preset-jsx')].push({
                 compositionAPI: true
            })
            return options
        })
    },
    injectPlugin: function(conf) {
    },
    injectOptimization: function(conf) {
    }
  },
  server: {
    injectResolve: function(conf) {
    },
    injectLoader: function(conf) {
    },
    injectPlugin: function(conf) {
    },
    injectOptimization: function(conf) {
    }
  }
}
