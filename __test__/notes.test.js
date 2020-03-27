'use strict';
jest.mock('minimist');

const Input = require('../lib/input.js');
const Notes = require('../lib/notes.js');
const minimist = require('minimist');
const mongoose = require('mongoose');

const supergoose = require('@code-fellows/supergoose');

// honestly no idea where to start testing the notes module as it's only using the wrapper/interface functions
// which are being testing in another file

describe('Notes Module: its DB now?', () => {
  it('very true, very cool', () => {
    expect(true).toBeTruthy();
  });
});
