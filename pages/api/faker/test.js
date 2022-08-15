import executeQuery from "../../../database/executeQuery";
import { faker } from "@faker-js/faker";

export default async function handler(req, res) {
  // count users
  const usersCountQuery = "SELECT COUNT(*) AS count FROM users";
  const usersCountResult = await executeQuery({ query: usersCountQuery });
  const usersCount = usersCountResult[0].count
  
  let postQuery = "INSERT INTO posts(user_id, created_at, caption) VALUES";

  for (let i = 1; i <= usersCount; i++) {
    const postCountResponse = await fetch(`${process.env.BASE_URL}/api/posts/getUserPosts/${i}`)
    const postCountData = await postCountResponse.json()
    const postCount = postCountData.posts.length

    for (let j = 0; j < postCount; j++) {
      const created_at = new Date(faker.date.between()).toISOString().slice(0, 19).replace('T', ' ');
      const caption = faker.lorem.paragraph()
      postQuery += `(${i}, "${created_at}", "${caption}"), `
    }
  }

  // copy paste into phpmyadmin sql
  console.log(postQuery)
 
  res.status(200).json({ hello: "world" });
}
