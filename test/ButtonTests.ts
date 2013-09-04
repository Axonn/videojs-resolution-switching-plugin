/// <reference path="../src/definitions/Jasmine.d.ts" />
/// <reference path="../src/definitions/VideoJS.d.ts" />
/// <reference path="../src/definitions/JQuery.d.ts" />
/// <chutzpah_reference path="../../../local/video.js" />
/// <chutzpah_reference path="../../../lib/JQuery/jquery-1.9.1.js" />
/// <reference path="../src/ts/ResolutionSelectionButton.ts" />
/// <reference path="../src/ts/ResolutionMenuItem.ts" />

describe("resolution button", function () {
    var source: VjsPluginComponents.IVideoSource;
    var listByTypeSpy;
    var player: VjsPluginComponents.IPlayer;

    beforeEach(() => {
        source = {
            type: "mp4",
            src: "URL",
            resolution: "240"
        };

        listByTypeSpy = jasmine.createSpy("player.sources.listByType").andReturn([
            {
                type: "mp4",
                src: "URL",
                resolution: "240"
            },
            {
                type: "mp4",
                src: "URL2",
                resolution: "480"
            }]);

        player = {
            id: jasmine.createSpy("player.id"),
            setVideo: jasmine.createSpy("player.setVideo"),
            getVideo: jasmine.createSpy("player.getVideo").andReturn(
                {
                    listSourcesByType: listByTypeSpy,
                    getPlayingSource: jasmine.createSpy("getPlayingSource").andReturn(source),
                    setPlayingMatching: jasmine.createSpy("setPlayingMatching"),
                }
            ),
            videos: jasmine.createSpy("player.videos"),
            toOriginal: jasmine.createSpy("player.toOriginal").andReturn({
                id: jasmine.createSpy("originalPlayer.id").andReturn(1),
            }),
            dispose: jasmine.createSpy("player.dispose"),
            createEl: jasmine.createSpy("player.createEl"),
            el: jasmine.createSpy("player.el"),
            addChild: jasmine.createSpy("player.addChild"),
            children: jasmine.createSpy("player.children"),
            on: jasmine.createSpy("player.on"),
            off: jasmine.createSpy("player.off"),
            one: jasmine.createSpy("player.one"),
            trigger: jasmine.createSpy("player.trigger"),
            show: jasmine.createSpy("player.show"),
            hide: jasmine.createSpy("player.hide"),
            width: jasmine.createSpy("player.width"),
			pause: jasmine.createSpy("player.pause"),
            height: jasmine.createSpy("player.height"),
            dimensions: jasmine.createSpy("player.dimensions"),
            currentTime: jasmine.createSpy("player.currentTime"),
            techName: jasmine.createSpy("player.techName"),
            play: jasmine.createSpy("player.play"),
            currentSrc: jasmine.createSpy("player.currentSrc"),
            options: jasmine.createSpy('player.options'),
            duration: jasmine.createSpy('player.duration'),
            changeSrcResetTime: jasmine.createSpy("player.changeSrcResetTime"),
            changeSrcRetainTime: jasmine.createSpy("player.changeSrcRetainTime"),
        };
    });

    it("has correct text", function () {

        var button: ResolutionSwitching.ResolutionSelectionButton = new ResolutionSwitching.ResolutionSelectionButton(player);

        expect(button.buttonText).toBe("240p");
    });

    it("changes text on menu item click", function () {
	    //comment out until we can make necessary changes to videojs
        //var button: ResolutionSwitching.ResolutionSelectionButton = new ResolutionSwitching.ResolutionSelectionButton(player);
        //$.each(button.menu.items, (index, item) => {
        //    var menuItem = <ResolutionSwitching.ResolutionMenuItem> item;
        //    if (menuItem.label = "480p") {
        //        item.trigger("click");
        //    }
        //});

        //expect(button.buttonText).toBe("480p");
        //expect($(button.el())[0].outerHTML).toBe('<div class="vjs-quality-button vjs-menu-button vjs-control" role="button" aria-live="polite" tabindex="0"><div><span class="vjs-quality-text">480p</span></div><ul class="vjs-menu"><li class="vjs-menu-title">quality</li><li role="button" aria-live="polite" tabindex="0" class="vjs-menu-item vjs-selected" aria-selected="true">240p</li><li role="button" aria-live="polite" tabindex="0" class="vjs-menu-item" aria-selected="false">480p</li><li class="vjs-menu-arrow"><div class="vjs-menu-arrow"></div></li></ul></div>');
    });
});