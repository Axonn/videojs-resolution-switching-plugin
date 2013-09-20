var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ResolutionSwitching;
(function (ResolutionSwitching) {
    var ResolutionMenuItem = (function (_super) {
        __extends(ResolutionMenuItem, _super);
        function ResolutionMenuItem(player, source) {
            var _this = this;
            this.label = source.resolution + 'p';
            this._source = source;

            _super.call(this, player);

            this.selected(this._source.resolution === this._player.getVideo().getPlayingSource().resolution);

            this._player.on('changeresolution', function () {
                return _this.update();
            });

            if (this.selected()) {
                this.addClass('vjs-selected');
                this.el().setAttribute('aria-selected', true);
            } else {
                this.el().setAttribute('aria-selected', false);
            }
        }
        ResolutionMenuItem.prototype.selected = function (isSelected) {
            if (isSelected === undefined) {
                return this._selected;
            } else {
                if (isSelected) {
                    this.addClass('vjs-selected');
                    this.el().setAttribute('aria-selected', true);
                } else {
                    this.removeClass('vjs-selected');
                    this.el().setAttribute('aria-selected', false);
                }
                this._selected = isSelected;
            }
        };

        ResolutionMenuItem.prototype.onClick = function () {
            var _this = this;
            if (!this.selected()) {
                var current_time = this._player.currentTime();

                this._player.getVideo().setPlayingMatching(function (sources) {
                    return jQuery.grep(sources, function (source) {
                        return (source.resolution === _this._source.resolution && source.type === _this._source.type);
                    })[0];
                });

                this._player.trigger('changeresolution', { resolution: this._source.resolution });
            }
        };

        ResolutionMenuItem.prototype.update = function () {
            this.selected(this._source.resolution === this._player.getVideo().getPlayingSource().resolution);
        };

        ResolutionMenuItem.prototype.createEl = function (type, props) {
            return _super.prototype.createEl.call(this, 'li', jQuery.extend({
                className: 'vjs-menu-item',
                innerHTML: this.label
            }, props));
        };
        return ResolutionMenuItem;
    })(VjsPluginComponents.MenuItem);
    ResolutionSwitching.ResolutionMenuItem = ResolutionMenuItem;
})(ResolutionSwitching || (ResolutionSwitching = {}));
var ResolutionSwitching;
(function (ResolutionSwitching) {
    var ResolutionMenu = (function (_super) {
        __extends(ResolutionMenu, _super);
        function ResolutionMenu(player) {
            _super.call(this, player);
            this.kind = "quality";
            this.className = "vjs-quality-button";
            this.buttonText = "";

            var listItem = jQuery(document.createElement("li")).addClass("vjs-menu-title").html(this.kind);

            jQuery(this.el()).append(listItem);

            this.createItems();

            var downDiv = jQuery(document.createElement("div")).addClass("vjs-menu-arrow");
            var downArrow = jQuery(document.createElement("li")).append(downDiv).addClass("vjs-menu-arrow");

            jQuery(this.el()).append(downArrow);
        }
        ResolutionMenu.prototype.createItems = function () {
            var _this = this;
            var availableSources = this._player.getVideo().listSourcesByType(this._player.getVideo().getPlayingSource().type);

            jQuery.each(availableSources, function (index, source) {
                _this.addItem(new ResolutionSwitching.ResolutionMenuItem(_this._player, source));
            });
        };
        return ResolutionMenu;
    })(VjsPluginComponents.Menu);
    ResolutionSwitching.ResolutionMenu = ResolutionMenu;
})(ResolutionSwitching || (ResolutionSwitching = {}));
var ResolutionSwitching;
(function (ResolutionSwitching) {
    var ResolutionSelectionButton = (function (_super) {
        __extends(ResolutionSelectionButton, _super);
        function ResolutionSelectionButton(player) {
            var _this = this;
            this.kind = "quality";
            this.className = "vjs-quality-button";
            this.buttonText = "";

            _super.call(this, player);

            this._player = player;

            if (player.getVideo().listSourcesByType(player.getVideo().getPlayingSource().type).length > 1) {
                this.buttonText = player.getVideo().getPlayingSource().resolution + 'p';
                jQuery(this.el()).html('<div><span class="vjs-quality-text">' + this.buttonText + '</span></div>');
                this.menu = new ResolutionSwitching.ResolutionMenu(this._player);
                jQuery.each(this.menu.items, function (index, item) {
                    jQuery(item.el()).click(function () {
                        var menuItem = item;
                        _this.buttonText = menuItem.label;
                        var element = _this.el();
                        var child = jQuery(_this.el()).children(".vjs-quality-text");
                        jQuery(_this.el()).find(".vjs-quality-text").html(_this.buttonText);
                    });
                });
                this.addChild(this.menu);
            }
            ;
        }
        ResolutionSelectionButton.prototype.createEl = function () {
            var properties = {
                className: this.buildCSSClass(),
                innerHTML: '<div><span class="vjs-quality-text">' + this.buttonText + '</span></div>',
                role: "button",
                'aria-live': 'polite',
                tabIndex: 0
            };

            var tagName = "div";

            return _super.prototype.createEl.call(this, tagName, properties);
        };

        ResolutionSelectionButton.prototype.buildCSSClass = function () {
            return "vjs-quality-button vjs-menu-button vjs-control";
        };

        ResolutionSelectionButton.prototype.onFocus = function () {
            var _this = this;
            this.menu.lockShowing();
            this.menu.el().style.display = "block";

            var items = this.menu.items;

            items[items.length - 1].one("blur", function () {
                _this.menu.unlockShowing();
            });
        };

        ResolutionSelectionButton.prototype.onBlur = function () {
        };

        ResolutionSelectionButton.prototype.onClick = function () {
            var _this = this;
            this.one('mouseout', function () {
                _this.menu.unlockShowing();
                _this.el().blur();
            });
        };
        return ResolutionSelectionButton;
    })(VjsPluginComponents.Component);
    ResolutionSwitching.ResolutionSelectionButton = ResolutionSelectionButton;
})(ResolutionSwitching || (ResolutionSwitching = {}));
var ResolutionSwitching;
(function (ResolutionSwitching) {
    var Plugin = (function () {
        function Plugin(player) {
            this._player = player;
        }
        Plugin.prototype.enable = function () {
            var children = this._player.children();

            var resolutionSelectionButton = new ResolutionSwitching.ResolutionSelectionButton(new VjsPluginComponents.Player(this._player));
            var controlBar;

            if (resolutionSelectionButton.menu) {
                var element = resolutionSelectionButton.menu.el();

                this._player["controlBar"].addChild(resolutionSelectionButton);
            }
            ;
        };
        return Plugin;
    })();
    ResolutionSwitching.Plugin = Plugin;
})(ResolutionSwitching || (ResolutionSwitching = {}));
_V_.plugin("resolutionSwitchingPlugin", function (options) {
    var plugin = new ResolutionSwitching.Plugin(this);
    plugin.enable();
});
//# sourceMappingURL=file:////home/travis/build/Axonn/videojs-resolution-switching-plugin/build/js/vjsresolutionswitchingplugin.js.map
