import axios from "axios";
import cheerio from "cheerio";

const OutsideApi = {
  getShoppingList: async (category) => {
    const categoryNumber = {
      feed_dog: 100000708,
      toy_dog: 100000709,
      trainingProduct_dog: 100000707,
      fashion_dog: 100000715,
      feed_cat: 100000720,
      toy_cat: 100000721,
      trainingProduct_cat: 100000719,
      tower_cat: 100000722,
    };
    const res = await axios.get(
      `https://search.shopping.naver.com/search/category/${categoryNumber[category]}`
    );
    const $ = cheerio.load(res.data);
    const script = $("body > script");
    const parsed = JSON.parse(script.text());
    const products = parsed.props.pageProps.initialState.products.list.map(
      ({ item }, idx) => {
        const {
          productTitle,
          imageUrl,
          rank,
          lowPrice,
          scoreInfo,
          reviewCount,
          crUrl,
          category3Name,
        } = item;

        return {
          productTitle,
          imageUrl,
          rank,
          lowPrice,
          scoreInfo,
          reviewCount,
          crUrl,
          category3Name,
        };
      }
    );
    const result = products.filter((item) => item.crUrl).slice(0, 10);
    return result;
  },
};

export { OutsideApi };
