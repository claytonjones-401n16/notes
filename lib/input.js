'use strict';

/**
 * Input
 * @module input
 */

/**
 * Input - class
 * @function Input
 */


const minimist = require('minimist');
const Validator = require('./validator.js');


class Input {
  constructor() {
    this.args = minimist(process.argv.slice(2));
  
    this.command = {};
    // this.category;

    // looping over object of user input to determine action and data for command object
    Object.entries(this.args).forEach(argArr => {
      switch(argArr[0]) {
        case 'a':
        case 'add':
          if (typeof argArr[1] !== 'boolean') this.command = {action: 'add', payload: argArr[1]};
          break;
        case 'category':
          this.command.category = argArr[1];
          break;
        case 'l':
        case 'list':
          this.command = {action: 'list', category: argArr[1]};
          if (typeof this.command.category === 'boolean') this.command.category = null;
          break;
        case 'd':
          this.command = { action: 'delete', id: argArr[1] };
          if (typeof argArr[1] === 'boolean') this.command.id = null;
        default:
          break;
      }
    });
  }
}

// exports the Input constructor
module.exports = Input;
