( function() {
	var _debugger = '<script type="text/javascript" src="lib/debug.prod.js"></script>';
	//# ifdef debug
		_debugger = '<script type="text/javascript" src="lib/debug.js"></script>';
		var debug = {
			/* options : {
				error: true
			, debug: true
			}*/
		};
		document.write(_debugger);
	//# endif
})();