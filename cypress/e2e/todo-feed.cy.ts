const BASE_URL = "http://localhost:3000/";

describe("/ - Todos Feed", () => {
  it("when load, renders the page", () => {
    // Trailing Slash
    cy.visit(BASE_URL);
  });
  it("when create a new todo, it appears in the screen", () => {
    // 0 - Interceptação/Interceptações
    cy.intercept("POST", `${BASE_URL}/api/todos`, (request) => {
      request.reply({
        statusCode: 201,
        body: {
          todo: {
            id: "207104b1-cc4c-41cf-9d04-db1b296a7076",
            date: "2024-05-13T21:10:25.641Z",
            content: "Test todo",
            done: false,
          },
        },
      });
    }).as("createTodo");
    // 1 - Abrir a página
    cy.visit(BASE_URL);
    // 2 - Selecionar o input de criar nova todo
    const $inputAddTodo = cy.get("input[name='add-todo']");
    // 3 - Digitar no input de criar nova todo
    $inputAddTodo.type("Test todo");
    // 4 - Clicar no botão
    const $btnAddTodo = cy.get("[aria-label='Adicionar novo item']");
    $btnAddTodo.click();
    // 5 - Checar se na página surgiu um novo elemento
    cy.get("table > tbody").contains("Test todo");
  });
});
