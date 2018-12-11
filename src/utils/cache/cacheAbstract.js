/**
 *
 * @copyright(c) 2018
 * @created by  Daniel
 * @package cache
 * @version :  2018-12-11 16:06 $
 *
 * cache 抽象类,继承接口,子类必须实现接口方法
 */

'use strict';

import CacheInterface from './cacheInterface'

export default class CacheAbstract extends CacheInterface{
    constructor() {
        super();

        this.prefix = 'DanR2W'
    }

    static expires(time){
        return + new Date() > parseInt(time, 10)
    }
}
