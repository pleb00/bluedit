# Challenge #1 API Documentation

## Endpoints :

List of available endpoints:

- `POST /admin/register`
- `POST /login`
- `POST /post/add`
- `GET /post/read`
- `GET /post/read/:id`
- `DELETE /post/delete/:id`
- `GET /categories/read`
- `POST /categories/add`
- `DELETE /categories/delete/:id`

&nbsp;

## 1. POST /admin/register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "username": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Failed to create the data"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid username or password"
}
```

&nbsp;

## 3. POST /post

Request:

- header:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "title": "string",
  "content": "string",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "title": "string",
  "content": "string",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Failed to create the data"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Please login first!"
}
```

&nbsp;

## 4. GET /post/read

Description:

- Get all posts from database

Request:

- header:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
      "id": 1,
      "title": "Paradoxurus hermaphroditus",
      "content": "Laceration with foreign body of left lesser toe(s) without damage to nail",
      "imgUrl": "http://dummyimage.com/172x100.png/cc0000/ffffff",
      "categoryId": 1,
      "authorId": 5
    },
    {
      "id": 2,
      "title": "Cynictis penicillata",
      "content": "Traumatic rupture of collateral ligament of left index finger at metacarpophalangeal and interphalangeal joint, subsequent encounter",
      "imgUrl": "http://dummyimage.com/234x100.png/ff4444/ffffff",
      "categoryId": 2,
      "authorId": 5
    }
  ...,
]
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Please login first!"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 5. GET /post/read/:id

Description:

- Read post by id

Request:

- header:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "title": "string",
  "content": "string",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer",
  "createdAt": "string",
  "updatedAt": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Please login first!"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 6. DELETE /post/delete/:id

Description:

- Delete post by id

Request:

- header:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Content with the title ${deleteTarget.dataValues.title} has successfully deleted"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Please login first!"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 7. GET /categories/read

Description:

- Get all categories from database

Request:

- header:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    { "name": "Apiaceae" },
    { "name": "Commelinaceae" },
    { "name": "Grimmiaceae" }
  ...,
]
```

_Response (400 - Bad Request)_

```json
{
  "message": "Data not found"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Please login first!"
}
```

&nbsp;

## 8. POST /categories/add

Description:

- Add a categories into the database

Request:

- header:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Categories successfully created"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Failed to create the data"
}
```

&nbsp;

## 9. DELETE /categories/delete/:id

Description:

- Delete a categories from database based on id

Request:

- header:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Content with the title ${deleteTarget.dataValues.name} has successfully deleted"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Something went wrong with the server"
}
```
