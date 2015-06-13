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

    it("should exist", function(done) {
        injector.require(["Async_Queue"],function(qd){
            var v = new qd.Async_Queue();
            expect(v.enQueue).not.toBeUndefined();
            done();
        })
    });
    
});

