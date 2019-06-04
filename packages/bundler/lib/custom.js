const { success } = require('./helpers/log')('proton-bundler');

const defaultHook = [];

/**
 * Allow custom extend of the deploy process via a config files
 * We will try to load the proton.bundler.js in the user's app dir
 * if there is one.
 * We will use it to extend our config
 *
 * Format:
 *     (deployConfig) => {
 *
 *         return {
 *             EXTERNAL_FILES,
 *             hookPreTasks: [...task]
 *             hookPostTasks: [...task]
 *             hookPostTaskClone: [...task]
 *             hookPostTaskBuild: [...task]
 *         }
 *     }
 *
 * deployConfig:
 *     - branch: branch's name
 *     - appMode: Type of app we build, standalone or bundle (default)
 *     - isCI: Boolean
 *     - flowType: Type of deploy ('single', or 'many')
 *     - forceI18n: Boolean
 *     - EXTERNAL_FILES: List of assets to copy before the build
 *
 * context:
 *     - originCommit: Commit from where we create the deploy
 *     - originBranch: Branch from where we create the deploy
 *     - tag: Tag from where we deploy (usefull for prod)
 *
 *
 * @param  {Object} cfg Our own configuration
 * @return {Object}
 */
function extend(cfg) {
    try {
        const fromUser = require(path.join(process.cwd(), 'proton.bundler.js'));

        if (typeof fromUser !== 'function') {
            const msg = [
                '[proton-bundler] Error',
                'The custom config from proton.bundler.js must export a function.',
                ''
            ].join('\n');
            console.error(msg);
            process.exit(1);
        }

        const config = fromUser(cfg);
        success('Found proton.bundler.js');
        return config;
    } catch (e) {
        return {
            EXTERNAL_FILES: cfg.EXTERNAL_FILES,
            hookPreTasks: defaultHook,
            hookPostTasks: defaultHook,
            hookPostTaskClone: defaultHook,
            hookPostTaskBuild: defaultHook
        };
    }
}

module.exports = extend;
