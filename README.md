# APC-STUDENTS

Este projeto contém a aplicação cliente da API de APC para os alunos da disciplina.

- [APC-STUDENTS](#apc-students)
    - [Instalação](#instala%c3%a7%c3%a3o)
    - [Iniciando servidor de desenvolvimento](#iniciando-servidor-de-desenvolvimento)
- [Criando a imagem a partir do Dockerfile](#criando-a-imagem-a-partir-do-dockerfile)


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

Para evitar ter que manualmente recriar os assets sempre que mudanças forem feitas é possível colocar Webpck em modo Watch (requer dois comandos):

```
npm run watch &
npm run start
```
O primeiro comando inicia o webpack em modo "watch", ou seja, ele vai fazer o build dos assets do projeto sempre que detectar mudanças. O &amp; coloca o comando para ser executado em background mas ainda attached ao terminal, entâo irá mostrar os outputs, mas ainda permite que o segundo comando seja executado no mesmo terminal.

O segundo inicia o servidor da aplicação mesmo.

# Criando a imagem a partir do Dockerfile

O Dockerfile descreve o ambiente de produção. Para ele só vão os assets construídos pelo Webpack, então temos que fazer um passo a mais:

1. Faça o build do projeto

```
npm run build
```

2. Crie a imagem

```
docker build --rm -f "Dockerfile" -t apc-students:latest .
```

E para executar a imagem lembre-se de fazer o bind das portas:

```
docker run -i -p 8001:8001/tcp apc-students:latest
```