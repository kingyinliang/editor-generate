import Work from 'core/models/work'
import { actions as workActions, mutations as workMutations } from './work'
import { actions as pageActions, mutations as pageMutations } from './page'
import { actions as elementActions, mutations as elementMutations } from './element'
import { actions as dataSourceActions, mutations as dataSourceMutations } from './data-source'

const state = {
  work: new Work(),
  editingPage: { elements: [] },
  editingElement: null,
  scaleRate: 1
}
const getters = {}
const actions = {
  ...workActions,
  ...pageActions,
  ...elementActions,
  ...dataSourceActions,
  updateScaleRate ({ commit }, payload) {
    commit('updateScaleRate', payload)
  }
}
const mutations = {
  ...workMutations,
  ...pageMutations,
  ...elementMutations,
  ...dataSourceMutations,
  updateScaleRate (state, scaleRateDiff) {
    state.scaleRate += scaleRateDiff
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
