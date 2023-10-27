import { DanDanDanmaku } from "@/ddanmaku";
import { sendNotification } from "@/utils";

/**
 * @description: 为jellyfin添加弹幕切换显示按钮
 * @param {DanDanDanmaku} ddd
 * @return {*}
 */
const displayButtonOpts = (ddd: DanDanDanmaku): any => {
    return {
        title: ddd.locales.displayBtnTitle,
        id: 'displayDanmaku',
        class: '',
        onclick: () => {
            if (ddd.status === PluginStatus.INITIALIZING) {
                window.showDebugInfo(ddd.locales.log.loading);
                return;
            }
            window.showDebugInfo('切换弹幕开关');
            if (ddd.configs.enableDanmaku) {
                ddd.setConfig('enableDanmaku', false);
            } else {
                ddd.setConfig('enableDanmaku', true);
            }
            const displayDanmaku = document.querySelector('#displayDanmaku');
            if (displayDanmaku && displayDanmaku.children[0]) {

                displayDanmaku.children[0].className = ddd.configs.enableDanmaku ? jellyfin_const.spanClass + jellyfin_const.danmaku_icons[0] : jellyfin_const.spanClass + jellyfin_const.danmaku_icons[1];
            }
            if (ddd.danmaku) {
                ddd.configs.enableDanmaku ? ddd.danmaku.show() : ddd.danmaku.hide();
            }
        },
    };
};

/**
 * @description: 为jellyfin添加弹幕搜索按钮
 * @param {DanDanDanmaku} ddd
 * @return {*}
 */
const searchButtonOpts = (ddd: DanDanDanmaku): any => {
    return {
        title: ddd.locales.searchBtnTitle,
        id: 'searchDanmaku',
        class: jellyfin_const.search_icon,
        onclick: () => {
            if (ddd.status === PluginStatus.INITIALIZING) {
                window.showDebugInfo(ddd.locales.log.loading);
                return;
            }
            window.showDebugInfo('手动匹配弹幕');
            ddd.reloadDanmaku('search');
        },
    };
}

/**
 * @description: 为jellyfin添加弹幕繁简切换按钮
 * @param {DanDanDanmaku} ddd
 * @return {*}
 */
const translateButtonOpts = (ddd: DanDanDanmaku): any => {
    return {
        title: '',
        id: 'translateDanmaku',
        class: jellyfin_const.translate_icon,
        onclick: () => {
            if (ddd.status === PluginStatus.INITIALIZING) {
                window.showDebugInfo(ddd.locales.log.loading);
                return;
            }
            window.showDebugInfo('切换简繁转换');
            let chConvert = (ddd.configs.chConvert + 1) % 3;
            ddd.setConfig('chConvert', chConvert);
            const translateDanmaku = document.querySelector('#translateDanmaku');
            if (translateDanmaku) {
                translateDanmaku.setAttribute('title', jellyfin_const.chConvertTitle[chConvert]);
                window.showDebugInfo(translateDanmaku.getAttribute('title'));
            }
            ddd.reloadDanmaku('reload');
        },
    };
}

/**
 * @description: 为jellyfin添加弹幕信息显示按钮
 * @param {DanDanDanmaku} ddd
 * @return {*}
 */
const infoButtonOpts = (ddd: DanDanDanmaku): any => {
    return {
        title: ddd.locales.infoBtnTitle,
        id: 'printDanmakuInfo',
        class: jellyfin_const.info_icon,
        onclick: () => {
            if (ddd.status === PluginStatus.INITIALIZING || ddd.mediaInfo.episodeId === null) {
                window.showDebugInfo(ddd.locales.log.loading);
                return;
            }
            window.showDebugInfo('显示当前信息');
            let msg = '动画名称：' + ddd.mediaInfo.seriesTitle;
            if (ddd.mediaInfo.episodeTitle) {
                msg += '\n剧集名称：' + ddd.mediaInfo.episodeTitle;
            }
            window.showDebugInfo(msg);
            sendNotification('当前弹幕匹配', msg);
        },
    };
}

/**
 * @description: 为jellyfin添加弹幕设置按钮
 * @param {DanDanDanmaku} ddd
 * @return {*}
 */
const settingButtonOpts = (ddd: DanDanDanmaku): any => {
    return {
        title: '',
        id: 'settingDanmaku',
        class: jellyfin_const.setting_icon,
        onclick: () => {
            if (ddd.status === PluginStatus.INITIALIZING) {
                window.showDebugInfo(ddd.locales.log.loading);
                return;
            }
            window.showDebugInfo('打开设置面板');
            ddd.openSettingPanel();
        },
    };
}

/**
 * @description: 为jellyfin添加手动增加弹幕源按钮
 * @param {DanDanDanmaku} ddd
 * @return {*}
 */
const addSourceButtonOpts = (ddd: DanDanDanmaku): any => {
    return {
        title: ddd.locales.sourceBtnTitle,
        id: 'addDanmakuSource',
        class: jellyfin_const.source_icon,
        onclick: () => {
            if (ddd.status === PluginStatus.INITIALIZING) {
                window.showDebugInfo(ddd.locales.log.loading);
                return;
            }
            window.showDebugInfo('手动增加弹幕源');
            let source = prompt('请输入弹幕源地址');
            if (source) {
                ddd.addDanmakuSource(source);
            }
        },
    };
}

/**
 * @description: 为jellyfin添加日志显示按钮
 * @param {DanDanDanmaku} ddd
 * @return {*}
 */
const logButtonOpts = (ddd: DanDanDanmaku): any => {
    return {
        title: ddd.locales.logBtnTitle,
        id: 'showDanmakuLog',
        class: jellyfin_const.log_icon,
        onclick: () => {
            if (ddd.status === PluginStatus.INITIALIZING) {
                window.showDebugInfo(ddd.locales.log.loading);
                return;
            }
            window.showDebugInfo('显示日志');
            if (ddd.configs.showLogUI) {
                ddd.setConfig('showLogUI', false);
            } else {
                ddd.setConfig('showLogUI', true);
            }
            const showDanmakuLog = document.querySelector('#showDanmakuLog') as HTMLElement;
            if (showDanmakuLog) {
                ddd.configs.showLogUI ? showDanmakuLog.style.display = 'block' : showDanmakuLog.style.display = 'none';
            }
        },
    };
}

export {
    displayButtonOpts,
    searchButtonOpts,
    translateButtonOpts,
    infoButtonOpts,
    settingButtonOpts,
    addSourceButtonOpts,
    logButtonOpts,
}