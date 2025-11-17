// --- Variáveis e Configurações ---
// Defina as credenciais de teste
const validUser = {
  email: 'admin@example.com',
  password: '123456'
};

const invalidUser = {
  email: 'invalido@exemplo.com',
  password: 'senhaInvalida'
};

// --- Seletores (Utilizando data-cy) ---
// Note que estes seletores exigem que os atributos data-cy tenham sido adicionados
// aos seus componentes Input e Button.
const selectors = {
  emailInput: '[data-cy="email-input"]',
  passwordInput: '[data-cy="password-input"]',
  loginButton: '[data-cy="login-button"]',
  
  // O componente React usa classes CSS .success e .error
  successMessage: '.success',
  errorMessage: '.error',
};

// --- Suíte de Testes ---
describe('Funcionalidade de Login', () => {
  beforeEach(() => {
    // Visita a página de login
    cy.visit('127.0.0.1');
  });

  // 1. Login com sucesso
  it('1. Deve realizar o login com sucesso e redirecionar para /home', () => {
    cy.log('Cenário: Login com sucesso (API Mocked)');
    
    // MOCKING: Intercepta a chamada POST para o backend e retorna 200 OK
    cy.intercept('POST', 'http://localhost:5000/login', {
      statusCode: 200,
      body: { message: 'Success' }
    }).as('loginSuccess');

    // Ação: Preenche e-mail e senha válidos
    cy.get(selectors.emailInput).type(validUser.email);
    cy.get(selectors.passwordInput).type(validUser.password);

    // Ação: Clica em "Entrar"
    cy.get(selectors.loginButton).click();

    // Aguarda a resposta do mock
    cy.wait('@loginSuccess');

    // **NOTA:** A verificação da mensagem de sucesso foi removida, 
    // pois a navegação imediata em Login.js desmonta o componente 
    // antes que a mensagem possa ser verificada no DOM.
    
    // Verificação: O redirecionamento para /home ocorre
    cy.location('pathname', { timeout: 3500 }).should('eq', '/home');
  });

  // 2. Login com erro
  it('2. Deve falhar o login com credenciais inválidas e exibir mensagem de erro', () => {
    cy.log('Cenário: Login com erro (API Mocked)');

    // MOCKING: Intercepta a chamada POST e retorna 401 Unauthorized
    cy.intercept('POST', 'http://localhost:5000/login', {
      statusCode: 401,
      // Retorna a mensagem que o componente espera
      body: { message: 'Credenciais inválidas' } 
    }).as('loginFailure');
    
    // Ação: Preenche credenciais inválidas
    cy.get(selectors.emailInput).type(invalidUser.email);
    cy.get(selectors.passwordInput).type(invalidUser.password);

    // Ação: Clica em "Entrar"
    cy.get(selectors.loginButton).click();

    // Aguarda a resposta do mock
    cy.wait('@loginFailure');

    // Verificação 1: Permanece na página de login (URL raiz '/')
    cy.location('pathname').should('eq', '/');

    // Verificação 2: É exibida a mensagem de erro esperada
    cy.get(selectors.errorMessage).should('be.visible').and('contain', 'Credenciais inválidas');
  });

  // 3. Botão desabilitado
  it('3. O botão "Entrar" deve ser habilitado/desabilitado conforme os campos são preenchidos', () => {
    cy.log('Cenário: Botão desabilitado');
    
    // Verifica 1a: Botão desabilitado quando ambos os campos estão vazios
    cy.get(selectors.loginButton).should('be.disabled');

    // Verifica 1b: Botão continua desabilitado com apenas o e-mail preenchido
    cy.get(selectors.emailInput).type(validUser.email);
    // cy.get() força o Cypress a buscar o estado mais recente do DOM após o React re-renderizar
    cy.get(selectors.loginButton).should('be.disabled');

    // Verifica 1c: Botão continua desabilitado com apenas a senha preenchida 
    cy.get(selectors.emailInput).clear();
    cy.get(selectors.passwordInput).type(validUser.password);
    cy.get(selectors.loginButton).should('be.disabled');

    // Verifica 2: É habilitado apenas quando ambos os campos estão preenchidos
    cy.get(selectors.emailInput).type(validUser.email);
    // Agora o botão deve estar habilitado
    cy.get(selectors.loginButton).should('not.be.disabled');
  });

  // 4. Campos obrigatórios (Validado pela desabilitação do botão)
  it('4. O formulário deve impedir a submissão com campos vazios (via botão desabilitado)', () => {
    cy.log('Cenário: Campos obrigatórios (Validação por desabilitação)');
    
    // Confirma que o botão está desabilitado quando os campos estão vazios,
    // prevenindo a submissão.
    cy.get(selectors.emailInput).should('have.value', '');
    cy.get(selectors.passwordInput).should('have.value', '');
    cy.get(selectors.loginButton).should('be.disabled');
  });
});