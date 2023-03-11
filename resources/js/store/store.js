import { createStore } from 'vuex'
import alerts from '@/js/store/alerts/alerts.js'

export const store = createStore({
    modules: {
        alerts,
    }
})