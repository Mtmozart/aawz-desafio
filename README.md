# Documentação Completa - Desafio Front-End

## Visão Geral
Este projeto foi desenvolvido como parte do processo seletivo para a vaga de estágio. A aplicação consiste em um sistema de cadastro de usuários com gráficos de distribuição, utilizando **Vue.js**, **Vuex**, **Chart.js** e outras tecnologias. O projeto foi hospedado na plataforma **Vercel**.

**Link de Deploy:** [https://aawz-front.vercel.app/#/](https://aawz-front.vercel.app/#/)

## Tecnologias Utilizadas
- **VueJS**: Framework principal para desenvolvimento da interface.
- **Vuex**: Biblioteca para gerenciamento de estado da aplicação.
- **Axios**: Realiza requisições para APIs externas, como a API ViaCEP.
- **Chart.js**: Utilizado para gerar gráficos de distribuição de usuários.
- **Vitest**: Framework de testes unitários.
- **Vuelidate**: Biblioteca para validação de formulários.
- **Vue3-Toastify**: Para exibição de notificações de sucesso ou erro.

## Funcionalidades Implementadas
### 1. Formulário de Cadastro de Usuário
O formulário permite o cadastro de usuários com os seguintes campos:
- **Nome**: Campo obrigatório.
- **E-mail**: Campo obrigatório e validado como e-mail.
- **Endereço**: Preenchido automaticamente ao informar o CEP através da API ViaCEP.
- **Origem**: Seleção entre "Digital" ou "Físico".

A validação dos campos é feita utilizando a biblioteca `@vuelidate/validators` para garantir que todos os dados inseridos estão corretos.

### 2. Resumo de Distribuição dos Usuários
São gerados gráficos para mostrar:
- A distribuição dos usuários por **estado**.
- A distribuição dos usuários por **origem** (Digital ou Físico).
Esses gráficos são gerados utilizando a biblioteca **Chart.js**.

### 3. Tabela de Usuários
Uma tabela apresenta todos os usuários cadastrados, com os seguintes dados:
- Nome
- E-mail
- Endereço
- Origem

A tabela é paginada para facilitar a visualização quando há muitos usuários cadastrados.

### 4. Roteamento com Vue Router
O projeto utiliza **Vue Router** para navegar entre as páginas da aplicação:
- Página inicial com o formulário de cadastro.
- Página de visualização dos usuários cadastrados e gráficos de distribuição.

### 5. Testes com Vitest
Foram implementados testes unitários para validar as funcionalidades do **formulário de cadastro**:
- Testes de renderização dos campos de formulário.
- Validações de campos como e-mail, nome e origem.
- Feedback visual com notificações de sucesso e erro (via **vue3-toastify**).

## Instruções de Execução

### Instalação
1. **Clone o repositório** para sua máquina local.
2. Execute o comando abaixo para instalar as dependências:
   ```bash
   npm install
   ```

### Execução Local
Para rodar o projeto em ambiente de desenvolvimento:
```bash
npm run serve
```

Acesse a aplicação no navegador pelo endereço: `http://localhost:8080`.

### Build para Produção
Para gerar a versão otimizada para produção:
```bash
npm run build
```

### Linting de Código
Para verificar e corrigir automaticamente problemas de formatação de código:
```bash
npm run lint
```

### Execução de Testes
Para rodar os testes unitários utilizando **Vitest**:
```bash
npm run teste
```


