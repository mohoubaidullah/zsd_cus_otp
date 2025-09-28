/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"contract/zsd_cus_otp/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});