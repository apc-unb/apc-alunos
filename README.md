# APC-STUDENTS

Este projeto contém a aplicação cliente da API de APC para os alunos da disciplina.

### Instalação

1. Clone o projeto:
```
git clone https://github.com/apc-unb/students-apc.git
```

2. Instale as dependências:
```
cd students-apc
npm install
```

3. Compile os assets:
```
npm run build
```

4. Rode o servidor:
```
npm run start
```

### Iniciando servidor de desenvolvimento

Para evitar ter que manualmente recriar os assets sempre que mudanças forem feitas é possível colocar Webpck em modo Watch:

```
npm run watchs
```

Ou é possível usar um servidor de desenvolvimento do webpack:

```
npm run start-dev
```