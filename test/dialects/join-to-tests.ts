'use strict';

import * as Harness from './support';
import { Sql } from '../../lib';
const instance = new Sql('postgres');

var user = instance.define({
    name: 'user',
    columns: {
        id: {
            primaryKey: true
        }
    }
});

var photo = instance.define({
    name: 'photo',
    columns: {
        ownerId: {
            references: 'user'
        }
    }
});

var post = instance.define({
    name: 'post',
    columns: {
        id: {
            primaryKey: true
        },
        ownerId: {
            references: {
                table: 'user',
                column: 'id'
            }
        }
    }
});

Harness.test({
    query: user.joinTo(post),
    pg: {
        text: '"user" INNER JOIN "post" ON ("user"."id" = "post"."ownerId")',
        string: '"user" INNER JOIN "post" ON ("user"."id" = "post"."ownerId")'
    },
    sqlite: {
        text: '"user" INNER JOIN "post" ON ("user"."id" = "post"."ownerId")',
        string: '"user" INNER JOIN "post" ON ("user"."id" = "post"."ownerId")'
    },
    mysql: {
        text: '`user` INNER JOIN `post` ON (`user`.`id` = `post`.`ownerId`)',
        string: '`user` INNER JOIN `post` ON (`user`.`id` = `post`.`ownerId`)'
    },
    mssql: {
        text: '[user] INNER JOIN [post] ON ([user].[id] = [post].[ownerId])',
        string: '[user] INNER JOIN [post] ON ([user].[id] = [post].[ownerId])'
    },
    oracle: {
        text: '"user" INNER JOIN "post" ON ("user"."id" = "post"."ownerId")',
        string: '"user" INNER JOIN "post" ON ("user"."id" = "post"."ownerId")'
    },
    params: []
});

Harness.test({
    query: post.joinTo(user),
    pg: {
        text: '"post" INNER JOIN "user" ON ("user"."id" = "post"."ownerId")',
        string: '"post" INNER JOIN "user" ON ("user"."id" = "post"."ownerId")'
    },
    sqlite: {
        text: '"post" INNER JOIN "user" ON ("user"."id" = "post"."ownerId")',
        string: '"post" INNER JOIN "user" ON ("user"."id" = "post"."ownerId")'
    },
    mysql: {
        text: '`post` INNER JOIN `user` ON (`user`.`id` = `post`.`ownerId`)',
        string: '`post` INNER JOIN `user` ON (`user`.`id` = `post`.`ownerId`)'
    },
    mssql: {
        text: '[post] INNER JOIN [user] ON ([user].[id] = [post].[ownerId])',
        string: '[post] INNER JOIN [user] ON ([user].[id] = [post].[ownerId])'
    },
    oracle: {
        text: '"post" INNER JOIN "user" ON ("user"."id" = "post"."ownerId")',
        string: '"post" INNER JOIN "user" ON ("user"."id" = "post"."ownerId")'
    },
    params: []
});

Harness.test({
    query: user.joinTo(photo),
    pg: {
        text: '"user" INNER JOIN "photo" ON ("user"."id" = "photo"."ownerId")',
        string: '"user" INNER JOIN "photo" ON ("user"."id" = "photo"."ownerId")'
    },
    sqlite: {
        text: '"user" INNER JOIN "photo" ON ("user"."id" = "photo"."ownerId")',
        string: '"user" INNER JOIN "photo" ON ("user"."id" = "photo"."ownerId")'
    },
    mysql: {
        text: '`user` INNER JOIN `photo` ON (`user`.`id` = `photo`.`ownerId`)',
        string: '`user` INNER JOIN `photo` ON (`user`.`id` = `photo`.`ownerId`)'
    },
    mssql: {
        text: '[user] INNER JOIN [photo] ON ([user].[id] = [photo].[ownerId])',
        string: '[user] INNER JOIN [photo] ON ([user].[id] = [photo].[ownerId])'
    },
    oracle: {
        text: '"user" INNER JOIN "photo" ON ("user"."id" = "photo"."ownerId")',
        string: '"user" INNER JOIN "photo" ON ("user"."id" = "photo"."ownerId")'
    },
    params: []
});
