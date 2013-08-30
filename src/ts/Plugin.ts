///<reference path='ResolutionSelectionButton.ts'/>
///<reference path='ResolutionMenuItem.ts'/>
///<reference path='../definitions/JQuery.d.ts'/>
///<reference path='../../bower_components/videojs-plugin-components/vjsplugincomponents.d.ts'/>

module ResolutionSwitching {
    export class Plugin {
        _player: _V_.Player;

        constructor(player: _V_.Player) {
            this._player = player;
        }

        enable() {
            var children = this._player.children();
            //var loadingObserver = children["LoadingTimeObserver"];
            //if (loadingObserver === undefined) {
            //    loadingObserver = new LoadingTimeObserver(this._player, new Common.Timer(window, new Common.DateService()));
            //    this._player.addChild(loadingObserver);
            //}
            var resolutionSelectionButton = new ResolutionSelectionButton(new VjsPluginComponents.Player(this._player));
            var controlBar;

            //$.each(children, (index, child) => {
            //    if (child.name() = "controlBar") {
            //        controlBar = child;
            //    }
            //});
            if (resolutionSelectionButton.menu) {
                var element = resolutionSelectionButton.menu.el();
                //this._player["controlBar"].el().appendChild(resolutionSelectionButton.el())
                this._player["controlBar"].addChild(resolutionSelectionButton);
            };
        }
    }
}