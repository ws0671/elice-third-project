import axios from "axios";
import cheerio from "cheerio";

const getHtml = async () => {
  try {
    return await axios.get(
      "https://www.google.com/search?q=Australian+terrier&oq=Australian+terrier"
    );
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then((html) => {
    const $ = cheerio.load(html.data);
    const data = $(
      "body > div.main > div.e9EfHf > div.GyAeWb > div.TQc1id > div.I6TXqe > div.osrp-blk > div.SzZmKb > div.SPZz6b > h2 > span"
    ).text();

    console.log(data);

    return data;
  })
  .then((res) => console.log(res));
