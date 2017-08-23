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
import { nodeIsKind } from "../guards";

export class Rule extends Lint.Rules.AbstractRule {
    /* tslint:disable:object-literal-sort-keys */
    public static metadata: Lint.IRuleMetadata = {
        ruleName: "blueprint-class-name",
        description: "Checks for Blueprint class names that are expressed as string literals",
        descriptionDetails: Lint.Utils.dedent
            `Using string literals instead of a constant from @blueprintjs/core's Classes or IconClasses
            is prone to typos and prevents compile-time validation of the CSS class's existence.`,
        options: null,
        optionsDescription: "",
        optionExamples: ["true"],
        type: "maintainability",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */

    public static FAILURE_STRING = "Use a constant from Classes or IconClasses instead of a string literal";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk);
    }
}

function walk(ctx: Lint.WalkContext<void>) {
    return ts.forEachChild(ctx.sourceFile, callback);

    function callback(node: ts.Node): void {
        if (nodeIsKind(node, ts.SyntaxKind.StringLiteral)) {
            const { text } = (node as ts.StringLiteral);
            if ((text !== "pt-" && text.startsWith("pt-")) || (text !== ".pt-" && text.startsWith(".pt-"))) {
                return ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
            }
        }

        return ts.forEachChild(node, callback);
    }
}
