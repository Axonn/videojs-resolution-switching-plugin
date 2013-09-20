///<reference path='../definitions/VideoJS.d.ts'/>
///<reference path='../definitions/JQuery.d.ts'/> 
///<reference path='ResolutionMenuItem.ts'/>
///<reference path='ResolutionMenu.ts'/>
///<reference path='../../bower_components/videojs-plugin-components/vjsplugincomponents.d.ts'/>

module ResolutionSwitching {
    export class ResolutionSelectionButton extends VjsPluginComponents.Component{
        kind: string;
        className: string;
        buttonText: string;
        menu: ResolutionSwitching.ResolutionMenu;
        _player: VjsPluginComponents.IPlayer;
        _component: _V_.Component;

        constructor(player: VjsPluginComponents.IPlayer) {
            this.kind = "quality";
            this.className = "vjs-quality-button";
            this.buttonText = "";

            super(player);

            this._player = player;

            //TODO: Move this to the plugin
            //if (player.techName() == "html5") {
                // Setup the quality button for this video (using the determined default) if we have more than 1 available resolution
                if (player.getVideo().listSourcesByType(player.getVideo().getPlayingSource().type).length > 1) {
                    this.buttonText = player.getVideo().getPlayingSource().resolution + 'p';
                    jQuery(this.el()).html('<div><span class="vjs-quality-text">' + this.buttonText + '</span></div>');
                    this.menu = new ResolutionSwitching.ResolutionMenu(this._player);
                    jQuery.each(this.menu.items, (index, item) => {
                        jQuery(item.el()).click(() => {
                            var menuItem = <ResolutionMenuItem> item;
                            this.buttonText = menuItem.label;
                            var element = this.el();
                            var child = jQuery(this.el()).children(".vjs-quality-text");
                            jQuery(this.el()).find(".vjs-quality-text").html(this.buttonText);
                        });
                    });
                    this.addChild(this.menu);
            };

            //};
        }

       /**
         * Create the component's DOM element.
         * @param  {String=} tagName  Element's node type. e.g. 'div'
         * @param  {Object=} attributes An object of element attributes that should be set on the element.
         * @return {Element}
         */
        createEl(): HTMLElement {

            //Add standard Aria and Tabindex info
            var properties = {
                className: this.buildCSSClass(),
                innerHTML: '<div><span class="vjs-quality-text">' + this.buttonText + '</span></div>',
                role: "button",
                'aria-live': 'polite',
                tabIndex: 0,
            };

            var tagName = "div";

            return super.createEl(tagName, properties); //super.createEl(type, props);
        }

        buildCSSClass() {
            return "vjs-quality-button vjs-menu-button vjs-control";
        }

        // Focus - Add keyboard functionality to element
        onFocus() {

            // Show the menu, and keep showing when the menu items are in focus
            this.menu.lockShowing();
            this.menu.el().style.display = "block";

            //// When tabbing through, the menu should hide when focus goes from the last menu item to the next tabbed element.
            var items = this.menu.items;

            items[items.length -1].one("blur", () => {
                this.menu.unlockShowing();
            });
        }

        // Can't turn off list display that we turned on with focus, because list would go away.
        onBlur() { }

        onClick() { 
            /*
            When you click the button it adds focus, which will show the menu indefinitely.
            So we'll remove focus when the mouse leaves the button.
            Focus is needed for tab navigation.
            */
            this.one('mouseout', () => {
                this.menu.unlockShowing();
                this.el().blur();
            });
        }
    }
}