debug.browser = (function(){
	var _this = {}
		, _initialized = false
		, _name
		, _os
		, _version
		, _CONST = {
			NAMES: {
				CHROME: "Chrome"
			, OMNIWEB: "OmniWeb"
			, SAFARI: "Safari"
			, OPERA: "Opera"
			, ICAB: "iCab"
			, KONQUEROR: "Konqueror"
			, FIREFOX: "Firefox"
			, CAMINO: "Camino"
			, NETSCAPE: "Netscape"
			, EXPLORER: "Explorer"
			, MOZILLA: "Mozilla"
			}
		, OS: {
				WINDOWS: "Windows"
			, MAC: "Mac"
			, IPHONE: "iPhone/iPod"
			, LINUX: "Linux"
			}
		}
	;
	function _init() {
		_name = _searchString(_dataBrowser) || "An unknown browser";
		_version = _searchVersion(navigator.userAgent)
			|| _searchVersion(navigator.appVersion)
			|| "an unknown version";
		_os = _searchString(_dataOS) || "an unknown OS";
		_initialized = true;
	}
	

	function _searchString(data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			_this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	}
	
	function _searchVersion(dataString) {
		var index = dataString.indexOf(_this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+_this.versionSearchString.length+1));
	}
	
	var _dataBrowser = [
		{
			string: navigator.userAgent
		,	subString: _CONST.NAMES.CHROME
		,	identity: _CONST.NAMES.CHROME
		}
	,	{ 	
			string: navigator.userAgent
		,	subString: _CONST.NAMES.OMNIWEB
		,	versionSearch: _CONST.NAMES.OMNIWEB+"/"
		,	identity: _CONST.NAMES.OMNIWEB
		}
	,	{
			string: navigator.vendor
		,	subString: "Apple"
		,	identity: _CONST.NAMES.SAFARI
		,	versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: _CONST.NAMES.OPERA
		}
	,	{
			string: navigator.vendor
		,	subString: _CONST.NAMES.ICAB
		,	identity: _CONST.NAMES.ICAB
		}
	,	{
			string: navigator.vendor
		,	subString: "KDE"
		,	identity: _CONST.NAMES.KONQUEROR
		}
	,	{
			string: navigator.userAgent
		,	subString: _CONST.NAMES.FIREFOX
		,	identity: _CONST.NAMES.FIREFOX
		}
	,	{
			string: navigator.vendor
		,	subString: _CONST.NAMES.CAMINO
		,	identity: _CONST.NAMES.CAMINO
		}
	,	{		// for newer Netscapes (6+)
			string: navigator.userAgent
		,	subString: _CONST.NAMES.NETSCAPE
		,	identity: _CONST.NAMES.NETSCAPE
		}
	,	{
			string: navigator.userAgent
		,	subString: "MSIE"
		,	identity: _CONST.NAMES.EXPLORER
		,	versionSearch: "MSIE"
		}
	,	{
			string: navigator.userAgent
		,	subString: "Gecko"
		,	identity: _CONST.NAMES.MOZILLA
		,	versionSearch: "rv"
		}
	,	{ 		// for older Netscapes (4-)
			string: navigator.userAgent
		,	subString: _CONST.NAMES.MOZILLA
		,	identity: _CONST.NAMES.NETSCAPE
		,	versionSearch: _CONST.NAMES.MOZILLA
		}
	];
	var _dataOS = [
		{
			string: navigator.platform
		,	subString: "Win"
		,	identity: _CONST.OS.WINDOWS
		}
	,	{
			string: navigator.platform
		,	subString: _CONST.OS.MAC
		,	identity: _CONST.OS.MAC
		}
	,	{
			string: navigator.userAgent
		,	subString: "iPhone"
		,	identity: _CONST.OS.IPHONE
	  }
	,	{
			string: navigator.platform
		,	subString: _CONST.OS.LINUX
		,	identity: _CONST.OS.LINUX
		}
	];
	
	_this.name = function(){
		if(!_initialized) {
			_init();
		}
		return _name;
	};
	_this.os = function(){
		if(!_initialized) {
			_init();
		}
		return _os;
	};
	_this.version = function(){
		if(!_initialized) {
			_init();
		}
		return _version;
	};
	
	_this.NAMES = _CONST.NAMES;
	_this.OS = _CONST.OS;
	
	return _this;
})();
