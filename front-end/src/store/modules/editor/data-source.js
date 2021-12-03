import Vue from 'vue'
import Datasource from 'core/models/data-source'

export const DS = Vue.observable({ DS: {} })

export const actions = {
  dataSourceManager ({ state }, { type, value }) {
    const dataSourceOrigin = value

    switch (type) {
      case 'add':
        state.work.datasources.push(new Datasource(dataSourceOrigin))
        break
      case 'edit':
        const targetDsIdx = state.work.datasources.findIndex(item => item.id === dataSourceOrigin.id);
        state.work.datasources.splice(targetDsIdx, 1, new Datasource(dataSourceOrigin));
        break
      case 'delete':
        let index = state.work.datasources.findIndex(ds => ds.id === dataSourceOrigin.id)
        if (index !== -1) {
          state.work.datasources.splice(index, 1)
        }
        break
      default:
    }
  }
}

export const mutations = {
  updateDS (state, payload) {
    DS.DS = {
      ...DS.DS,
      ...payload
    }
  },
}
