import { createApi } from "unsplash-js";
import { accessKey } from "./constant";

// console.log(accessKey);

export const unsplash = createApi({
  accessKey: accessKey,
});
