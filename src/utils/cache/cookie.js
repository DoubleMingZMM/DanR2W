/**
 *
 * @copyright(c) 2018
 * @created by  Daniel
 * @package cache
 * @version :  2018-12-11 16:06 $
 *
 * Cookie 实现 cache 类的几个方法
 */

import * as Cookies from 'js-cookie';
import CacheAbstract from './cacheAbstract';

export default class Cookie extends CacheAbstract {
  get(key) {
    key = `${this.prefix}.${key}`;
    const value = Cookies.getJSON(key);

    return value;
  }

  put(key, value, minutes, attributes) {
    key = `${this.prefix}.${key}`;
    minutes = minutes || 0;
    attributes = attributes || {};

    if (minutes !== 0) {
      attributes['expires'] = minutes / (60 * 24);
    }

    Cookies.set(key, value, attributes);
  }

  forget(key) {
    key = `${this.prefix}.${key}`;
    return Cookies.remove(key);
  }

  has(key) {
    return this.get(key) !== undefined;
  }

  flush() {
    const cookies = document.cookie ? document.cookie.split('; ') : [];
    const rdecode = /(%[0-9A-Z]{2})+/g;

    cookies.map((v) => {
      const parts = v.split('=');
      try {
        const key = parts[0].replace(rdecode, decodeURIComponent).replace(`${this.prefix}.`, '');
        if (key) {
          this.forget(key);
        }
      } catch (err) {
        console.error('util.cache.cookie.flush: get err ===>', err);
      }
    });
  }
}
