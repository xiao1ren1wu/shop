import { get, post } from './http';

const getTypeOne = () => get('/server/getTypeOne', {});
const getSwiper = () => get('/server/banner', {});
const getHottList = () => get('/server/hotList', {});
const getTypeTwo = (p: any) => get(`/server/getTypeTwo?type_one=${p}`, {});
const getGoodList = (p: any) => get(`/server/goodList?type_one=${p}`, {});
const getDetail = (p: any) => get(`/server/detail?goodId=${p}`, {});
const getSameList = (p: any) => get(`/server/sameList?supplier=${p}`, {});
const getSearch = (p: any) => get(`/server/search?word=${p}`, {});
const getNewList = (p: any) => get(`/server/newList?page=${p}`, {});
const loginApi = (p: any) => get(`/server/login?userName=${p.userName}&password=${p.password}`, {});
const registerApi = (p: any) => get(`/server/register?userName=${p.userName}&password=${p.password}`, {});
const getShopList = (p: any) => get(`/server/shopList?token=${p}`, {});
const getCarAdd = (p: any) => get(`/server/add?token=${p.token}&goodId=${p.goodId}`, {});
const carChangeApi = (p: any) => {
    switch (p.type) {
        case 'add':
            return get(`/server/add?token=${p.token}&goodId=${p.goodId}`, {})
        case 'sub':
            return get(`/server/remove?token=${p.token}&goodId=${p.goodId}`, {})
        case 'del':
            return get(`/server/del?token=${p.token}&goodId=${p.goodId}`, {})
    }
};
// 192.168.1.108:1024
const getShopMsg = (p: any) => get(`/server/supplierList?supplier=${p.supplier}&page=${p.page}`, {});

export {
    getTypeOne,
    getSwiper,
    getHottList,
    getTypeTwo,
    getGoodList,
    getDetail,
    getSameList,
    getSearch,
    getNewList,
    loginApi,
    registerApi,
    getShopList,
    getCarAdd,
    carChangeApi,
    getShopMsg
}