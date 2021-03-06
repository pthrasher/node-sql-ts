'use strict';

import _ = require('lodash');
import { AliasNode, IAliasMixin, IValueExpressionMixin, Node, valueExpressionMixin } from '.';

let valueExpressionMixed = false;
export class InNode extends Node {
    public left: Node;
    public right: Node;
    constructor(config: { left: Node; right: Node }) {
        super('IN');
        this.left = config.left;
        this.right = config.right;

        // Delay mixin to runtime, when all nodes have been defined, and
        // mixin only once. ValueExpressionMixin has circular dependencies.
        if (!valueExpressionMixed) {
            valueExpressionMixed = true;
            _.extend(InNode.prototype, valueExpressionMixin());
        }
    }
}

_.extend(InNode.prototype, AliasNode.AliasMixin);

export interface InNode extends IValueExpressionMixin, IAliasMixin {}
