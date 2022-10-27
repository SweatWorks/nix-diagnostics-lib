/**
 *  Diagnostic plugin for iOS
 *
 *  Copyright (c) 2015 Working Edge Ltd.
 *  Copyright (c) 2012 AVANTIC ESTUDIO DE INGENIEROS
 **/
var Diagnostic = (function(){

    /********************
     * Internal functions
     ********************/


    /********************
     * Public properties
     ********************/
    var Diagnostic = {};

    /**
     * Permission states
     * @type {object}
     */
    Diagnostic.permissionStatus = {
        "NOT_REQUESTED": "not_determined", // App has not yet requested this permission
        "DENIED_ALWAYS": "denied_always", // User denied access to this permission
        "RESTRICTED": "restricted", // Permission is unavailable and user cannot enable it.  For example, when parental controls are in effect for the current user.
        "GRANTED": "authorized", //  User granted access to this permission
        "GRANTED_WHEN_IN_USE": "authorized_when_in_use", //  User granted access use location permission only when app is in use
        "EPHEMERAL": "ephemeral", // The app is authorized to schedule or receive notifications for a limited amount of time.
        "PROVISIONAL": "provisional", // The application is provisionally authorized to post non-interruptive user notifications.
        "LIMITED": "limited" // The app has limited access to the Photo Library
    };

    Diagnostic.cpuArchitecture = {
        UNKNOWN: "unknown",
        ARMv6: "ARMv6",
        ARMv7: "ARMv7",
        ARMv8: "ARMv8",
        X86: "X86",
        X86_64: "X86_64"
    };

    /*****************************
     *
     * Protected member functions
     *
     ****************************/

    Diagnostic._ensureBoolean = function (callback){
        return function(result){
            callback(!!result);
        }
    };

    /**********************
     *
     * Public API functions
     *
     **********************/

    /***********
     * Core
     ***********/

    /**
     * Enables debug mode, which logs native debug messages to the native and JS consoles.
     * Debug mode is initially disabled on plugin initialisation.
     *
     * @param {Function} successCallback - The callback which will be called when enabling debug is successful.
     */
    Diagnostic.enableDebug = function(successCallback) {
        return cordova.exec(successCallback,
            null,
            'Diagnostic',
            'enableDebug',
            []);
    };

    /**
     * Switch to settings app. Opens settings page for this app.
     *
     * @param {Function} successCallback - The callback which will be called when switch to settings is successful.
     * @param {Function} errorCallback - The callback which will be called when switch to settings encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.switchToSettings = function(successCallback, errorCallback) {
        return cordova.exec(successCallback,
            errorCallback,
            'Diagnostic',
            'switchToSettings',
            []);
    };

    /**
     * Returns CPU architecture of the current device.
     *
     * @param {Function} successCallback -  The callback which will be called when the operation is successful.
     * This callback function is passed a single string parameter defined as a constant in `cordova.plugins.diagnostic.cpuArchitecture`.
     * @param {Function} errorCallback -  The callback which will be called when the operation encounters an error.
     *  This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.getArchitecture = function(successCallback, errorCallback) {
        return cordova.exec(successCallback,
            errorCallback,
            'Diagnostic',
            'getArchitecture',
            []);
    };

    /**
     * Returns the background refresh authorization status for the application.
     *
     * @param {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is passed a single string parameter which indicates the authorization status as a constant in `cordova.plugins.diagnostic.permissionStatus`.
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.getBackgroundRefreshStatus = function(successCallback, errorCallback) {
        return cordova.exec(successCallback,
            errorCallback,
            'Diagnostic',
            'getBackgroundRefreshStatus',
            []);
    };

    /**
     * Checks if the application is authorized for background refresh.
     *
     * @param {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if background refresh is authorized for use.
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.isBackgroundRefreshAuthorized = function(successCallback, errorCallback) {
        Diagnostic.getBackgroundRefreshStatus(function(status){
            successCallback(status === Diagnostic.permissionStatus.GRANTED);
        }, errorCallback);
    };

    /**
     * Returns the current battery level of the device as a percentage.
     *
     * @param {Function} successCallback -  The callback which will be called when the operation is successful.
     * This callback function is passed a single integer parameter which the current battery level percentage.
     * @param {Function} errorCallback -  The callback which will be called when the operation encounters an error.
     *  This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.getCurrentBatteryLevel = function(successCallback, errorCallback){
        return cordova.exec(successCallback,
            errorCallback,
            'Diagnostic',
            'getCurrentBatteryLevel',
            []);
    };

    /**
     * Checks if mobile data is enabled on device.
     *
     * @param {Function} successCallback -  The callback which will be called when the operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if mobile data is enabled.
     * @param {Function} errorCallback -  The callback which will be called when the operation encounters an error.
     *  This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.isMobileDataEnabled = function(successCallback, errorCallback) {
        return cordova.exec(Diagnostic._ensureBoolean(successCallback),
            errorCallback,
            'Diagnostic',
            'isMobileDataEnabled',
            []);
    };

    /**
     * Returns details of the OS of the device on which the app is currently running
     *
     * @param {Function} successCallback -  The callback which will be called when the operation is successful.
     * This callback function is passed a single object parameter with the following fields:
     * - {string} version - version string of the OS e.g. "11.0"
     * - {integer} apiLevel - API level of the OS e.g. 30
     * - {string} apiName - code name for API level e.g. "FROYO"
     * @param {Function} errorCallback -  The callback which will be called when the operation encounters an error.
     *  This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.getDeviceOSVersion = function(successCallback, errorCallback) {
        return cordova.exec(successCallback,
            errorCallback,
            'Diagnostic',
            'getDeviceOSVersion',
            []);
    };

    /**
     * Returns details of the SDK levels used to build the app.
     *
     * @param {Function} successCallback -  The callback which will be called when the operation is successful.
     * This callback function is passed a single object parameter with the following fields:
     * - {integer} targetApiLevel - API level of the target SDK (used to build the app)
     * - {string} targetApiName - code name for API level of the target SDK e.g. "FROYO"
     * - {integer} minApiLevel - API level of the minimum SDK (lowest on which the app can be installed)
     * - {string} minApiName - code name for API level of the minimum SDK e.g. "FROYO"
     * @param {Function} errorCallback -  The callback which will be called when the operation encounters an error.
     *  This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.getBuildOSVersion = function(successCallback, errorCallback) {
        return cordova.exec(successCallback,
            errorCallback,
            'Diagnostic',
            'getBuildOSVersion',
            []);
    };

    /***************
     * Bluetooth   *
     ***************/

    /**
     * Checks if the device has Bluetooth LE capabilities and if so that Bluetooth is switched on
     *
     * @param {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if device has Bluetooth LE and Bluetooth is switched on.
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.isBluetoothAvailable = function(successCallback, errorCallback) {
        if(cordova.plugins.diagnostic.bluetooth){
            cordova.plugins.diagnostic.bluetooth.isBluetoothAvailable.apply(this, arguments);
        }else{
            throw "Diagnostic Bluetooth module is not installed";
        }
    };

    /**
     * Returns the state of Bluetooth LE on the device.
     *
     * @param {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is passed a single string parameter which indicates the Bluetooth state as a constant in `cordova.plugins.diagnostic.bluetoothState`.
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.getBluetoothState = function(successCallback, errorCallback) {
        if(cordova.plugins.diagnostic.bluetooth){
            cordova.plugins.diagnostic.bluetooth.getBluetoothState.apply(this, arguments);
        }else{
            throw "Diagnostic Bluetooth module is not installed";
        }
    };


    /**
     * Registers a function to be called when a change in Bluetooth state occurs.
     * Pass in a falsey value to de-register the currently registered function.
     *
     * @param {Function} successCallback - function call when a change in Bluetooth state occurs.
     * This callback function is passed a single string parameter which indicates the Bluetooth state as a constant in `cordova.plugins.diagnostic.bluetoothState`.
     */
    Diagnostic.registerBluetoothStateChangeHandler = function(successCallback){
        if(cordova.plugins.diagnostic.bluetooth){
            cordova.plugins.diagnostic.bluetooth.registerBluetoothStateChangeHandler.apply(this, arguments);
        }else{
            throw "Diagnostic Bluetooth module is not installed";
        }
    };

    /**
     * Requests Bluetooth authorization for the application.
     * The outcome of the authorization request can be determined by registering a handler using `registerBluetoothStateChangeHandler()`.
     *
     * @param {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is not passed any parameters.
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.requestBluetoothAuthorization = function(successCallback, errorCallback) {
        if(cordova.plugins.diagnostic.bluetooth){
            cordova.plugins.diagnostic.bluetooth.requestBluetoothAuthorization.apply(this, arguments);
        }else{
            throw "Diagnostic Bluetooth module is not installed";
        }
    };

    Diagnostic.getBluetoothAuthorizationStatus = function(successCallback, errorCallback) {
        if(cordova.plugins.diagnostic.bluetooth){
            cordova.plugins.diagnostic.bluetooth.getAuthorizationStatus.apply(this, arguments);
        }else{
            throw "Diagnostic Bluetooth module is not installed";
        }
    };

    return Diagnostic;
})();
module.exports = Diagnostic;
