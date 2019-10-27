const api = require('./Ambiente');

const ApiServices = {

    "login": async (matricula, senha) => {
        const res = await api.post('/student/login', {
            "matricula": matricula,
            "password": senha
        });
        return res;
    },
}

export default ApiServices;