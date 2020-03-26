'use strict';

const Validator = require('../lib/validator.js');

const schema = {
  action: { type: 'string', required: true },
  payload: { type: 'string', required: true }
}

const validator = new Validator(schema);

describe('Testing validator module', () => {
  it('testing non-object: array', () => {
    expect(validator.isValid([1, 2, 3])).toBeFalsy();
  });

  it('testing non-object: number', () => {
    expect(validator.isValid(7)).toBeFalsy();
  });

  it('testing isValid command', () => {
    const command = {
      action: 'add',
      payload: 'TEST'
    }
    expect(validator.isValid(command)).toBeTruthy();
  });

  it('testing invalid command property types', () => {
    const command = {
      action: true,
      payload: ['TEST']
    }
    expect(validator.isValid(command)).toBeFalsy();
  });

  it('testing isCorrectType method: good input', () => {
    expect(validator.isCorrectType('TEST', {type: 'string', required: true})).toBeTruthy();
  });

  it('testing isCorrectType method: bad input', () => {
    expect(validator.isCorrectType(7, {type: 'string', required: true})).toBeFalsy();
  });

  it('testing isTruthy method: true', () => {
    expect(validator.isTruthy(true)).toBeTruthy();
  });

  it('testing isTruthy method: false', () => {
    expect(validator.isTruthy(false)).toBeFalsy();
  });

  it('testing isString method: good input', () => {
    expect(validator.isString('hello')).toBeTruthy();
  });

  it('testing isString method: bad input', () => {
    expect(validator.isString(8)).toBeFalsy();
  });

  it('testing isNumber method: good input', () => {
    expect(validator.isNumber(7)).toBeTruthy();
  });

  it('testing isNumber method: bad input', () => {
    expect(validator.isNumber({hello: 'test'})).toBeFalsy();
  });
})