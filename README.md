javascript Async_Queue 
-----------------------------------------

## motivation
Create a generic task queue wich handles both synchroneous and asynchroneous tasks and respects the order of the entry in the queue.
Asynchroneous tasks are handled using function that returns javascript promises.

## depedency
promise polyfill

## Sample usage

```js
  // creating the queue
  var queue = new Async_Queue();

  // Adding tasks to Async_Queue
  //this function will be evaluated synchronously
  v.enQueue(function(){.... });

  //then this promise will run until completion
  v.enQueue(function(){
      return new Promise(function(resolve, reject) {
        setTimeout(function(){ resolve(null); },1000);
      });
  });
  
  //this second promise will run after completion of first promise
  v.enQueue(function(){
      return new Promise(function(resolve, reject) {
        setTimeout(function(){ resolve(null); },1000);
      });
  });
  
  //this function will be executed after completion of second promise
  v.enQueue(function(){.... });

```
