import EnlargeImages from './LargeImg.vue'

export default {
    install(app: any) { 
        app.component(EnlargeImages.name, EnlargeImages)
    }
}
