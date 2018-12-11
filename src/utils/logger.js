/**
 *
 * @copyright(c) 2018
 * @created by  Daniel
 * @package logger
 * @version :  2018-12-11 16:06 $
 */

export default class Logger {
    static print(level, ...message){
        let globalLevel = window.LOG_LEVEL || 'debug'
        let levels = ['debug', 'info', 'warn', 'error']

        if(levels.indexOf(level) >= levels.indexOf(globalLevel)){
            message.unshift('[DanR2W]')
            if(level in console){
                console[level](...message);
            }else{
                console.log(...message)
            }
        }
    }
    static debug(...message){
        return Logger.print('debug', ...message)
    }
    static info(...message){
        Logger.print('info', ...message)
    }
    static warn(...message){
        Logger.print('warn', ...message)
    }
    static error(...message){
        Logger.print('error', ...message)
    }
}
