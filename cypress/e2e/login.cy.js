describe('Mi prueba e2e', () => {
    it('debe permitir iniciar sesión y ver los pokemones', () => {
      cy.visit('http://localhost:8000/auth/login')
      cy.get('input[name="email"]').type('monoma@monoma.com')
      cy.get('input[name="password"]').type('Pruebas12345.')
      cy.get('button[type="submit"]').click()
      cy.get('h1').should('contain', 'Pokedex')
    })
  })