import homeBg from '@/assets/images/placeholder.gif';

export default {
    install(app: any) {
        function scroll(el: any, binding: any) {
            if (el.src == binding.value) return
            let clietH = window.innerHeight;
            var scrollTop = document.documentElement.scrollTop;
            let x = scrollTop + clietH - el.offsetTop;
            if (x > 10) {
                el.src = binding.value
            } else {
                el.src = homeBg
            }
        }
        app.directive('lazy', {
            mounted(el: any, binding: any) {
                scroll(el, binding);
                // scroll.bind(scroll, el, binding)
                window.addEventListener('scroll', ()=>{
                    scroll(el, binding);
                });
            },
        })
    }
}