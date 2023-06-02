const request = require("supertest");
const { hashPassword, comparePassword } = require("../helper/encryption");
const app = require("../app");
const {
  clearPosts,
  clearUser,
  clearBookmarks,
  clearTestRegister,
} = require("../lib/clearDatabase");
const {
  seedEntity,
  seedUser,
  seedBookmark,
  seedCustomer,
} = require("../lib/createItems");
const { signToken, verifyToken } = require("../helper/jwt");

beforeAll(() => {
  seedUser();
  seedCustomer();
  seedEntity();
  seedBookmark();
});

afterAll(() => {
  clearBookmarks();
  clearPosts();
  clearTestRegister();
  clearUser();
});

describe("API Bookmark", () => {
  it("should render bookmarks based on account id and response 200", async () => {
    const access_token = signToken({ id: 2 });
    const response = await request(app).get("/pub/bookmarks").set({
      access_token,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });

  it("should add new row to bookmarks and response 201", async () => {
    const access_token = signToken({ id: 2 });
    const PostId = 4;
    const response = await request(app).get(`/pub/bookmarks/${PostId}`).set({
      access_token,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data[1]).toBe(true);
  });

  it("should fail to add new bookmarks and response 404", async () => {
    const access_token = signToken({ id: 2 });
    const PostId = 400;
    const response = await request(app).get(`/pub/bookmarks/${PostId}`).set({
      access_token,
    });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("data", "Data not found");
  });

  it("should ask customer to login first and response 401", async () => {
    const access_token = "deliberatelyFalsyAccessToken";
    const PostId = 1;
    const response = await request(app).get(`/pub/bookmarks`).set({
      access_token,
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("data", "Please login first!");
  });

  it("should ask customer to login first and response 401", async () => {
    const response = await request(app).get(`/pub/bookmarks`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("data", "Please login first!");
  });
});
