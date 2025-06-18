import { APIResponse, expect, test } from '@playwright/test';
import { IPostData } from '../../typings/interfaces';

test('should return a list of posts', async ({ request }) => {
  const response: APIResponse = await request.get('/posts');
  expect(response.status()).toEqual(200);

  const responseHeaders = response.headers();
  expect(responseHeaders['content-type']).toEqual('application/json; charset=utf-8');

  const responseBody: IPostData[] = await response.json();
  responseBody.forEach(post => console.log(`Post ID: ${post.id}, Title: ${post.title}`));
  expect(responseBody.length).toEqual(100);
});

test("should return a specific post", async ({ request }) => {
  const response = await request.get("/posts/1");

  expect(response.status()).toBe(200);

  const responseBody: IPostData = await response.json();
  expect(responseBody.id).toEqual(1);
  expect(responseBody.title).toEqual("sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
});

test("should create a post", async ({ request }) => {
  const response = await request.post("/posts", {
    data: {
      title: "foo",
      body: "bar",
      userId: 1,
    },
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": "Bearer token",
    },
  });

  expect(response.status()).toBe(201);

  const responseBody: IPostData = await response.json();
  expect(responseBody.id).toBe(101);
});

test("should update a post", async ({ request }) => {
  const response = await request.put("/posts/1", {
    data: {
      id: 1,
      title: "foo",
      body: "bar",
      userId: 1,
    },
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  expect(response.status()).toBe(200);

  const responseBody: IPostData = await response.json();
  expect(responseBody.id).toBe(1);
  expect(responseBody.body).toBe("bar");
  expect(responseBody.title).toBe("foo");
  expect(responseBody.userId).toBe(1);
});

test("should delete a post", async ({ request }) => {
  const response = await request.delete("/posts/1");

  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody, "Response is not empty").toEqual({});
});
