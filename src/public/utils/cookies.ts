import * as Cookies from "js-cookie";

const cookies = {
  set(
    key: string,
    value: string | object = "",
    option: Cookies.CookieAttributes = {}
  ) {
    const defaultOption = { expires: 7 };
    if (Object.prototype.toString.call(value) === "[object String]") {
      Cookies.set(key, value, Object.assign(defaultOption, option));
    } else {
      Cookies.set(
        key,
        JSON.stringify(value),
        Object.assign(defaultOption, option)
      );
    }
  },

  get<T>(key: string): T | null | string {
    const v = Cookies.get(key);
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return JSON.parse(v!);
    } catch (error) {
      return v || "";
    }
  },

  remove(key: string, option: Cookies.CookieAttributes = {}) {
    Cookies.remove(key, option);
  }
};

export default cookies;
