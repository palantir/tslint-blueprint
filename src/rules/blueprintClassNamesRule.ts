/**
 * @license
 * Copyright 2017 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as Lint from "tslint";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "** ERROR MESSAGE HERE **";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        // This creates a WalkContext<T> and passes it in as an argument.
        // An optional 3rd parameter allows you to pass in a parsed version
        // of this.ruleArguments. If used, it is preferred to parse it into
        // a more useful object than this.getOptions().
        return this.applyWithFunction(sourceFile, walk);
    }
}

function walk(ctx: Lint.WalkContext<void>): void {
    return ts.forEachChild(ctx.sourceFile, cb);

    function cb(node: ts.Node): void {
        // Stop recursing further into the AST by returning early.
        // TODO

        // Add failures on the WalkContext<T>.
        // TODO

        // Continue recursion into the AST.
        return ts.forEachChild(node, cb);
    }
}
