import is from "@sindresorhus/is";
import { dogsService } from "../services/dogsService";
import axios from "axios";

class dogsController {
  static getDogs = async (req, res, next) => {
    try {
      const { dogId } = req.query;
      const findDog = await dogsService.findDogs({
        dogId,
      });

      res.status(201).json(findDog);
    } catch (error) {
      next(error);
    }
  };
  static findDogs = async (req, res, next) => {
    try {
      const previewImg = req.body;
      console.log(previewImg);
      //   const serverUrl = "http://localhost:8080";

      //   const dataURLToFile = (dataURL, fileName) => {
      //     const arr = dataURL.split(",");
      //     console.log(arr);
      //     const mime = arr[0].match(/:(.*?);/)[1];
      //     const bstr = atob(arr[1]);
      //     let n = bstr.length;
      //     const u8arr = new Uint8Array(n);

      //     while (n--) {
      //       u8arr[n] = bstr.charCodeAt(n);
      //     }
      //     return new File([u8arr], fileName, { type: mime });
      //   };

      //   async function post(endpoint, previewImg) {
      //     const file = dataURLToFile(previewImg.src, previewImg.name);
      //     const formData = new FormData();
      //     formData.append("image", file);
      //     return axios
      //       .post(serverUrl + endpoint, formData, {
      //         headers: {
      //           "Content-Type": "multipart/form-data",
      //         },
      //       })
      //       .then((res) => res)
      //       .catch((error) => error.response);
      //   }
      //   const result = await post("/predictdog", previewImg);
      //   res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export { dogsController };
