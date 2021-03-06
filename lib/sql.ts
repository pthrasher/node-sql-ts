'use strict';

import _ = require('lodash');
import sliced = require('sliced');
import { Column } from './column';
import { SQLDialects, TableDefinition } from './configTypes';
import { DEFAULT_DIALECT, getDialect } from './dialect';
import * as functions from './functions';
import { ArrayCallNode, FunctionCallNode, IntervalNode, Query } from './node';
import { Table, TableWithColumns } from './table';

class Sql {
    public functions: { [key: string]: (...args: any[]) => FunctionCallNode };
    public dialect: any;
    public dialectName!: SQLDialects;
    public config: any;
    // tslint:disable-next-line:variable-name
    private _function: any;
    constructor(dialect: SQLDialects = DEFAULT_DIALECT, config: any = {}) {
        this.setDialect(dialect, config);
        // attach the standard SQL functions to this instance
        this.functions = functions.getStandardFunctions();
        this._function = functions.getFunctions;
    }
    // Define a function
    public function(functionNames: string[]): { [key: string]: (...args: any[]) => FunctionCallNode };
    public function(functionName: string): (...args: any[]) => FunctionCallNode;
    public function(...args: any[]): any {
        return this._function(...args);
    }
    // Define a table
    public define<T>(def: TableDefinition): TableWithColumns<T> {
        def = _.defaults(def || {}, {
            sql: this
        });
        return Table.define(def);
    }
    // Returns a bracketed call creator literal
    public array(...args: any[]) {
        const arrayCall = new ArrayCallNode(sliced(args));
        return arrayCall;
    }
    // Returns a select statement
    public select(...args: any[]) {
        const query = new Query({ sql: this } as any);
        query.select(...args);
        return query;
    }
    // Returns an interval clause
    public interval(...args: any[]) {
        const interval = new IntervalNode(sliced(args));
        return interval;
    }
    // Set the dialect
    public setDialect(dialect: SQLDialects, config: any = {}) {
        this.dialect = getDialect(dialect);
        this.dialectName = dialect;
        this.config = config;
        return this;
    }
    // Create a constant Column (for use in SELECT)
    public constant(value: any) {
        const config = {
            constantValue: value,
            isConstant: true,
            name: 'constant',
            property: 'constant'
        };
        const cn = new Column(config);
        return cn;
    }
}

export { Sql, Table };
