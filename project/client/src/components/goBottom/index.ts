export default {
    onScorll(cb: any) {
        function scroll() {
            var c = document.documentElement.clientHeight
            var sh = document.documentElement.scrollHeight
            var st = document.documentElement.scrollTop
            if (st + c >= sh - 10) {
                cb();
            }
        }
        window.removeEventListener('scroll', scroll);
        window.addEventListener('scroll', scroll);
    }
}