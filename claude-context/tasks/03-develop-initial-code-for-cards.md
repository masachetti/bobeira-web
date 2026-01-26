# Develop Initial Code for Cards

## Backend

- Choose a architecture that can suit our use case. Make it clean and maintainable
- Write CRUD operations for cards
  - Basic creation
  - Read one and Read all, using user_id to filter which cards can be read
  - Update only user's card
  - Delete only user's card
- For read operations we need to respond with the author user name, choose the option for it based on your judgment if it's possible and what is the best approach
  - Read author user name from keycloak
  - Save user names in a different table
  - Save user name in cards table

## Frontend

- Use Axios as fetch library and replace the fetch with auth function to use an Axios client that includes auth on each request
