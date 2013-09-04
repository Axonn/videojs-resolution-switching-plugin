/// <reference path="../src/definitions/Jasmine.d.ts" />
/// <reference path="../src/definitions/VideoJS.d.ts" />
/// <reference path="../src/definitions/JQuery.d.ts" />
/// <chutzpah_reference path="../../../local/video.js" />
/// <chutzpah_reference path="../../../lib/JQuery/jquery-1.9.1.js" />
/// <reference path="../src/ts/ResolutionMenuItem.ts" />

describe("resolution menu item", function () {
    var source: VjsPluginComponents.IVideoSource;
    var player: VjsPluginComponents.IPlayer;
    var getSelectedSpy;
    var setSelectedSpy;
    var oneSpy;
    var onSpy;
    var currentTimeSpy;
    var playSpy;
    var triggerSpy;
    var time;
    var setPlayingMatchingSpy;

    beforeEach(()=>{   
        source = {
            type: "mp4",
            src: "URL",
            resolution: "240"
        };

        time = 50;

        getSelectedSpy = jasmine.createSpy("getPlayingSource").andReturn(source);

        setSelectedSpy = jasmine.createSpy("player.sources.setSelected");
        oneSpy = jasmine.createSpy("player.one");
        onSpy = jasmine.createSpy("player.on");
        currentTimeSpy = jasmine.createSpy("player.currentTime").andReturn(time);
        playSpy = jasmine.createSpy("player.play");
        triggerSpy = jasmine.createSpy("player.trigger");
        setPlayingMatchingSpy = jasmine.createSpy("setPlayingMatching")

        player = {
            id: jasmine.createSpy("player.id"),
            setVideo: jasmine.createSpy("player.setVideo"),
            getVideo: jasmine.createSpy("player.getVideo").andReturn(
                {
                    listSourcesByType: jasmine.createSpy("listByType"),
                    getPlayingSource: getSelectedSpy,
                    setPlayingMatching: setPlayingMatchingSpy,
                    setPlayingSource: setSelectedSpy
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
            on: onSpy,
            off: jasmine.createSpy("player.off"),
            one: oneSpy,
            trigger: triggerSpy,
            show: jasmine.createSpy("player.show"),
            hide: jasmine.createSpy("player.hide"),
            width: jasmine.createSpy("player.width"),
            height: jasmine.createSpy("player.height"),
			pause: jasmine.createSpy("player.pause"),
            dimensions: jasmine.createSpy("player.dimensions"),
            currentTime: currentTimeSpy,
            techName: jasmine.createSpy("player.techName"),
            play: playSpy,
            currentSrc: jasmine.createSpy("player.currentSrc"),
            options: jasmine.createSpy('player.options'),
            duration: jasmine.createSpy('player.duration'),
            changeSrcResetTime: jasmine.createSpy("player.changeSrcResetTime"),
            changeSrcRetainTime: jasmine.createSpy("player.changeSrcRetainTime"),
        }
    });

    it("has correct label", function () {

        var menuItem = new ResolutionSwitching.ResolutionMenuItem(player, source);

        expect(menuItem.label).toBe("240p");
    });

    it("shows selected when source matches", function () {
        var menuItem = new ResolutionSwitching.ResolutionMenuItem(player, source);

        expect(menuItem.selected()).toBe(true);
        expect($(menuItem.el())[0].outerHTML).toEqual('<li role="button" aria-live="polite" tabindex="0" class="vjs-menu-item vjs-selected" aria-selected="true">240p</li>');
    });

    it("shows unselected when source doesnt matches", function () {
        getSelectedSpy.andReturn({
            type: "mp4",
            src: "URL2",
            resolution: "480"
        })

        var menuItem = new ResolutionSwitching.ResolutionMenuItem(player, source);

        expect(menuItem.selected()).toBe(false);
        expect($(menuItem.el())[0].outerHTML).toEqual('<li role="button" aria-live="polite" tabindex="0" class="vjs-menu-item" aria-selected="false">240p</li>');
    });

    it("becomes selected after update", function () {
        var source: VjsPluginComponents.IVideoSource = {
            type: "mp4",
            src: "URL",
            resolution: "240"
        };

        getSelectedSpy.andReturn({
            type: "mp4",
            src: "URL2",
            resolution: "480"
        })


        var menuItem: ResolutionSwitching.ResolutionMenuItem = new ResolutionSwitching.ResolutionMenuItem(player, source);
        getSelectedSpy.andReturn(source);

        for (var i = 0; i < onSpy.argsForCall.length; i++) {
            if (onSpy.argsForCall[i][0] === "changeresolution") {
                onSpy.argsForCall[i][1]();
            };
        };

        expect(menuItem.selected()).toBe(true);
        expect($(menuItem.el()).hasClass("vjs-selected")).toBe(true);
    });

    it("changes source on click", function () {
        var source2 = {
            type: "mp4",
            src: "URL2",
            resolution: "480"
        };

        getSelectedSpy.andReturn(source2)

        var menuItem: ResolutionSwitching.ResolutionMenuItem = new ResolutionSwitching.ResolutionMenuItem(player, source);

        expect(menuItem.selected()).toBe(false);

        //Act
        menuItem.trigger("click");
        expect(setPlayingMatchingSpy.argsForCall[0][0]([source, source2])).toEqual(source);
        //menuItem.onClick();

        //for (var i = 0; i < oneSpy.argsForCall.length; i++) {
        //    if (oneSpy.argsForCall[i][0] == "loadedmetadata") {
        //        oneSpy.argsForCall[i][1]();
        //    }
        //}

        ////Assert
        //expect(setSelectedSpy).toHaveBeenCalledWith(source);
        //expect(playSpy).toHaveBeenCalled();
        //expect(currentTimeSpy).toHaveBeenCalledWith(time);
        //expect(triggerSpy).toHaveBeenCalledWith("changeresolution");
    });
});