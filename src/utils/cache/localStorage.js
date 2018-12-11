/**
 *
 * @copyright(c) 2018
 * @created by  Daniel
 * @package cache
 * @version :  2018-12-11 16:06 $
 *
 * localStorage 实现 cacheAbstract 类的几个方法
 */

import CacheAbstract from './cacheAbstract'

export default class LocalStorage extends CacheAbstract{
    get(key){
        key = `${this.prefix}.${key}`
        let item = window.localStorage.getItem(key)

        if (!item) return ''
        item = JSON.parse(item)

        if(typeof item === 'object' && 'expires' in item){
            if(this.constructor.expires(item['expires'])){
                this.forget(key)
                return ''
            }
            return JSON.parse(item['val'])
        }
        return item
    }

    put(key, value, minutes){
        key = `${this.prefix}.${key}`
        minutes = minutes || 0

        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }

        window.localStorage.setItem(key, JSON.stringify({
            'val': value,
            'expires': minutes ? minutes * 1000 * 60 + (+ new Date()) : ''
        }))
    }

    forget(key){
        key = `${this.prefix}.${key}`
        return window.localStorage.removeItem(key)
    }

    has(key){
        key = `${this.prefix}.${key}`
        return window.localStorage.getItem(key) !== null
    }

    flush(){
        return window.localStorage.clear()
    }
}
