'use strict';

jest.mock('minimist');

const minimist = require('minimist');

const Input = require('../lib/input.js');


describe('Testing input module', () => {

  it('Testing invalid flag, command should be empty', () => {
    minimist.mockImplementation(() => {
      return {
        _: [],
        b: 'text',
      };
    });
    const input = new Input();
    expect(input.command.action).toBeFalsy();
  });

  it('Testing no data after -a flag, command should be empty', () => {
    minimist.mockImplementation(() => {
      return {
        _: [],
        a: true,
      };
    });
    const input = new Input();
    expect(input.command.action).toBeFalsy();
  });

  it('Testing valid -a flag and data: command should have action add', () => {
    minimist.mockImplementation(() => {
      return {
        _: [],
        a: 'text',
      };
    });
    const input = new Input();
    expect(input.command.action).toStrictEqual('add');
  });

  it('Testing --add flag with data, command should have action add', () => {
    minimist.mockImplementation(() => {
      return {
        _: [],
        add: 'text',
      };
    });
    const input = new Input();
    expect(input.command.action).toStrictEqual('add');
  });

  it('Testing --add flag with data and category, command should have category', () => {
    minimist.mockImplementation(() => {
      return {
        _: [],
        add: 'text',
        category: 'testing'
      };
    });
    const input = new Input();
    expect(input.command.category).toStrictEqual('testing');
  });

  it('Testing -l flag, command should have action list', () => {
    minimist.mockImplementation(() => {
      return {
        _: [],
        l: true
      }
    });
    const input = new Input();
    expect(input.command.action).toStrictEqual('list');
  });

  it('Testing --list flag, command should have action list', () => {
    minimist.mockImplementation(() => {
      return {
        _: [],
        list: true
      }
    });
    const input = new Input();
    expect(input.command.action).toStrictEqual('list');
  });

  it('Testing --list flag with category, command should have category property', () => {
    minimist.mockImplementation(() => {
      return {
        _: [],
        list: "school"
      }
    });
    const input = new Input();
    expect(input.command.category).toStrictEqual('school');
  });

  it('Testing -d flag with no data, id should be null', () => {
    minimist.mockImplementation(() => {
      return {
        _: [],
        d: true
      }
    });
    const input = new Input();
    expect(input.command.id).toStrictEqual(null);
  });

  it('Testing -d flag with id, id should exist', () => {
    minimist.mockImplementation(() => {
      return {
        _: [],
        d: "123456"
      }
    });
    const input = new Input();
    expect(input.command.id).toBeTruthy();
  });
  
});
