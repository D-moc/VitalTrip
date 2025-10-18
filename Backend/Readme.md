# User Registration API Documentation

## Endpoint: `/user/register`

### Method: `POST`

### Description:
This endpoint is used to register a new user. It validates the input data, hashes the password, and creates a new user in the database. Upon successful registration, it returns a JSON Web Token (JWT) and the user details.

---

### Request Body:
The endpoint expects the following fields in the request body:

| Field                | Type   | Required | Description                                      |
|----------------------|--------|----------|--------------------------------------------------|
| `fullname.firstname` | String | Yes      | First name of the user (minimum 3 characters).   |
| `fullname.lastname`  | String | No       | Last name of the user (minimum 3 characters).    |
| `email`              | String | Yes      | A valid email address.                           |
| `password`           | String | Yes      | Password for the user (minimum 6 characters).    |

#### Example Request Body:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

---

### Response:

#### Success Response:
- **Status Code:** `201 Created`
- **Description:** User registered successfully. Returns a JWT token and user details.

```json
{
  "token": "your-jwt-token",
  "user": {
    "_id": "user-id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### Error Responses:

1. **Validation Error:**
   - **Status Code:** `400 Bad Request`
   - **Description:** Input validation failed. Returns an array of validation errors.
   - **Example:**
     ```json
     {
       "errors": [
         {
           "msg": "First name must be at least 3 characters long",
           "param": "fullname.firstname",
           "location": "body"
         },
         {
           "msg": "Invalid email address",
           "param": "email",
           "location": "body"
         }
       ]
     }
     ```

2. **Missing Fields:**
   - **Status Code:** `400 Bad Request`
   - **Description:** Required fields are missing.
   - **Example:**
     ```json
     {
       "errors": [
         {
           "msg": "All fields are required"
         }
       ]
     }
     ```

3. **Duplicate Email:**
   - **Status Code:** `409 Conflict`
   - **Description:** Email already exists in the database.
   - **Example:**
     ```json
     {
       "error": "Email already exists"
     }
     ```

---

### Notes:
- Ensure that the `Content-Type` header is set to `application/json` when making requests.
- The `password` field is hashed before being stored in the database.
- The JWT token is signed using the secret key defined in the `JWT_SECRET` environment variable.

---

### Environment Variables:
- `JWT_SECRET`: Secret key used to sign the JWT token.

---

### Example cURL Request:
```bash
curl -X POST http://localhost:3000/user/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}'
```
