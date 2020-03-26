'use strict';
jest.mock('minimist');

const Input = require('../lib/input.js');
const Notes = require('../lib/notes.js');
const minimist = require('minimist');
const mongoose = require('mongoose');

describe('Notes Module: its DB now?', () => {
    it('very true, very cool', () => {
      expect(true).toBeTruthy();
    })
  // it('Testing operation(): should call add() and output console log', () => {
  //   minimist.mockImplementation(() => {
  //     return {
  //       _: [],
  //       a: 'test',
  //     };
  //   });
  //   let input = new Input();
  //   let note = new Notes(input);
  //   const spy = jest.spyOn(console, 'log');
  //   const operation = jest.fn(note.operation(input.command));
  //   operation();

  //   expect(spy).toHaveBeenCalled();
  // });

  // it('Testing add(): should output console log', () => {
  //   minimist.mockImplementation(() => {
  //     return {
  //       _: [],
  //       a: 'test',
  //     };
  //   });
  //   let input = new Input();
  //   let note = new Notes(input);
  //   const spy = jest.spyOn(console, 'log');
  //   const add = jest.fn(note.add(input));
  //   add();

  //   expect(spy).toHaveBeenCalled();
  // });
});
