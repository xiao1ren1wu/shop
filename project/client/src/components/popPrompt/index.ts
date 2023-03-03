import Prompt from './Prompt.vue'

export default {
    install(app: any) {
        app.component(Prompt.name, Prompt);
    }
}
