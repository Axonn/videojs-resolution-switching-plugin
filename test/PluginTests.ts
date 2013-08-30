/// <reference path="../src/definitions/Jasmine.d.ts" />
/// <reference path="../src/definitions/VideoJS.d.ts" />
/// <reference path="../src/definitions/JQuery.d.ts" />
/// <chutzpah_reference path="../../../local/video.js" />
/// <chutzpah_reference path="../../../lib/JQuery/jquery-1.9.1.js" />
/// <reference path="../src/ts/ResolutionSelectionButton.ts" />

describe("resolution plugin", function () {
    it("adds button to controlbar", function () {
        var source: VjsPluginComponents.IVideoSource = {
            type: "mp4",
            src: "URL",
            resolution: "240"
        };

        var listByTypeSpy = jasmine.createSpy("player.sources.listByType").andReturn([
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

        var player: VjsPluginComponents.IPlayer = {
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
            sources: {
                getSelected: jasmine.createSpy("player.sources.getSelected").andReturn(source),
                setSelected: jasmine.createSpy("player.sources.setSelected"),
                listByType: listByTypeSpy,
            },
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
            height: jasmine.createSpy("player.height"),
            dimensions: jasmine.createSpy("player.dimensions"),
            currentTime: jasmine.createSpy("player.currentTime"),
            techName: jasmine.createSpy("player.techName"),
            play: jasmine.createSpy("player.play"),
            options: jasmine.createSpy("player.options"),
            duration: jasmine.createSpy("player.duration"),
            changeSrcResetTime: jasmine.createSpy("player.changeSrcResetTime"),
            changeSrcRetainTime: jasmine.createSpy("player.changeSrcRetainTime"),
        };

        var button: ResolutionSwitching.ResolutionSelectionButton = new ResolutionSwitching.ResolutionSelectionButton(player);

        expect(button.buttonText).toBe("240p");
    });
});