Module.register("MMM-BabyTime", {
	// defualt module config 
	defaults: {
		updateInterval: 1, // UNIT: minutes
	},

	// define sstart sequence 
	start: function() {
		Log.info("Starting module: "+ this.name);

		this.loaded 	= false;
		this.co2			= "-";
		this.temperature	= "-";

		this.update();
		setInterval(
			this.update.bind( this ),
			this.config.updateInterval * 1000
		);
	},

	update: function() {
		this.sendSocketNotification("REQUEST", this.config);
	},

	// Override dom generator
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.className = "bright light big";

		if (!this.loaded) {
			wrapper.innerHTML = "Loading ...";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		var temperature 	= document.createElement("div");
		temperature.innerHTML = "온도: "+ this.temperature;
		temperature.className += "MMM-MH_Z19B_STRING";
		wrapper.appendChild( temperature );

		var co2 		= document.createElement("div");
		co2.innerHTML 	= "CO² : "+ this.co2;
		co2.className 	+= "MMM-MH_Z19B_STRING";
		wrapper.appendChild( co2 );

		return wrapper;
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === 'DATA') {
			this.co2			= payload.co2;
			this.temperature	= payload.temperature;

			this.loaded = true;
			this.updateDom();
		}
	},
});

