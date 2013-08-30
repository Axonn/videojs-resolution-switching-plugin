///<reference path='../definitions/VideoJS.d.ts'/>
///<reference path='../definitions/JQuery.d.ts'/> 
///<reference path='ResolutionMenuItem.ts'/>
///<reference path='../../bower_components/videojs-plugin-components/vjsplugincomponents.d.ts'/>

module ResolutionSwitching {
    export class ResolutionMenu extends VjsPluginComponents.Menu {
        kind: string = "quality";
        className: string = "vjs-quality-button";
        buttonText: string = "";

        constructor(player: VjsPluginComponents.IPlayer) {
            super(player);

            var listItem = jQuery(document.createElement("li")).addClass("vjs-menu-title").html(this.kind);

            // Add a title list item to the top
            jQuery(this.el()).append(listItem);

            this.createItems();

            var downDiv = jQuery(document.createElement("div")).addClass("vjs-menu-arrow");
            var downArrow = jQuery(document.createElement("li")).append(downDiv).addClass("vjs-menu-arrow");

            jQuery(this.el()).append(downArrow);
        }

        // Create a menu item for each text track
        createItems() {
            var availableSources = this._player.getVideo().listSourcesByType(this._player.getVideo().getPlayingSource().type);

            jQuery.each(availableSources, (index, source) => {
                this.addItem(new ResolutionSwitching.ResolutionMenuItem(this._player, source));
            });
        }
    }
}