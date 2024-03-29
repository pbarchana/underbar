/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {

    if ( array == undefined || array == null )
      return array;
    if ( n == undefined || n == null )  //if n value is unspecified return first element of array
      return array[0];
    if ( n <= 0 )   // if n==0 or n is negative return empty array
      return [];
    else
      return array.slice(0 , n);  //slice the array from index 0 to n 
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {

    if ( array == undefined || array == null )
      return array;
    if ( n == undefined || n == null )  //if n value is unspecified return first element of array
      return array[ array.length - 1 ];
    if ( n <= 0 )   // if n==0 or n is negative return empty array
      return [];

    n = Math.max(array.length - n, 0);   
      return array.slice(n);    
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {

    if (Array.isArray (collection)) {
      // for array
      for ( var i = 0 ; i < collection.length ; i++ ){
        iterator (collection[i], i, collection);     // value, index, collection
      }
    } else {
      // for object
      for ( var key in collection ) {
        iterator (collection[key], key, collection);    //value, key, collection
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result_index = -1;
    if (array == undefined || array.length <= 0)
      return -1;
    _.each(array,function (elem, index, array){
      if ((result_index < 0) && (target == elem))  
        result_index = index;
    });
    return result_index;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var result_array = [];
    _.each(collection, function(value, key, collection){
        if (iterator(value)){
          result_array.push(value);
        }
    });
    return result_array;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(x){
      return !iterator(x);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var result_array = [];
    _.each(array, function(value, key, collection){
        if (_.indexOf(result_array, value) < 0 )
          result_array.push(value);  
    });
    return result_array;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result_array = [];
    _.each(array, function(value, key, collection){
        result_array.push(iterator(value));
    });
    return result_array;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    if (typeof methodName === 'function') {    // methodName = Array.prototype.sort
      return _.map(list, function (value){
        return methodName.apply(value, args);
      });
    }
    else if (typeof methodName === 'string') { // methodName = 'sort'
      return _.map(list, function(value){
          return value[methodName].apply(value, args);
      });
    }
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(collection, iterator, initialValue) {
    if (initialValue == undefined){
      initialValue = 0;
    }
    _.each(collection, function(value, key, collection){
      initialValue = iterator(initialValue, value);
    });
    return initialValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if(wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    var func = function (previousValue, value){
      if (previousValue === true){
        if (iterator == undefined){
          return !!value;  
        }
        else {
          return !!iterator(value);
        }
      }
      return false;
    };
    var initialValue = true;
    return _.reduce(collection, func, initialValue);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    // some(or any) element passes truth test == not every(or all) element passing false test  
    return !_.every(collection, function (value){
      if (iterator == undefined) {
        return !value;
      }
      else {
        return !iterator(value);
      }
    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {

    var args = Array.prototype.slice.call(arguments, 1);
    _.each(args, function(arg){   //arg can be an array of objects 
      _.each(arg, function (value, key, arg){     //fetch each arg and iterate through its key-value pair
            obj[key] = arg[key];
      });
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {

    var args = Array.prototype.slice.call(arguments, 1);
    _.each(args, function(arg){   //arg can be an array of objects 
      _.each(arg, function (value, key, arg){     //fetch each arg and iterate through its key-value pair
          if(obj[key] === undefined){
              obj[key] = arg[key];
          } 
      });
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var result = {};

    return function(){
      var arg = Array.prototype.slice.call(arguments);

      if(result[arg] === undefined) {
        result[arg] = func(arg);
      }
      return result[arg];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    setTimeout(function(){ func.apply(this, args)} , wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  _.shuffle = function(array) {
    var shuffled = [];
    var n = array.length;
    _.each(array, function(value) {
      var random = Math.floor(Math.random() * n);
      shuffled[random] = value;
    });    
    return shuffled;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var list = [];
    var result = [];
    var visited = [];
    _.each(collection, function(obj) {    // values after applying iterator stored in an array
      var tmp = ((typeof(iterator) === "string")? obj[iterator] : iterator(obj));
      list.push(tmp);
      visited.push(false);
    });

    list = list.sort();   // values after applying iterator are sorted

    _.each(list, function(item){  // for each value in sorted list
      _.each(collection, function(obj, index) {   // find the corresponding object in collection
        var tmp = ((typeof(iterator) === "string")? obj[iterator] : iterator(obj));
        if(item === tmp && !visited[index]){
          result.push(obj);
          visited[index] = true;  // mark the object in collection as visited
        }
      });
    });
    return result;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var aList = arguments;  
    var result = [];

    //find the max index
    var max = 0;
    _.each(aList, function(array){
      if (max < array.length) {
        max = array.length;
      }
    });

    for(var i=0; i < max; i++ ) {
      var temp = [];
      _.each(aList, function (array) {
        temp.push(array[i]);
      });
      result.push(temp);
    }
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    if(result === undefined || result === null) {
      result = [];
    }
    var traverseArray = function(array) {
      _.each(array, function(value) {
        if(Array.isArray(value)){
          traverseArray(value);
        }
        else {
          result.push(value);
        }
      });
    };

    traverseArray(nestedArray);
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  
    var aList = arguments; 
    var firstArray = aList[0];
    var result = [];
      _.each(firstArray,function (item){
        var found = false;
        _.each(aList, function (array, index){
          if(index != 0) {
            if(_.contains(array, item)) {//check all other arrays except the first array
              found = true;
            }
            else
              found = false;
          }
        });
        if (found){
          result.push(item);
        }
      }); 
      return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var aList = arguments;     
    var firstArray = aList[0];
    var result = [];

    _.each(firstArray,function (item){

      var found = false;
      _.each(aList, function(array, index){
        if (index != 0) {
          found = found || _.contains(array, item);
        }        
      });
      if(!found) {
        result.push(item);
      }
    });
    return result;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
