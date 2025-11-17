# **Realizando Testes de Software em Plataforma de Autenticação com React, Flask e PostgreSQL em Containers Docker**

Este documento apresenta a arquitetura, os fundamentos técnicos e os procedimentos de execução relacionados ao desenvolvimento de uma plataforma de autenticação composta por uma interface React, uma API em Flask e um banco de dados PostgreSQL, todos executados em contêineres Docker. O objetivo é descrever a estrutura do sistema e os métodos utilizados para validação do comportamento funcional por meio de testes end-to-end.

---

## Estrutura Geral do Sistema

A plataforma é organizada em três módulos principais: o frontend desenvolvido em React e servido por Nginx, a API de autenticação desenvolvida em Flask e o banco de dados PostgreSQL responsável pela persistência dos dados. Cada componente é encapsulado em um contêiner isolado, comunicando-se por meio de uma rede interna definida via Docker Compose. Essa organização assegura padronização do ambiente e elimina discrepâncias comuns em sistemas distribuídos.

A API expõe endpoints REST responsáveis pela validação de credenciais, retornando respostas em JSON. O contêiner do PostgreSQL é inicializado com um script SQL que cria a tabela de usuários e insere dados iniciais, permitindo o fluxo de autenticação assim que o ambiente estiver operacional.

---

## Observação sobre o Tratamento de Senhas

O sistema, na forma atual, **não emprega hashing criptográfico para armazenamento de senhas**. As credenciais são registradas e comparadas em texto claro, uma escolha deliberada para fins de experimentação e estudo arquitetural. Em aplicações de produção, a adoção de algoritmos como bcrypt, argon2 ou scrypt seria obrigatória.

---

## Usuário Padrão para Testes Automatizados

O projeto inclui um usuário padrão criado exclusivamente para testes end-to-end executados com Cypress. As credenciais são definidas nas variáveis de ambiente dos testes e inseridas automaticamente no banco de dados pelo script `init.sql`. Dessa forma, todos os cenários de teste operam sobre um estado consistente da aplicação.

---

## Metodologia e Fundamentos Técnicos

O frontend utiliza rotas declarativas e comunicação assíncrona com a API. O backend em Flask implementa componentes independentes para lógica de requisição e interação com o banco de dados. O Docker Compose orquestra os serviços, garantindo reprodutibilidade do ambiente e uma configuração determinística para execução e testes.

A estratégia de desenvolvimento prioriza modularidade, isolamento de responsabilidades e capacidade de inspeção do comportamento integrado da aplicação, assegurando clareza no fluxo de comunicação entre os contêineres.

---

## Processo de Testes

A validação da aplicação ocorre por meio de testes end-to-end utilizando Cypress. Esse mecanismo reproduz o comportamento de um usuário real ao interagir com o frontend, enviando credenciais, interpretando respostas da API e avaliando estados da interface. Os cenários incluem autenticação bem-sucedida, tratamento de erros e análise de comportamentos condicionais da interface.

A execução dos testes exige que todos os contêineres estejam ativos, garantindo que o ambiente esteja em estado estável antes da verificação.

---

## Considerações sobre a API REST

A API segue princípios RESTful, utilizando métodos HTTP de forma semântica. Cada endpoint corresponde a uma operação específica do domínio da autenticação, com retorno em JSON. A modularidade do backend favorece extensibilidade e facilita a evolução da aplicação.

---

## Conclusão

A plataforma demonstra o emprego de práticas que priorizam isolamento, reprodutibilidade e verificabilidade. A integração entre React, Flask e PostgreSQL, organizada por Docker Compose, estabelece uma arquitetura consistente e adequada para experimentos de validação funcional. O Cypress reforça a confiabilidade do sistema ao permitir observações empíricas sobre o comportamento da aplicação em condições próximas às de uso real.

---

# **Instruções de Execução**

## 1. Preparação

Certifique-se de possuir:

* Docker Engine
* Docker Compose
* Node.js e npm (caso o Cypress seja executado localmente)

A estrutura do projeto deve permanecer inalterada, mantendo o arquivo `docker-compose.yaml` no diretório raiz.

---

## 2. Inicialização dos Serviços

A partir da pasta `pagina`, execute:

```
docker compose up --build
```

Este comando cria as imagens, monta volumes, configura a rede interna e inicia os contêineres do frontend, backend e banco de dados.

---

## 3. Disponibilização da Aplicação

Após a inicialização:

* PostgreSQL executará o script de criação e inserção inicial.
* A API Flask estará disponível na porta definida.
* O frontend será servido pelo Nginx.

A aplicação pode ser acessada em:

```
http://localhost
```

---

## 4. Execução dos Testes Cypress

Com os serviços em execução, navegue até o diretório dos testes e utilize:

Modo interativo:

```
npx cypress open
```

Modo automático:

```
npx cypress run
```

O Cypress validará o fluxo completo de autenticação e inspecionará requisições enviadas à API.

---

## 5. Encerramento

Para desligar os serviços:

```
docker compose down
```

Para desligar e remover volumes (reinicializando o banco):

```
docker compose down -v
```

---

## Arquitetura Geral — Resumo Prático

**Frontend (React)**
Porta exposta: `3000`

**API Flask**
Porta exposta: `5000`

**PostgreSQL**
Porta exposta: `5432`

**Testes Cypress**
Executados externamente, validando o ambiente containerizado.

---

## Finalidade do Projeto

O repositório tem como objetivo permitir:

* estudo de fluxos de autenticação
* demonstração prática de testes end-to-end
* compreensão de comunicação entre serviços containerizados
* experimentação em ambiente controlado e reproduzível

