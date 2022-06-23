import axios from "axios";
import cheerio from "cheerio";

const getHtml = async () => {
  try {
    return await axios.get(
      "https://www.google.com/search?q=Australian+terrier"
    );
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then((html) => {
    const $ = cheerio.load(html.data);
    const data = $(".Gx5Zad .kCrYT span h3 div").text();

    console.log(data);

    return data;
  })
  .then((res) => console.log(res));
