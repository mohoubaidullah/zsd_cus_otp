var objVar = {
	PayerId: ""

};
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/m/MessagePopover",
	"sap/m/MessageBox",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast",
	"sap/ui/model/SimpleType",
	"sap/ui/model/ValidateException",
	"sap/ui/model/json/JSONModel"
], function (Controller, Fragment, Filter, MessagePopover, MessageBox, FilterOperator, MessageToast, SimpleType, ValidateException,
	JSONModel) {
	"use strict";

	return Controller.extend("contract.zsd_cus_otp.controller.View1", {
		onInit: function () {

		},

		onSave: function (oEvent) {
			var that = this;
			var oModel = this.getOwnerComponent().getModel();
			var customerId = this.getView().byId("idCustID").getValue();
			var customerName = this.getView().byId("idNameEn").getText();
			var objPostValue = {
				"Kunnr": customerId
			};

			if (customerName !== "" && customerId !== "") {
				oModel.create("/CustomerOTPSet",
					objPostValue, {
						success: function (data) {
							objVar.zmsg = data.Message;
							if (data.Error === "") {
								sap.m.MessageBox.confirm(
									objVar.zmsg, {
										icon: MessageBox.Icon.INFORMATION,
										title: "OTP Generation",
										actions: [sap.m.MessageBox.Action.OK,
											sap.m.MessageBox.Action.CANCEL
										],
										emphasizedAction: MessageBox.Action.YES,
										onClose: function (sAction) {

										}
									});
							} else {
								sap.m.MessageBox.alert(
									objVar.zmsg, {
										icon: MessageBox.Icon.ERROR,
										title: "OTP Generation",
										actions: [sap.m.MessageBox.Action.OK,
											sap.m.MessageBox.Action.CANCEL
										],
										emphasizedAction: MessageBox.Action.YES,
										onClose: function (sAction) {

										}
									});
							}

						},
						error: function (oError) {
							MessageToast.show("Error while submitting request. Please Try again.", {
								duration: 9000, // default
								width: "30em", // default
								my: "center center", // default
								at: "center center", // default
								of: window, // default
								offset: "0 0", // default
								collision: "fit fit", // default
								onClose: null, // default
								autoClose: true, // default
								animationTimingFunction: "ease", // default
								animationDuration: 1000, // default
								closeOnBrowserNavigation: true // default
							});
						}
					});
			}
		},

		onEnterCustomer: function () {
			var customerId = this.getView().byId("idCustID").getValue();
			//var customerName = this.getView().byId("idNameEn").getText();

			if (customerId === "") {
				sap.m.MessageBox.alert(
					"Please Enter the Customer Correctly", {
						icon: MessageBox.Icon.ERROR,
						title: "Customer Not Selected",
						actions: [sap.m.MessageBox.Action.OK,
							sap.m.MessageBox.Action.CANCEL
						],
						emphasizedAction: MessageBox.Action.YES,
						onClose: function (sAction) {

						}
					});
			} else {
				// var oFilter = new Filter("PayerId", FilterOperator.Contains, customerId);
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/PayerSet('" + customerId + "')";

				oModel.read(sPath, {
					
					success: function (oData, response) {
						that.getView().byId("idNameEn").setText(oData.Name);
					},
					error: function () {
						that.getView().byId("idNameEn").setText("");
						sap.m.MessageBox.alert(
							"Please Enter the Customer Correctly", {
								icon: MessageBox.Icon.ERROR,
								title: "Customer Not Selected",
								actions: [sap.m.MessageBox.Action.OK,
									sap.m.MessageBox.Action.CANCEL
								],
								emphasizedAction: MessageBox.Action.YES,
								onClose: function (sAction) {

								}
							});
					}
				});
			}

		},
		onValueHelpSearchCust: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("PayerId", FilterOperator.Contains, sValue);
			//var oFilter2 = new Filter("Name", FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		onValueHelpRequestCust: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue(),
				oView1 = this.getView();

			this.inputId1 = oEvent.getSource().getId();

			if (!this._valueHelpDialogCust) {
				this._valueHelpDialogCust = sap.ui.xmlfragment(
					"contract.zsd_cus_otp.fragments.ValueHelpDialogCust",
					this
				);
				this.getView().addDependent(this._valueHelpDialogCust);
			}
			this._valueHelpDialogCust.getBinding("items").filter([new Filter(
				"PayerId",
				sap.ui.model.FilterOperator.Contains, sInputValue
			)]);

			// open value help dialog filtered by the input value
			this._valueHelpDialogCust.open(sInputValue);
		},
		onValueHelpCloseCust: function (oEvent) {

			var oSelectedItem = oEvent.getParameter("selectedItem");
			oEvent.getSource().getBinding("items").filter([]);

			if (!oSelectedItem) {
				return;
			}

			this.byId("idCustID").setValue(oSelectedItem.getTitle());
			this.byId("idNameEn").setText(oSelectedItem.getDescription());

			var so = oSelectedItem.getTitle();
			if (so === "") {
				this.getView().byId("idCustID").setValueState(sap.ui.core.ValueState.Error);
			} else {
				this.getView().byId("idCustID").setValueState(sap.ui.core.ValueState.None);

			}
		},

		onPressBarCloseBtn: function (oEvent) {
			this.displayContent.close();
			this.fragOpen = undefined;
		},

	});
});