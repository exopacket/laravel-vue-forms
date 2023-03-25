

export default {
    namespaced: true,
    state: {
        modalVisible: false,
        modalComponent: null,
        toastVisible: false,
        toastLoading: false,
        toastStyle: -1,
        toastMessage: '',
    },
    mutations: {
        showAlert(state, componentName) {
            state.modalVisible = true;
            state.modalComponent = componentName;
        },
        hideAlert(state) {
            state.modalVisible = false;
        },
        createToast(state, { message, style, timeout = 2500 }) {
            if(style === 1) {
                state.toastLoading = true;
                state.toastMessage = message;
                state.toastStyle  = style;
                state.toastVisible = true;
            } else if(style > 1) {
                state.toastLoading = false;
                state.toastMessage = message;
                state.toastStyle  = style;
                state.toastVisible = true;
                if(timeout !== false) {
                    setTimeout(function () {
                        state.toastLoading = false
                        state.toastMessage = ''
                        state.toastStyle = -1
                        state.toastVisible = false
                    }, timeout)
                }
            }
        },
    },
    actions: {
        showToast({commit, state}, { message, style }) {
            commit("createToast", { message: message, style: style })
        }
    }
}