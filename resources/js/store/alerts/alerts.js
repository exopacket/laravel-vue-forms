export default {
    namespaced: true,
    state: {
        modalVisible: false,
        modalComponent: null,
    },
    mutations: {
        showAlert(state, componentName) {
            state.modalVisible = true;
            state.modalComponent = componentName;
        },
        hideAlert(state) {
            state.modalVisible = false;
        },
    }
}