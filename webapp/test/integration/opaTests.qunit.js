/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"contract/zsd_cus_otp/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});