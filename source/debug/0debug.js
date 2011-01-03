/**
 * @fileoverview This is to help proxy the different browsers console behaviors.
 */
/*
// Any debug.options defined here will be shown and rest will be hidden... unless this block isn't included, then all will be shown.
var debug = {
		options: {
			info: true
		}
}*/

var debug = (function(){
	var _this = {};
	
	//set default to avoid errors
	_this.info = function(){};
	_this.log = function(){};
	_this.debug = function(){};
	_this.warn = function(){};
	_this.error = function(){}; //function(msg){ alert(msg); };
	_this.assert = function(){};
	_this.profile = function(){};
	_this.profileEnd = function(){};
	_this.time = function(){};
	_this.timeEnd = function(){};
	
	var _defaultOptions = {};
	//#ifdef debug
	var 
		_defaultOptions = {
			info: true
		,	log: true
		,	debug: true
		,	warn: true
		,	error: true
		,	assert: true
		,	profile: true
		,	profileEnd: true
		,	time: true
		,	timeEnd: true
		}
	;
	//#endif 
	var 
		_options = (debug ? debug.options : _defaultOptions) || _defaultOptions
	,	_winCon = (window.console) || false
	;

	// Determine Debug Mode
	if(_winCon && _winCon.debug) {
		/**
		 * Make Debug object a reference to console if we're in
		 * FireFox and the FireBug module exists or have fireBug Lite included on the page.
		 */ 
		_this = _winCon;
		_this.log = _this.debug;
		_this.options = _options;
		
	}	else if (_winCon && navigator.userAgent.toLowerCase().indexOf('webkit') > -1){
		// Webkit Debug Console
		function DebugWebKit() {}
		DebugWebKit.info = function (message, objects) {
			DebugWebKit.console('INFO', message, objects);
		};
		DebugWebKit.log = DebugWebKit.info;
		DebugWebKit.assert = function (message, objects) {
			DebugWebKit.console('ASSERT', Boolean(eval(message)), objects);
		};
		DebugWebKit.debug = function (message, objects) {
			DebugWebKit.console('DEBUG', message, objects);
		};
		DebugWebKit.warn = function (message, objects) {
				DebugWebKit.console('WARN', message, objects);
		};
		DebugWebKit.error = function (message, objects) {
			DebugWebKit.console('ERROR', message, objects);
		};
		DebugWebKit.console = function(type, message, objects) {
			var output = [type, ': ', message].join('');
			if(objects) {
				output = [output, ' Object ',  objects.toString()].join('');
			}
			_winCon.log(output);
		};
		DebugWebKit.profile = function(){};
		DebugWebKit.profileEnd = function(){};
		DebugWebKit.time = function(){};
		DebugWebKit.timeEnd = function(){};
		DebugWebKit.options = _this.options;
		
		_this = DebugWebKit;
		
	}	else if(_winCon) {
		_this = _winCon;

		_this.debug = function(){
			var _args = [].slice.call(arguments,0);
			_args.unshift("DEBUG: ");
			_winCon.warn(_args.join(", "));
		};
		_this.profile = function(){};
		_this.profileEnd = function(){};
		_this.time = function(){};
		_this.timeEnd = function(){};
	
	}
	
	/* Optional disabling of specific log types */
	if(!_options.showAll) {
		if(!_options.info) _this.info = function(){};
		if(!_options.log) _this.log = function(){};
		if(!_options.debug) _this.debug = function(){};
		if(!_options.warn) _this.warn = function(){};
		if(!_options.error) _this.error = function(){ };
		if(!_options.assert) _this.assert = function(){ };
		if(!_options.profile) _this.profile = function(){};
		if(!_options.profileEnd) _this.profileEnd = function(){};
		if(!_options.time) _this.time = function(){};
		if(!_options.timeEnd) _this.timeEnd = function(){};
	}
	
	return _this;
})();
