// Async_Queue 0.0.0 | (c) 2015 David Desmaisons |  http://www.opensource.org/licenses/mit-license
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


// Async_Queue.prototype.deQueue = function(){

//     if (this.running)
//     	return;

//     this.running=true;

//     function checkForNext(){

//         var self = this;

//     	if (!self.queue.length){
//     		self.running=false;
//     		return;
//     	}

//     	var next  = self.queue.shift(), res = next();
//     	if (!!res && res instanceof Promise)
//     		res.then(function(){checkForNext.apply(self);});
//     	else
//     		checkForNext.apply(self);
//     }

//     checkForNext.apply(this);
// };


