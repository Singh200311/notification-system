# Notification Service

### Features
- Send Email, SMS (mocked), In-App notifications
- REST API with two endpoints
- Queue simulation and retry for email failures

### How to Run

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. POST /notifications
```json
{
  "userId": "user1",
  "type": "email",
  "message": "Welcome to the service!"
}
```

4. GET /users/user1/notifications

### Assumptions
- SMS and Email are mocked (real email uses Nodemailer test account)
- No authentication is implemented