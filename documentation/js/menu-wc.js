'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppealModule.html" data-type="entity-link" >AppealModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppealModule-d0b7165c66e8679b7d7d586aa71ef27585d5b716d48e85c636daf07c0b06697040456331ab7324890c7f519702dd8881a21f589ca721768c612dac1c83f58d18"' : 'data-target="#xs-controllers-links-module-AppealModule-d0b7165c66e8679b7d7d586aa71ef27585d5b716d48e85c636daf07c0b06697040456331ab7324890c7f519702dd8881a21f589ca721768c612dac1c83f58d18"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppealModule-d0b7165c66e8679b7d7d586aa71ef27585d5b716d48e85c636daf07c0b06697040456331ab7324890c7f519702dd8881a21f589ca721768c612dac1c83f58d18"' :
                                            'id="xs-controllers-links-module-AppealModule-d0b7165c66e8679b7d7d586aa71ef27585d5b716d48e85c636daf07c0b06697040456331ab7324890c7f519702dd8881a21f589ca721768c612dac1c83f58d18"' }>
                                            <li class="link">
                                                <a href="controllers/AppealController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppealController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppealModule-d0b7165c66e8679b7d7d586aa71ef27585d5b716d48e85c636daf07c0b06697040456331ab7324890c7f519702dd8881a21f589ca721768c612dac1c83f58d18"' : 'data-target="#xs-injectables-links-module-AppealModule-d0b7165c66e8679b7d7d586aa71ef27585d5b716d48e85c636daf07c0b06697040456331ab7324890c7f519702dd8881a21f589ca721768c612dac1c83f58d18"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppealModule-d0b7165c66e8679b7d7d586aa71ef27585d5b716d48e85c636daf07c0b06697040456331ab7324890c7f519702dd8881a21f589ca721768c612dac1c83f58d18"' :
                                        'id="xs-injectables-links-module-AppealModule-d0b7165c66e8679b7d7d586aa71ef27585d5b716d48e85c636daf07c0b06697040456331ab7324890c7f519702dd8881a21f589ca721768c612dac1c83f58d18"' }>
                                        <li class="link">
                                            <a href="injectables/AppealService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppealService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-228da7ee9a39afd71fc5bbd45617d762bbfd96871fde3e50153f38d589a8a99739080c40ffe2a22b1c9e29236e300fab9183b412ae730e7112ed53444fc17eef"' : 'data-target="#xs-controllers-links-module-AppModule-228da7ee9a39afd71fc5bbd45617d762bbfd96871fde3e50153f38d589a8a99739080c40ffe2a22b1c9e29236e300fab9183b412ae730e7112ed53444fc17eef"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-228da7ee9a39afd71fc5bbd45617d762bbfd96871fde3e50153f38d589a8a99739080c40ffe2a22b1c9e29236e300fab9183b412ae730e7112ed53444fc17eef"' :
                                            'id="xs-controllers-links-module-AppModule-228da7ee9a39afd71fc5bbd45617d762bbfd96871fde3e50153f38d589a8a99739080c40ffe2a22b1c9e29236e300fab9183b412ae730e7112ed53444fc17eef"' }>
                                            <li class="link">
                                                <a href="controllers/PokazaniaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PokazaniaController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/SheduleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SheduleController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-c79d1a7d6faea38cb0f95b3d7b8b8038b9967436e2a7eef155e1904fc9967e2b9d427136c80b4f1c69d3686bea3ce924245f49fdabc8d59b8cafde1e77b799eb"' : 'data-target="#xs-controllers-links-module-AuthModule-c79d1a7d6faea38cb0f95b3d7b8b8038b9967436e2a7eef155e1904fc9967e2b9d427136c80b4f1c69d3686bea3ce924245f49fdabc8d59b8cafde1e77b799eb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-c79d1a7d6faea38cb0f95b3d7b8b8038b9967436e2a7eef155e1904fc9967e2b9d427136c80b4f1c69d3686bea3ce924245f49fdabc8d59b8cafde1e77b799eb"' :
                                            'id="xs-controllers-links-module-AuthModule-c79d1a7d6faea38cb0f95b3d7b8b8038b9967436e2a7eef155e1904fc9967e2b9d427136c80b4f1c69d3686bea3ce924245f49fdabc8d59b8cafde1e77b799eb"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-c79d1a7d6faea38cb0f95b3d7b8b8038b9967436e2a7eef155e1904fc9967e2b9d427136c80b4f1c69d3686bea3ce924245f49fdabc8d59b8cafde1e77b799eb"' : 'data-target="#xs-injectables-links-module-AuthModule-c79d1a7d6faea38cb0f95b3d7b8b8038b9967436e2a7eef155e1904fc9967e2b9d427136c80b4f1c69d3686bea3ce924245f49fdabc8d59b8cafde1e77b799eb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-c79d1a7d6faea38cb0f95b3d7b8b8038b9967436e2a7eef155e1904fc9967e2b9d427136c80b4f1c69d3686bea3ce924245f49fdabc8d59b8cafde1e77b799eb"' :
                                        'id="xs-injectables-links-module-AuthModule-c79d1a7d6faea38cb0f95b3d7b8b8038b9967436e2a7eef155e1904fc9967e2b9d427136c80b4f1c69d3686bea3ce924245f49fdabc8d59b8cafde1e77b799eb"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GetPassModule.html" data-type="entity-link" >GetPassModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-GetPassModule-6a0deb0eef3e50c77e117ba8e16a611aab02bacfdb1fbc527db1f0f0561dbfc6d4a1c6030af894f73860bc5d89a83ddd69968cb5cdef8accea2cae1dafdb80c0"' : 'data-target="#xs-controllers-links-module-GetPassModule-6a0deb0eef3e50c77e117ba8e16a611aab02bacfdb1fbc527db1f0f0561dbfc6d4a1c6030af894f73860bc5d89a83ddd69968cb5cdef8accea2cae1dafdb80c0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-GetPassModule-6a0deb0eef3e50c77e117ba8e16a611aab02bacfdb1fbc527db1f0f0561dbfc6d4a1c6030af894f73860bc5d89a83ddd69968cb5cdef8accea2cae1dafdb80c0"' :
                                            'id="xs-controllers-links-module-GetPassModule-6a0deb0eef3e50c77e117ba8e16a611aab02bacfdb1fbc527db1f0f0561dbfc6d4a1c6030af894f73860bc5d89a83ddd69968cb5cdef8accea2cae1dafdb80c0"' }>
                                            <li class="link">
                                                <a href="controllers/GetPassController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GetPassController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-GetPassModule-6a0deb0eef3e50c77e117ba8e16a611aab02bacfdb1fbc527db1f0f0561dbfc6d4a1c6030af894f73860bc5d89a83ddd69968cb5cdef8accea2cae1dafdb80c0"' : 'data-target="#xs-injectables-links-module-GetPassModule-6a0deb0eef3e50c77e117ba8e16a611aab02bacfdb1fbc527db1f0f0561dbfc6d4a1c6030af894f73860bc5d89a83ddd69968cb5cdef8accea2cae1dafdb80c0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GetPassModule-6a0deb0eef3e50c77e117ba8e16a611aab02bacfdb1fbc527db1f0f0561dbfc6d4a1c6030af894f73860bc5d89a83ddd69968cb5cdef8accea2cae1dafdb80c0"' :
                                        'id="xs-injectables-links-module-GetPassModule-6a0deb0eef3e50c77e117ba8e16a611aab02bacfdb1fbc527db1f0f0561dbfc6d4a1c6030af894f73860bc5d89a83ddd69968cb5cdef8accea2cae1dafdb80c0"' }>
                                        <li class="link">
                                            <a href="injectables/GetPassService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GetPassService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoggerModule.html" data-type="entity-link" >LoggerModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NewsModule.html" data-type="entity-link" >NewsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-NewsModule-8f26342e423aff03e4b75df5c67361eab191e8647256abe31e5b8dd6edb5a019844fea9410cb59479c71504a93cdc12cf4d497f5c505dc0519cbba86c7cbd252"' : 'data-target="#xs-controllers-links-module-NewsModule-8f26342e423aff03e4b75df5c67361eab191e8647256abe31e5b8dd6edb5a019844fea9410cb59479c71504a93cdc12cf4d497f5c505dc0519cbba86c7cbd252"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-NewsModule-8f26342e423aff03e4b75df5c67361eab191e8647256abe31e5b8dd6edb5a019844fea9410cb59479c71504a93cdc12cf4d497f5c505dc0519cbba86c7cbd252"' :
                                            'id="xs-controllers-links-module-NewsModule-8f26342e423aff03e4b75df5c67361eab191e8647256abe31e5b8dd6edb5a019844fea9410cb59479c71504a93cdc12cf4d497f5c505dc0519cbba86c7cbd252"' }>
                                            <li class="link">
                                                <a href="controllers/NewsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-NewsModule-8f26342e423aff03e4b75df5c67361eab191e8647256abe31e5b8dd6edb5a019844fea9410cb59479c71504a93cdc12cf4d497f5c505dc0519cbba86c7cbd252"' : 'data-target="#xs-injectables-links-module-NewsModule-8f26342e423aff03e4b75df5c67361eab191e8647256abe31e5b8dd6edb5a019844fea9410cb59479c71504a93cdc12cf4d497f5c505dc0519cbba86c7cbd252"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NewsModule-8f26342e423aff03e4b75df5c67361eab191e8647256abe31e5b8dd6edb5a019844fea9410cb59479c71504a93cdc12cf4d497f5c505dc0519cbba86c7cbd252"' :
                                        'id="xs-injectables-links-module-NewsModule-8f26342e423aff03e4b75df5c67361eab191e8647256abe31e5b8dd6edb5a019844fea9410cb59479c71504a93cdc12cf4d497f5c505dc0519cbba86c7cbd252"' }>
                                        <li class="link">
                                            <a href="injectables/NewsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PokazaniaModule.html" data-type="entity-link" >PokazaniaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PokazaniaModule-0d603c6362572de88a92361373073fc8d613bce2102664822bfab70d74a0d7a94259b51a8d1ad1c32a7034592742e0aaf0fea887599eb78911b0905ad986ba03"' : 'data-target="#xs-controllers-links-module-PokazaniaModule-0d603c6362572de88a92361373073fc8d613bce2102664822bfab70d74a0d7a94259b51a8d1ad1c32a7034592742e0aaf0fea887599eb78911b0905ad986ba03"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PokazaniaModule-0d603c6362572de88a92361373073fc8d613bce2102664822bfab70d74a0d7a94259b51a8d1ad1c32a7034592742e0aaf0fea887599eb78911b0905ad986ba03"' :
                                            'id="xs-controllers-links-module-PokazaniaModule-0d603c6362572de88a92361373073fc8d613bce2102664822bfab70d74a0d7a94259b51a8d1ad1c32a7034592742e0aaf0fea887599eb78911b0905ad986ba03"' }>
                                            <li class="link">
                                                <a href="controllers/PokazaniaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PokazaniaController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PokazaniaModule-0d603c6362572de88a92361373073fc8d613bce2102664822bfab70d74a0d7a94259b51a8d1ad1c32a7034592742e0aaf0fea887599eb78911b0905ad986ba03"' : 'data-target="#xs-injectables-links-module-PokazaniaModule-0d603c6362572de88a92361373073fc8d613bce2102664822bfab70d74a0d7a94259b51a8d1ad1c32a7034592742e0aaf0fea887599eb78911b0905ad986ba03"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PokazaniaModule-0d603c6362572de88a92361373073fc8d613bce2102664822bfab70d74a0d7a94259b51a8d1ad1c32a7034592742e0aaf0fea887599eb78911b0905ad986ba03"' :
                                        'id="xs-injectables-links-module-PokazaniaModule-0d603c6362572de88a92361373073fc8d613bce2102664822bfab70d74a0d7a94259b51a8d1ad1c32a7034592742e0aaf0fea887599eb78911b0905ad986ba03"' }>
                                        <li class="link">
                                            <a href="injectables/DebtService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DebtService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PokazaniaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PokazaniaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RolesModule.html" data-type="entity-link" >RolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-RolesModule-4d6c6071c1f0e5142e2701f247b05836159ce163fdad29fe2e2f95f753b9c671f20a62f580814bfb500cb5b1c0c0f0e57cd9bad6474433482ec18171e37b2539"' : 'data-target="#xs-controllers-links-module-RolesModule-4d6c6071c1f0e5142e2701f247b05836159ce163fdad29fe2e2f95f753b9c671f20a62f580814bfb500cb5b1c0c0f0e57cd9bad6474433482ec18171e37b2539"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RolesModule-4d6c6071c1f0e5142e2701f247b05836159ce163fdad29fe2e2f95f753b9c671f20a62f580814bfb500cb5b1c0c0f0e57cd9bad6474433482ec18171e37b2539"' :
                                            'id="xs-controllers-links-module-RolesModule-4d6c6071c1f0e5142e2701f247b05836159ce163fdad29fe2e2f95f753b9c671f20a62f580814bfb500cb5b1c0c0f0e57cd9bad6474433482ec18171e37b2539"' }>
                                            <li class="link">
                                                <a href="controllers/RolesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RolesModule-4d6c6071c1f0e5142e2701f247b05836159ce163fdad29fe2e2f95f753b9c671f20a62f580814bfb500cb5b1c0c0f0e57cd9bad6474433482ec18171e37b2539"' : 'data-target="#xs-injectables-links-module-RolesModule-4d6c6071c1f0e5142e2701f247b05836159ce163fdad29fe2e2f95f753b9c671f20a62f580814bfb500cb5b1c0c0f0e57cd9bad6474433482ec18171e37b2539"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesModule-4d6c6071c1f0e5142e2701f247b05836159ce163fdad29fe2e2f95f753b9c671f20a62f580814bfb500cb5b1c0c0f0e57cd9bad6474433482ec18171e37b2539"' :
                                        'id="xs-injectables-links-module-RolesModule-4d6c6071c1f0e5142e2701f247b05836159ce163fdad29fe2e2f95f753b9c671f20a62f580814bfb500cb5b1c0c0f0e57cd9bad6474433482ec18171e37b2539"' }>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SheduleModule.html" data-type="entity-link" >SheduleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SheduleModule-6cf90dbe709e8b086fbb700d83a36c8ebd090022208e7ec69b2ee48fa0d4e5de7082fa035302db4a5aa07001699c8bc16c36944c0a675f775dfdd219e8efec31"' : 'data-target="#xs-controllers-links-module-SheduleModule-6cf90dbe709e8b086fbb700d83a36c8ebd090022208e7ec69b2ee48fa0d4e5de7082fa035302db4a5aa07001699c8bc16c36944c0a675f775dfdd219e8efec31"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SheduleModule-6cf90dbe709e8b086fbb700d83a36c8ebd090022208e7ec69b2ee48fa0d4e5de7082fa035302db4a5aa07001699c8bc16c36944c0a675f775dfdd219e8efec31"' :
                                            'id="xs-controllers-links-module-SheduleModule-6cf90dbe709e8b086fbb700d83a36c8ebd090022208e7ec69b2ee48fa0d4e5de7082fa035302db4a5aa07001699c8bc16c36944c0a675f775dfdd219e8efec31"' }>
                                            <li class="link">
                                                <a href="controllers/SheduleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SheduleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SheduleModule-6cf90dbe709e8b086fbb700d83a36c8ebd090022208e7ec69b2ee48fa0d4e5de7082fa035302db4a5aa07001699c8bc16c36944c0a675f775dfdd219e8efec31"' : 'data-target="#xs-injectables-links-module-SheduleModule-6cf90dbe709e8b086fbb700d83a36c8ebd090022208e7ec69b2ee48fa0d4e5de7082fa035302db4a5aa07001699c8bc16c36944c0a675f775dfdd219e8efec31"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SheduleModule-6cf90dbe709e8b086fbb700d83a36c8ebd090022208e7ec69b2ee48fa0d4e5de7082fa035302db4a5aa07001699c8bc16c36944c0a675f775dfdd219e8efec31"' :
                                        'id="xs-injectables-links-module-SheduleModule-6cf90dbe709e8b086fbb700d83a36c8ebd090022208e7ec69b2ee48fa0d4e5de7082fa035302db4a5aa07001699c8bc16c36944c0a675f775dfdd219e8efec31"' }>
                                        <li class="link">
                                            <a href="injectables/DebtService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DebtService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GetPassService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GetPassService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PokazaniaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PokazaniaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SheduleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SheduleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SntModule.html" data-type="entity-link" >SntModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SntModule-51264b7e2e72c326dab3e2e47a3e73e0a8fd9c390b7253e3016322a45a2ff92c330c5df49ba9af8112eb2bc441e384a2178f885b020437166e9ff6824d5901c0"' : 'data-target="#xs-controllers-links-module-SntModule-51264b7e2e72c326dab3e2e47a3e73e0a8fd9c390b7253e3016322a45a2ff92c330c5df49ba9af8112eb2bc441e384a2178f885b020437166e9ff6824d5901c0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SntModule-51264b7e2e72c326dab3e2e47a3e73e0a8fd9c390b7253e3016322a45a2ff92c330c5df49ba9af8112eb2bc441e384a2178f885b020437166e9ff6824d5901c0"' :
                                            'id="xs-controllers-links-module-SntModule-51264b7e2e72c326dab3e2e47a3e73e0a8fd9c390b7253e3016322a45a2ff92c330c5df49ba9af8112eb2bc441e384a2178f885b020437166e9ff6824d5901c0"' }>
                                            <li class="link">
                                                <a href="controllers/SntController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SntController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SntModule-51264b7e2e72c326dab3e2e47a3e73e0a8fd9c390b7253e3016322a45a2ff92c330c5df49ba9af8112eb2bc441e384a2178f885b020437166e9ff6824d5901c0"' : 'data-target="#xs-injectables-links-module-SntModule-51264b7e2e72c326dab3e2e47a3e73e0a8fd9c390b7253e3016322a45a2ff92c330c5df49ba9af8112eb2bc441e384a2178f885b020437166e9ff6824d5901c0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SntModule-51264b7e2e72c326dab3e2e47a3e73e0a8fd9c390b7253e3016322a45a2ff92c330c5df49ba9af8112eb2bc441e384a2178f885b020437166e9ff6824d5901c0"' :
                                        'id="xs-injectables-links-module-SntModule-51264b7e2e72c326dab3e2e47a3e73e0a8fd9c390b7253e3016322a45a2ff92c330c5df49ba9af8112eb2bc441e384a2178f885b020437166e9ff6824d5901c0"' }>
                                        <li class="link">
                                            <a href="injectables/SntService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SntService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppealController.html" data-type="entity-link" >AppealController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/GetPassController.html" data-type="entity-link" >GetPassController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/NewsController.html" data-type="entity-link" >NewsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PokazaniaController.html" data-type="entity-link" >PokazaniaController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RolesController.html" data-type="entity-link" >RolesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SheduleController.html" data-type="entity-link" >SheduleController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SntController.html" data-type="entity-link" >SntController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/answer.html" data-type="entity-link" >answer</a>
                            </li>
                            <li class="link">
                                <a href="classes/AnswerCreationArgs.html" data-type="entity-link" >AnswerCreationArgs</a>
                            </li>
                            <li class="link">
                                <a href="classes/answerCreationDto.html" data-type="entity-link" >answerCreationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/appeal.html" data-type="entity-link" >appeal</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppealCreationArgs.html" data-type="entity-link" >AppealCreationArgs</a>
                            </li>
                            <li class="link">
                                <a href="classes/appealCreationDto.html" data-type="entity-link" >appealCreationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePaymentDto.html" data-type="entity-link" >CreatePaymentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePokazanieDto.html" data-type="entity-link" >CreatePokazanieDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRateDto.html" data-type="entity-link" >CreateRateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/createUchastokDto.html" data-type="entity-link" >createUchastokDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DebtDto.html" data-type="entity-link" >DebtDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Debts.html" data-type="entity-link" >Debts</a>
                            </li>
                            <li class="link">
                                <a href="classes/getUchastokDto.html" data-type="entity-link" >getUchastokDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserDto.html" data-type="entity-link" >GetUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/News.html" data-type="entity-link" >News</a>
                            </li>
                            <li class="link">
                                <a href="classes/NewsCreationArgs.html" data-type="entity-link" >NewsCreationArgs</a>
                            </li>
                            <li class="link">
                                <a href="classes/NewsDto.html" data-type="entity-link" >NewsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Payment.html" data-type="entity-link" >Payment</a>
                            </li>
                            <li class="link">
                                <a href="classes/PeriodDto.html" data-type="entity-link" >PeriodDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Pokazania.html" data-type="entity-link" >Pokazania</a>
                            </li>
                            <li class="link">
                                <a href="classes/Rates.html" data-type="entity-link" >Rates</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/SNT.html" data-type="entity-link" >SNT</a>
                            </li>
                            <li class="link">
                                <a href="classes/sntDto.html" data-type="entity-link" >sntDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Uchastki.html" data-type="entity-link" >Uchastki</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRoles.html" data-type="entity-link" >UserRoles</a>
                            </li>
                            <li class="link">
                                <a href="classes/Users.html" data-type="entity-link" >Users</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppealService.html" data-type="entity-link" >AppealService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DebtService.html" data-type="entity-link" >DebtService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetPassService.html" data-type="entity-link" >GetPassService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerService.html" data-type="entity-link" >LoggerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NewsService.html" data-type="entity-link" >NewsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PokazaniaService.html" data-type="entity-link" >PokazaniaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesService.html" data-type="entity-link" >RolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SheduleService.html" data-type="entity-link" >SheduleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SntService.html" data-type="entity-link" >SntService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/DebtCreationAttrs.html" data-type="entity-link" >DebtCreationAttrs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaymentCreationAttrs.html" data-type="entity-link" >PaymentCreationAttrs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PokazaniaCreationAttr.html" data-type="entity-link" >PokazaniaCreationAttr</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RatesCreationAttrs.html" data-type="entity-link" >RatesCreationAttrs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RoleCreationAttrs.html" data-type="entity-link" >RoleCreationAttrs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SntCreationArgs.html" data-type="entity-link" >SntCreationArgs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UchastokCreationAttrs.html" data-type="entity-link" >UchastokCreationAttrs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserCreationAttrs.html" data-type="entity-link" >UserCreationAttrs</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});