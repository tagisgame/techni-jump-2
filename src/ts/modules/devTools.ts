export default {
    /**
     * Returns true if process is running in a dev environment.
     * 
     * @returns {boolean} whether the process is running in a dev environment
     */
    isInDevEnv: function(): boolean {
        return (process.env.NODE_ENV === 'development');
    },
    /**
     * Sending console.log() only in dev environment and styles the message.
     * 
     * @param {any} message accepts anything. When string - it can be stylized
     * @param {'default' | 'warning' | 'error'} mode accepts only 'default', 'warning' or 'error', changes the style of the log message
     */
    devLog: function(message?: any, mode: 'default' | 'warning' | 'error' = 'default'): void {
        if (!this.isInDevEnv()) return;

        if (typeof message === 'string') {
            const Modes = {
                default: {
                    prefix: '[devLog]',
                    style: 'color:gray; font-weight:bold;'
                },
                warning: {
                    prefix: '[devWarn]',
                    style: 'color:orange; font-weight:bold; font-size:12px;'
                },
                error: {
                    prefix: '[devErr]',
                    style: 'color:red; font-weight:bold; font-size:12px; text-decoration:underline;'
                }
            }

            console.log(`%c${Modes[mode].prefix} ${message}`, Modes[mode].style);
        } else {
            console.log(message);
        }
    }
} 