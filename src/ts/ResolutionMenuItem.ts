///<reference path='../definitions/VideoJS.d.ts'/>
///<reference path='../definitions/JQuery.d.ts'/>
///<reference path='../../bower_components/videojs-plugin-components/vjsplugincomponents.d.ts'/>

module ResolutionSwitching {
    export class ResolutionMenuItem extends VjsPluginComponents.MenuItem {
        label: string;
        _options: any;
        _player: VjsPluginComponents.IPlayer;
        _selected: boolean;
        _source: VjsPluginComponents.IVideoSource;

        constructor(player: VjsPluginComponents.IPlayer, source: VjsPluginComponents.IVideoSource) {
            this.label = source.resolution + 'p';
            this._source = source;

            super(player);

            this.selected(this._source.resolution === this._player.getVideo().getPlayingSource().resolution);

            this._player.on('changeresolution', () => this.update());

            if (this.selected()) {
                this.addClass('vjs-selected');
                this.el().setAttribute('aria-selected', true);
            } else {
                this.el().setAttribute('aria-selected', false);
            }
        }

        selected(isSelected?: boolean) {
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
        }

        onClick() {
            // Check that we are changing to a new quality (not the one we are already on)
            if (!this.selected()) {
                var current_time = this._player.currentTime();

                // Set the button text to the newly chosen quality
                //$(this._player.controlBar.el()).find('.vjs-quality-text').html(this.label);


                this._player.getVideo().setPlayingMatching(
                    (sources) => {
                        return jQuery.grep(sources, (source) => {
                            return (source.resolution === this._source.resolution && source.type === this._source.type);
                        })[0];
                    });

                this._player.trigger('changeresolution', { resolution: this._source.resolution });
            }
        }

        update() {
            this.selected(this._source.resolution === this._player.getVideo().getPlayingSource().resolution);
        }

        createEl(type?, props?) {
            return super.createEl('li', jQuery.extend({
                className: 'vjs-menu-item',
                innerHTML: this.label
            }, props));
        }
    }
}