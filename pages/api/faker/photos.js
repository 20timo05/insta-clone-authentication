import executeQuery from "../../../database/executeQuery";
import { faker } from "@faker-js/faker";

export default async function handler(req, res) {
  // count photos
  const photosCountQuery = "SELECT COUNT(*) AS count FROM photos";
  const photosCountResult = await executeQuery({ query: photosCountQuery });
  const photosCount = photosCountResult[0].count
  
  let updateQuery = "INSERT INTO photos(image_url, post_id) VALUES "

  for (let i = 1; i <= photosCount; i++) {
    let imageURL = faker.image.nature();
    const result = await fetch(imageURL);
    const imageUrl = result.url
    updateQuery += `("${imageUrl}", ${i}), `
  }

  console.log(updateQuery)
  // copy paste into phpmyadmin sql

 
  res.status(200).json({ hello: "world" });
}
