# User and Captain API Documentation

## Endpoints:
1. **[User Registration](#user-registration)**
2. **[User Login](#user-login)**
3. **[User Profile](#user-profile)**
4. **[User Logout](#user-logout)**
5. **[Captain Registration](#captain-registration)**
6. **[Captain Login](#captain-login)**
7. **[Captain Profile](#captain-profile)**
8. **[Captain Logout](#captain-logout)**

---

## Captain Registration

### Endpoint: `/captain/register`

### Method: `POST`

### Description:
This endpoint is used to register a new captain. It validates the input data, hashes the password, and creates a new captain in the database.

---

### Request Body:
The endpoint expects the following fields in the request body:

| Field                | Type   | Required | Description                                      |
|----------------------|--------|----------|--------------------------------------------------|
| `fullname.firstname` | String | Yes      | First name of the captain (minimum 3 characters).|
| `fullname.lastname`  | String | No       | Last name of the captain (minimum 3 characters). |
| `email`              | String | Yes      | A valid email address.                           |
| `password`           | String | Yes      | Password for the captain (minimum 6 characters). |

#### Example Request Body:
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "securepassword"
}
```

---

### Response:

#### Success Response:
- **Status Code:** `201 Created`
- **Description:** Captain registered successfully. Returns the captain details and a JWT token.

```json
{
  "token": "your-jwt-token",
  "captain": {
    "_id": "captain-id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com"
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

2. **Duplicate Email:**
   - **Status Code:** `409 Conflict`
   - **Description:** Email already exists in the database.
   - **Example:**
     ```json
     {
       "message": "Captain already exists"
     }
     ```

---

## Captain Login

### Endpoint: `/captain/login`

### Method: `POST`

### Description:
This endpoint is used to authenticate a captain. It validates the input data, checks the email and password, and returns a JSON Web Token (JWT) if the credentials are valid.

---

### Request Body:
The endpoint expects the following fields in the request body:

| Field       | Type   | Required | Description                     |
|-------------|--------|----------|---------------------------------|
| `email`     | String | Yes      | A valid email address.          |
| `password`  | String | Yes      | The captain's password.         |

#### Example Request Body:
```json
{
  "email": "jane.smith@example.com",
  "password": "securepassword"
}
```

---

### Response:

#### Success Response:
- **Status Code:** `200 OK`
- **Description:** Captain authenticated successfully. Returns a JWT token and captain details.

#### Example Success Response:
```json
{
  "token": "your-jwt-token",
  "captain": {
    "_id": "captain-id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com"
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
           "msg": "Invalid email address",
           "param": "email",
           "location": "body"
         },
         {
           "msg": "Password must be at least 6 characters long",
           "param": "password",
           "location": "body"
         }
       ]
     }
     ```

2. **Invalid Credentials:**
   - **Status Code:** `401 Unauthorized`
   - **Description:** Email or password is incorrect.
   - **Example:**
     ```json
     {
       "message": "Invalid email or password"
     }
     ```

---

## Captain Profile

### Endpoint: `/captain/profile`

### Method: `GET`

### Description:
This endpoint is used to retrieve the profile of the currently authenticated captain. It requires a valid JWT token to access.

---

### Headers:
The request must include the following header:

| Header            | Value            | Required | Description                     |
|-------------------|------------------|----------|---------------------------------|
| `Authorization`   | `Bearer <token>` | Yes      | The JWT token of the captain.   |

---

### Response:

#### Success Response:
- **Status Code:** `200 OK`
- **Description:** Returns the profile of the authenticated captain.

#### Example Success Response:
```json
{
  "captain": {
    "_id": "captain-id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com"
  }
}
```

#### Error Responses:

1. **Unauthorized:**
   - **Status Code:** `401 Unauthorized`
   - **Description:** The captain is not authenticated or the token is invalid.
   - **Example:**
     ```json
     {
       "message": "Authentication failed"
     }
     ```

---

## Captain Logout

### Endpoint: `/captain/logout`

### Method: `GET`

### Description:
This endpoint is used to log out the currently authenticated captain. It clears the JWT token from cookies and blacklists the token.

---

### Headers:
The request must include the following header:

| Header            | Value            | Required | Description                     |
|-------------------|------------------|----------|---------------------------------|
| `Authorization`   | `Bearer <token>` | Yes      | The JWT token of the captain.   |

---

### Response:

#### Success Response:
- **Status Code:** `200 OK`
- **Description:** Logs out the captain and invalidates the token.

#### Example Success Response:
```json
{
  "message": "Logged out successfully"
}
```

#### Error Responses:

1. **Unauthorized:**
   - **Status Code:** `401 Unauthorized`
   - **Description:** The captain is not authenticated or the token is invalid.
   - **Example:**
     ```json
     {
       "message": "Authentication failed"
     }
     ```

---

### Example cURL Requests:

#### Captain Profile:
```bash
curl -X GET http://localhost:3000/captain/profile \
-H "Authorization: Bearer <your-jwt-token>"
```

#### Captain Logout:
```bash
curl -X GET http://localhost:3000/captain/logout \
-H "Authorization: Bearer <your-jwt-token>"
```