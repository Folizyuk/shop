import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export default class Helpers {

  static debounce() {
    let timeout;

    return function(fn, time) {
      const functionCall = () => fn.apply(this, arguments);

      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
    }
  }

  /*Generate unique id*/
  static uuidv4() {
    /*eslint no-mixed-operators: "error"*/
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c === "x" ? r : ((r & 0x3) | 0x8);
      return v.toString(16);
    });
  }

  /*Check obj keys length*/
  static size(obj) {
    try {
      return Object.keys(obj).length;
    } catch (e) {
      console.warn(e.message)
    }

  }

  /* Deep copy of Object */
  static deepCopy (input) {
    if(!Helpers.size(input)) return {};
    return JSON.parse(JSON.stringify(input));
  }

  static isEmptyObj(myObject) {
    for(let key in myObject) {
      if (myObject.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  static toMongoID(id) {
    return typeof id === 'string' ?
      new Meteor.Collection.ObjectID(id) :
      new Meteor.Collection.ObjectID(id._str);
  }

  static getObjectFromParams(paramsStr) {
    const urlSearchParams = new URLSearchParams(paramsStr);
    const obj = {};
    urlSearchParams.forEach((value, name) => {
      //if (typeof value === 'undefined' || value === null) return;
      let parsedValue = value;
      if (!isNaN(value) && typeof Number(value) === 'number') parsedValue = Number(value); //check is number
      else if (parsedValue === 'true') parsedValue = true; // check is true
      else if (parsedValue === 'false') parsedValue = false; // check is false
      obj[name] = parsedValue;
    });
    return obj;
  }


  static getQueryStringFromObj(paramsObj) {
    const searchParams = new URLSearchParams();
    Object.keys(paramsObj).forEach(key => searchParams.append(key, paramsObj[key]));
    return searchParams.toString();
  }

}
