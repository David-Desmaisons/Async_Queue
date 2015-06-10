function  Async_Queue(){
    
	this.queue = [];
	this.running = false;
}

Async_Queue.prototype.enQueue = function(operation){

     function deQueue(self){

        if (self.running)
            return;

        self.running=true;

        function checkForNext(self){

            if (!self.queue.length){
                self.running=false;
                return;
            }

            var next  = self.queue.shift(), res = next();
            if (!!res && res instanceof Promise)
                res.then(function(){checkForNext(self);});
            else
                checkForNext(self);
        }

        checkForNext(self);
    };

	this.queue.push(operation);
    deQueue(this);
};

