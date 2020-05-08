const busmsg = {
  state: {
    playbook_name: '',
    message: ''
  },
  mutations: {
    SET_PLAYBOOKNAME: (state, playbook_name) => {
      state.playbook_name = playbook_name
    },
    SET_MESSAGE: (state, msg_dict) => {
      state.message = msg_dict.message
      state.playbook_name= msg_dict.playbook_name
    },
  }
}

export default busmsg
