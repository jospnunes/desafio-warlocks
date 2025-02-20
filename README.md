Como Rodar

1.  Clonar o Repositório


2.  Configurar e Iniciar o Backend

    *   Navegue até a pasta `backend`:

        ```bash
        cd backend
        ```
    *   Instale as dependências:

        ```bash
        npm install
        ```
    *   Copie o arquivo de exemplo de variáveis de ambiente:

        ```bash
        cp .env.example .env
        ```
    *   Edite o arquivo `.env` conforme necessário.
    *   Inicie o servidor em modo de desenvolvimento:

        ```bash
        npm run start:dev
        ```

        O backend iniciará (por padrão, na porta 5000, caso PORT nao tenha sido definido).

3.  Configurar e Iniciar o Frontend

    *   Navegue até a pasta `frontend`:

        ```bash
        cd frontend
        ```
    *   Instale as dependências:

        ```bash
        npm install
        ```
    *   Copie o arquivo de exemplo de variáveis de ambiente:

        ```bash
        cp .env.example .env.local
        ```
    *   Edite o arquivo `.env.local` conforme necessário (URL da API).
    *   Inicie a aplicação:

        ```bash
        npm run dev
        ```

        O frontend estará disponível em `http://localhost:3000`.