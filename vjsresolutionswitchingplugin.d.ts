/// <reference path="../../src/definitions/VideoJS.d.ts" />
/// <reference path="../../src/definitions/JQuery.d.ts" />
/// <reference path="../../bower_components/videojs-plugin-components/vjsplugincomponents.d.ts" />
declare module ResolutionSwitching {
    class ResolutionMenuItem extends VjsPluginComponents.MenuItem {
        public label: string;
        public _options: any;
        public _player: VjsPluginComponents.IPlayer;
        public _selected: boolean;
        public _source: VjsPluginComponents.IVideoSource;
        constructor(player: VjsPluginComponents.IPlayer, source: VjsPluginComponents.IVideoSource);
        public selected(isSelected?: boolean): boolean;
        public onClick(): void;
        public update(): void;
        public createEl(type?, props?): HTMLElement;
    }
}
declare module ResolutionSwitching {
    class ResolutionMenu extends VjsPluginComponents.Menu {
        public kind: string;
        public className: string;
        public buttonText: string;
        constructor(player: VjsPluginComponents.IPlayer);
        public createItems(): void;
    }
}
declare module ResolutionSwitching {
    class ResolutionSelectionButton extends VjsPluginComponents.Component {
        public kind: string;
        public className: string;
        public buttonText: string;
        public menu: ResolutionSwitching.ResolutionMenu;
        public _player: VjsPluginComponents.IPlayer;
        public _component: _V_.Component;
        constructor(player: VjsPluginComponents.IPlayer);
        public createEl(): HTMLElement;
        public buildCSSClass(): string;
        public onFocus(): void;
        public onBlur(): void;
        public onClick(): void;
    }
}
declare module ResolutionSwitching {
    class Plugin {
        public _player: _V_.Player;
        constructor(player: _V_.Player);
        public enable(): void;
    }
}
