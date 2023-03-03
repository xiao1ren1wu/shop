
import store from "../../store/index"
export default {
    toTargrt(to: any, from: any) {
        if (store.state.lock) {
            return;
        }
        store.commit('setLockBulid', true);
        let timer: any = null;
        var c = document.documentElement.clientHeight
        var sh = document.documentElement.scrollHeight
        let st = document.documentElement.scrollTop
        timer = setInterval(() => {
            if (to > from) {
                if (st >= to || (st + c >= sh - 10 && st + c <= sh + 10)) {
                    store.commit('setLockBulid', false);
                    clearInterval(timer);
                } else {
                    st += Math.ceil((to - st) / 10) < 5 ? 5 : Math.ceil((to - st) / 10)
                }
            } else if (to < from) {
                if (st <= to || st == 0) {
                    store.commit('setLockBulid', false);
                    clearInterval(timer);
                } else {
                    st -= Math.ceil((st - to) / 10) < 5 ? 5 : Math.ceil((st - to) / 10)
                }
            }
            window.scrollTo(0, st)
        }, 15);
    }
}