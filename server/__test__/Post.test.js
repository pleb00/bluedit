const request = require("supertest");
const app = require("../app");
const { seedEntity, seedUser } = require("../lib/createItems");
const { clearPosts, clearUser } = require("../lib/clearDatabase");
beforeAll(() => {
  seedUser();
  seedEntity();
});

afterAll(() => {
  clearPosts();
  clearUser();
});

describe("API Post", () => {
  describe("GET /pub/posts", () => {
    it("should render all post and response 200", async () => {
      const response = await request(app).get("/pub/posts");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty(
        "totalPost",
        expect.any(Number)
      );
      expect(response.body.data).toHaveProperty("page", null);
      expect(response.body.data).toHaveProperty("limit", null);
      expect(response.body.data).toHaveProperty("posts");
    });

    it("should render query filtered posts and response 200", async () => {
      const input = {
        search: "p",
      };
      const response = await request(app).get("/pub/posts").query(input);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty(
        "totalPost",
        expect.any(Number)
      );
      expect(response.body.data).toHaveProperty("page", null);
      expect(response.body.data).toHaveProperty("limit", null);
      expect(response.body.data).toHaveProperty("search", input.search);
      expect(response.body.data).toHaveProperty("posts");
    });

    it("should render query filtered posts, page, limit and response 200", async () => {
      const input = {
        count: 5,
        page: 1,
        search: "p",
      };
      const response = await request(app).get("/pub/posts").query(input);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty(
        "totalPost",
        expect.any(Number)
      );
      expect(response.body.data).toHaveProperty("page", input.page);
      expect(response.body.data).toHaveProperty("limit", input.count);
      expect(response.body.data).toHaveProperty("search", input.search);
      expect(response.body.data).toHaveProperty("posts");
    });

    it("should render specific post and response 200", async () => {
      const input = 7;
      const response = await request(app).get(`/pub/posts/${input}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("id", input);
    });

    it("should not render any data and response 404", async () => {
      const input = 0;
      const response = await request(app).get(`/pub/posts/${input}`);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("data", "Data not found");
    });
  });
});
