import api from './Ambiente';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const ApiServices = {

    "login": async (matricula, senha) => {
        const res = await api.post('/student/login', {
            "matricula": matricula,
            "password": senha
        });
        if(res.status === 200){
            const sessionClass = res.data.class;
            const sessionNews = res.data.news;
            const sessionProgress = res.data.progress;
            const sessionStudent = res.data.student;
            const jwt = res.data.jwt;
            cookies.set("jwt", jwt, {path: "/"});
            sessionStorage.setItem('APC_sessionClass', JSON.stringify(sessionClass));
            sessionStorage.setItem('APC_sessionNews', JSON.stringify(sessionNews));
            sessionStorage.setItem('APC_sessionProgress', JSON.stringify(sessionProgress));
            sessionStorage.setItem('APC_sessionStudent', JSON.stringify(sessionStudent));
        }
        return res.status;
    },


}

export default ApiServices;