import { Client } from ".."; 
import { DebugInfo } from "@/clients/jellyfin/views/debug";
import * as bar from './views/controlbar'


export class JellyfinClient extends Client {
    init() {
        this.initWatcher();
        window.showDebugInfo = new DebugInfo(jellyfin_const.debugInfoLocation).showDebugInfo;
    }

    initWatcher() {
        throw new Error('Method not implemented.');
    }

    initUI() {
        // 页面未加载
        const uiAnchor = document.getElementsByClassName(jellyfin_const.uiAnchorStr);
        if (!uiAnchor || uiAnchor.length === 0) {
            return;
        }
        // 已初始化
        if (document.getElementById('danmakuCtr')) {
            return;
        }
        window.showDebugInfo('正在初始化UI');
        // 弹幕按钮容器div
        let uiEle: HTMLElement | null = null;

        document.querySelectorAll(jellyfin_const.uiQueryStr).forEach(function (element) {
            if (isHTMLElement(element) && element.offsetParent != null) {
                uiEle = element as HTMLElement;
            }
        });

        function isHTMLElement(element: Element): element is HTMLElement {
            return (element as HTMLElement).offsetParent !== undefined;
        }

        if (!uiEle) {
            return;
        }

        const parent = uiEle.parentNode as HTMLElement;
        const controlbar = document.createElement('div');
        controlbar.id = 'danmakuCtr';
        if (!this.ddd.mediaInfo.episodeId) {
            controlbar.style.opacity = '0.5';
        }

        parent.insertBefore(controlbar, uiEle);
        controlbar.appendChild(this.createButton(bar.displayButtonOpts));
        controlbar.appendChild(this.createButton(bar.searchButtonOpts));
        controlbar.appendChild(this.createButton(bar.translateButtonOpts));
        controlbar.appendChild(this.createButton(bar.infoButtonOpts));
        controlbar.appendChild(this.createButton(bar.settingButtonOpts));
        controlbar.appendChild(this.createButton(bar.addSourceButtonOpts));

        // set init state of buttons
        const displayButton = document.querySelector('#displayDanmaku') as HTMLElement;
        const translateButton = document.querySelector('#translateDanmaku') as HTMLElement;
        displayButton.className = jellyfin_const.spanClass + jellyfin_const.danmaku_icons[this.ddd.configs.enableDanmaku ? 0 : 1];
        translateButton.title = jellyfin_const.chConvertTitle[this.ddd.configs.chConvert];

        if (jellyfin_const.debugInfoLocation === 'ui') {
            controlbar.appendChild(this.createButton(bar.logButtonOpts));

            let _container: HTMLElement | null = null;
            document.querySelectorAll(jellyfin_const.mediaContainerQueryStr).forEach(function (element) {
                if (isHTMLElement(element) && element.offsetParent != null) {
                    _container = element as HTMLElement;
                }
            });
            const span = document.createElement('span');
            span.id = 'debugInfo';
            span.style.position = 'absolute';
            span.style.overflow = 'auto';
            span.style.zIndex = '99';
            span.style.left = '10px';
            span.style.top = '50px';
            this.ddd.configs.showLogUI ? span.style.display = 'block' : span.style.display = 'none';
            _container?.appendChild(span);
        }

        window.showDebugInfo('UI初始化完成');

    }

    createButton(opt: Function): HTMLElement {
        const btnOpts = opt(this.ddd);
        const btn = document.createElement('button');
        btn.className = jellyfin_const.buttonOptions.class;
        btn.setAttribute('is', jellyfin_const.buttonOptions.is);
        btn.setAttribute('title', btnOpts.title);
        btn.setAttribute('id', btnOpts.id);
        const icon = document.createElement('span');
        icon.className = jellyfin_const.spanClass + btnOpts.class;
        btn.appendChild(icon);
        btn.onclick = btnOpts.onclick;
        return btn;
    }

    getElementsByInnerText() {
        throw new Error('Method not implemented.');
    }

    
}
