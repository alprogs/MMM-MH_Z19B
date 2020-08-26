'use strict';

/* Magic Mirror
 * Module: MMM-MH_Z19B
 *
 * By Brad Kim
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
const exec = require('child_process').exec;

module.exports = NodeHelper.create({
	start: function () {
		console.log('[MMM-MH_Z19B] MMM-MH_Z19B helper started ...');
	},

	socketNotificationReceived: function(notification, payload) {
		const self = this;
		if (notification === 'REQUEST') {
			const self = this
			this.config = payload

			exec("sudo python3 -m mh_z19 --all", (error, stdout) => {
				if (error) {
					console.error(`exec error: ${error}`);
					return;
				}

				console.log('[MMM-MH_Z19B] ext.tool log: '+ stdout);

				var result = {};

				try {
					result 	= JSON.parse( stdout );
				} catch (e) {
					console.log("ERR: "+ e);
				}

				self.sendSocketNotification('DATA', {
					co2 		: result["co2"],
					temperature : result["temperature"]
				});
			});
		}
	}
});

