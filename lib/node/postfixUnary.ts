'use strict';

import _ = require('lodash');
import { AliasNode, IAliasMixin, IValueExpressionMixin, Node, valueExpressionMixin } from '.';

let valueExpressionMixed = false;
export class PostfixUnaryNode extends Node {
    public left: Node;
    public operator: string;
    constructor(config: { left: Node; operator: string }) {
        super('POSTFIX UNARY');
        this.left = config.left;
        this.operator = config.operator;

        // Delay mixin to runtime, when all nodes have been defined, and
        // mixin only once. ValueExpressionMixin has circular dependencies.
        if (!valueExpressionMixed) {
            valueExpressionMixed = true;
            _.extend(PostfixUnaryNode.prototype, valueExpressionMixin());
        }
    }
}

_.extend(PostfixUnaryNode.prototype, AliasNode.AliasMixin);

export interface PostfixUnaryNode extends IValueExpressionMixin, IAliasMixin {}
