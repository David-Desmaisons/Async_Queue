describe("Async_Queue shoud be defined", function(){
    var v = new Async_Queue();

    it("should exist", function() {
        expect(v).not.toBeUndefined();
    });

      it("should have enQueue function", function() {
        expect(v.enQueue).not.toBeUndefined();
    });

    it("should have deQueue function", function() {
        expect(v.deQueue).not.toBeUndefined();
    });

    afterEach(function() {
       expect(v.running).toBe(false);
    });
});


describe("Async_Queue shoud work with syncroneous function", function(){
    var v = new Async_Queue(),res=0;

    it("should work synchroneously when queue is empty", function() {
    	v.enQueue(function(){res=1;});
        expect(res).toBe(1);
    });

    afterEach(function() {
       expect(v.running).toBe(false);
    });
});

describe("Async_Queue shoud work asyncroneously with promise", function(){
    var v = new Async_Queue(),res=0, resexpteced=0;

    beforeEach(function() {
        res=0;
    });

    it("should work asynchroneously when queue is empty", function(done) {
    	v.enQueue(function(){
    		return new Promise(function(resolve, reject) {
	 			setTimeout(function(){  expect(res).toBe(0);  res =1; resolve(null); done();},100);
	 		});
    	});

        resexpteced=1;
    });

    it("should chain asynchroneously promises", function(done) {
        v.enQueue(function(){
            return new Promise(function(resolve, reject) {
                setTimeout(function(){ expect(res).toBe(0); res =1; resolve(null);},200);
            });
        });

         v.enQueue(function(){
            return new Promise(function(resolve, reject) {
                setTimeout(function(){ expect(res).toBe(1); res =2; resolve(null); done();},10);
            });
        });

         resexpteced=2;
    });

    afterEach(function(done) {
        setTimeout(function(){ 
            expect(res).toBe(resexpteced); 
            expect(v.running).toBe(false); 
            done();
        },0);       
    });

});


describe("Async_Queue shoud work asyncroneously with a mix of promise and function", function(){
    var v = new Async_Queue(), res=0, resexpteced=0;

    beforeEach(function() {
        res=0;
    });

    it("should call asynchroneously function when queue contains a promise", function(done) {
        v.enQueue(function(){
            return new Promise(function(resolve, reject) {
                setTimeout(function(){ expect(res).toBe(0); res=1;resolve(null); },100);
            });
        });
        v.enQueue(function(){ 
            expect(res).toBe(1); 
            res=2; 
            done();
        });
        expect(res).toBe(0);
        resexpteced=2;
    });

    it("should call asynchroneously and chain functions when queue contains a promise", function(done) {
        v.enQueue(function(){
            return new Promise(function(resolve, reject) {
                setTimeout(function(){ expect(res).toBe(0); res=1;resolve(null); },100);
            });
        });
        v.enQueue(function(){ expect(res).toBe(1); res=2; done();});
        v.enQueue(function(){ expect(res).toBe(2); res=3; });
        v.enQueue(function(){ expect(res).toBe(3); res=4; });

        expect(res).toBe(0);
        resexpteced=4;
    });

    afterEach(function(done) {
        setTimeout(function(){ 
            expect(res).toBe(resexpteced); 
            expect(v.running).toBe(false); done();
        },0);       
    });

});


