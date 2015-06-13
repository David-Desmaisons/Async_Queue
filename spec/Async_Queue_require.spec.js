describe("Async_Queue shoud be defined with require", function(){

    var injector;

    beforeEach(function(done) {
        require(["Squire"],function(Squire){
            injector = new Squire();
            done();
        });
    });

    afterEach(function() {
       injector.remove();
    });

    it("enQueue should exist", function(done) {
        injector.require(["Async_Queue"],function(Async_Queue){
            var v = new Async_Queue();
            expect(v.enQueue).not.toBeUndefined();
            done();
        })
    });
    
});

