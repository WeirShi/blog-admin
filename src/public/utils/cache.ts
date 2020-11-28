/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 缓存数据优化

 * 使用方法 【
 *     一、设置缓存
 *         string    cache.put('k', 'string你好啊');
 *         json      cache.put('k', { "b": "3" }, 2);
 *         array     cache.put('k', [1, 2, 3]);
 *         boolean   cache.put('k', true);
 *     二、读取缓存
 *         默认值    cache.get('k')
 *         string    cache.get('k', '你好')
 *         json      cache.get('k', { "a": "1" })
 *     三、移除/清理
 *         移除: cache.remove('k');
 *         清理：cache.clear();
 * 】
 * @type {String}
 */
const storage: Storage | null =
  window.Storage &&
  window.localStorage &&
  window.localStorage instanceof Storage
    ? window.localStorage
    : window.Storage &&
      window.sessionStorage &&
      window.sessionStorage instanceof Storage
    ? window.sessionStorage
    : null;

class Cache {
  constructor(storage: Storage | null) {
    this.storage = storage;
  }
  postfix = "wsblog"; // 缓存前缀

  storage: Storage | null = null;

  /**
   * 设置缓存
   * @param  {String} k [键名]
   * @param  {String | Object | Array | Number} v [键值] string object array number
   * @param  {Number} t [时间、单位秒]
   */
  public set(
    k: string,
    v: string | Record<string, any> | Array<any> | number,
    t?: number
  ): void {
    this.storage?.setItem(k, JSON.stringify(v));
    const seconds = t || 0;
    if (seconds > 0) {
      let timestamp = new Date().getTime();
      timestamp = timestamp / 1000 + seconds;
      // uni.setStorageSync(k + postfix, timestamp + "");
      this.storage?.setItem(k + this.postfix, timestamp + "");
    } else {
      this.storage?.removeItem(k + this.postfix);
    }
  }

  /**
   * 获取缓存
   * @param  {string} k   [键名]
   * @param  {[type]} def [获取为空时默认]
   */
  public get(
    k: string,
    def?: string | Record<string, any> | Array<any> | number
  ): string | Record<string, any> | Array<any> | number {
    const deadtime: string | null | undefined = this.storage?.getItem(
      k + this.postfix
    );
    if (deadtime) {
      if (Number(deadtime) < new Date().getTime() / 1000) {
        if (def) {
          return def;
        } else {
          return "";
        }
      }
    }
    const res = this.storage?.getItem(k);
    if (res) {
      return JSON.parse(res);
    } else {
      if (def === undefined || def === "") {
        def = "";
      }
      return def;
    }
  }

  public remove(k: string): void {
    this.storage?.removeItem(k);
    this.storage?.removeItem(k + this.postfix);
  }

  public clear(): void {
    this.storage?.clear();
  }
}

export default new Cache(storage);
