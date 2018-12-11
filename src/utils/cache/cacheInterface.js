/**
 *
 * @copyright(c) 2018
 * @created by  Daniel
 * @package cache
 * @version :  2018-12-11 16:06 $
 *
 * cache 接口类,假装 es6/7 支持接口
 */

'use strict';

export default class CacheInterface{
    constructor() {

    }

    // 这是几个接口方法，需要子类去实现

    get(key){}

    put(key, value, minutes){}

    forget(key){}

    has(key){}

    flush() {}
}

