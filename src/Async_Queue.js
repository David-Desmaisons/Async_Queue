function  Async_Queue(){
    
	this.queue = [];
	this.running = false;
}

Async_Queue.prototype.enQueue = function(operation){

	this.queue.push(operation);
    this.deQueue();
};


Async_Queue.prototype.deQueue = function(){

    if (this.running)
    	return;

    this.running=true;

    function checkForNext(){

        var self = this;

    	if (!self.queue.length){
    		self.running=false;
    		return;
    	}

    	var next  = self.queue.shift(), res = next();
    	if (!!res && res instanceof Promise)
    		res.then(function(){checkForNext.apply(self);});
    	else
    		checkForNext.apply(self);
    }

    checkForNext.apply(this);
};


