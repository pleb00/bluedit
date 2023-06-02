const request = require("supertest");
const { hashPassword, comparePassword } = require("../helper/encryption");
const app = require("../app");
const { clearTestRegister } = require("../lib/clearDatabase");
const { createUniqueEmail, createTestLogin } = require("../lib/createItems");

beforeAll(() => {
  createUniqueEmail();
  createTestLogin();
});

afterAll(() => {
  clearTestRegister();
});

describe("API Customer", () => {
  describe("POST /pub/register", () => {
    it("should create account and response 201", async () => {
      const response = await request(app)
        .post("/pub/register")
        .send({
          email: "testRegister@dummy.com",
          password: "test",
        })
        .set("Content-Type", "application/x-www-form-urlencoded");

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        "message",
        "Account successfully created"
      );
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("id", expect.any(Number));
      expect(response.body.data).toHaveProperty(
        "email",
        "testRegister@dummy.com"
      );
      expect(response.body.data).toHaveProperty(
        "password",
        hashPassword("test")
      );
      expect(response.body.data).toHaveProperty("role", "Customer");
      expect(response.body.data).toHaveProperty("updatedAt");
      expect(response.body.data).toHaveProperty("createdAt");
    });

    it("should show message(email not empty) and response 400", async () => {
      const response = await request(app)
        .post("/pub/register")
        .send({
          email: "",
          password: "test",
        })
        .set("Content-Type", "application/x-www-form-urlencoded");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("data", "Email cannot be blank");
    });

    it("should show message(password not empty) and response 400", async () => {
      const response = await request(app)
        .post("/pub/register")
        .send({
          email: "testRegisterNoPassword@dummy.com",
          password: "",
        })
        .set("Content-Type", "application/x-www-form-urlencoded");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("data", "Password cannot be blank");
    });

    it("should show message(email not null) and response 400", async () => {
      const response = await request(app)
        .post("/pub/register")
        .send({
          email: null,
          password: "test",
        })
        .set("Content-Type", "application/x-www-form-urlencoded");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("data", "Email cannot be blank");
    });

    it("should show message(password not null) and response 400", async () => {
      const response = await request(app)
        .post("/pub/register")
        .send({
          email: "testRegisterNullPassword@dummy.com",
          password: null,
        })
        .set("Content-Type", "application/x-www-form-urlencoded");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("data", "Password cannot be blank");
    });

    it("should show message(wrong email format) and response 400", async () => {
      const response = await request(app)
        .post("/pub/register")
        .send({
          email: "testRegisterWrongFormat",
          password: "test",
        })
        .set("Content-Type", "application/x-www-form-urlencoded");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("data", "Email format is incorrect");
    });

    it("should show message(unique email constraint) and response 400", async () => {
      const response = await request(app)
        .post("/pub/register")
        .send({
          email: "testUniqueEmail@gmail.com",
          password: "test",
        })
        .set("Content-Type", "application/x-www-form-urlencoded");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "data",
        "Email has already been used"
      );
    });
  });

  describe("POST /pub/login", () => {
    it("should give an access token and response 200", async () => {
      const response = await request(app)
        .post("/pub/login")
        .send({
          email: "testLogin@gmail.com",
          password: "test",
        })
        .set("Content-Type", "application/x-www-form-urlencoded");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Login Successful");
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("access_token");
      expect(response.body.data).toHaveProperty("id", expect.any(Number));
      expect(response.body.data).toHaveProperty("email", "testLogin@gmail.com");
    });

    it("should give an access token and response 200", async () => {
      const response = await request(app)
        .post("/pub/login")
        .send({
          email: "testLogin@gmail.com",
          password: "deliberatelyFalsePassword",
        })
        .set("Content-Type", "application/x-www-form-urlencoded");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "data",
        "Invalid username or password"
      );
    });

    it("should give an access token and response 200", async () => {
      const response = await request(app)
        .post("/pub/login")
        .send({
          email: "deliberatelyFalseEmail@gmail.com",
          password: "deliberatelyFalsePassword",
        })
        .set("Content-Type", "application/x-www-form-urlencoded");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "data",
        "Invalid username or password"
      );
    });
  });
});
