// Cheatsheet of understading the 'this' keyword

// Standard usage of 'this'

// 1. Global Object: 'this' is by default binded to the global object
console.log(this); // logs the windows object

// 2. Free Function Inovcation: 'this' is binded to the global object
var logThis = function(){console.log(this)};
logThis() // logs the windows object

// 3A. Call / Apply: 'this' is binded to the first argument
var logThis = function(){console.log(this)};
var obj = {
  a: true
}
logThis.apply(obj);

// 3B: Bind method: 'this' is binded to the first argument
var logThis = function(){console.log(this)};
var obj = {
  a: true
}
var binded = logThis.bind(obj);
binded();

// 4: Method: 'this' is binded to the object
var obj2 = {
  log: function(){
    console.log(this);
  }
};
obj2.log();

// 5: Using the new keyword: 'this' is binded to Object.create(Class.prototype);
var Animal = function(name,age,height){
  this.name = name;
  this.age = age;
  this.height= height;
};

Animal.prototype.sayHi = function(){
  console.log("Hi my name is " + this.name);
};

Animal.prototype.spam = function(){
  var binded = this.spam.bind(this);
  console.log('spam!');
  setTimeout(binded,1000);
};

//Instantiate
var animal = new Animal;
animal.spam();

// ###########################
// Special examples

// Having an object method point to another object method
var obj = {
  alog: obj2.log
};
var obj2 = {
  log: function(){
    console.log(this);
  }
};
obj.alog(); // log obj

// Passing in a call-back function
var callsBack = function(func) {
  func();
};

callsBack(obj.alog); // logs window object

// Address the call-back function with a wrapper function
callsBack(function(){obj.alog()}); // logs obj
// Or using the bind function
var binded = obj.alog.bind(obj);
callsBack(binded);

// Dealing with nested object
var nestedObj = {
  a: 'hello',
  d: 'whatever',
  logger: function(){console.log(nestedObj.b)}, // logs global object
  anotherObj: {
    a: 'blame',
    logThis: function(){console.log(this)}, // logs anotherObj
  }
};


