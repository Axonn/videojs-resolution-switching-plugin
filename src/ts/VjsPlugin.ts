///<reference path='Plugin.ts'/>
///<reference path='../definitions/VideoJS.d.ts'/>

_V_.plugin("resolutionSwitchingPlugin", function (options) {
    var plugin = new ResolutionSwitching.Plugin(this);
    plugin.enable();
});