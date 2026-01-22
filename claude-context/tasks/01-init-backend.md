# Init backend project

Start the backend part for me, considering this:

- Use NodeJs and express
- Use keycloak nodejs adapter
- Create two initial endpoints:
  - One public
  - One private (keycloak authentication protected)
  - For the private endpoint, log user data
- Use sqlite for DB and Prisma for ORM
- Create cards table with columns:
  - title
  - description
  - score
  - author-user-id (from keycloak user data)
