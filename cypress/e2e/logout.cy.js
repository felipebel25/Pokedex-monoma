describe('Mi prueba e2e', () => {
    it('debe permitir deslogearse y redirigir al login', () => {
      cy.visit('http://localhost:8000/auth/login')
      cy.get('input[name="email"]').type('monoma@monoma.com')
      cy.get('input[name="password"]').type('Pruebas12345.')
      cy.get('button[type="submit"]').click()
      cy.get('button[id="profile"]', {timeout:12000}).click()
      cy.get('li[id="logout"]').click()
      cy.get('h1').should('contain', 'Iniciar Sesión')

    })
  })