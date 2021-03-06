import stylelint from "../../"

const ruleName = "warn-about-foo"

const warnAboutFooMessages = stylelint.utils.ruleMessages("warn-about-foo", {
  found: "found .foo",
  notFound: "never found .foo",
})

export default stylelint.createPlugin(ruleName, function (expectation) {
  return (root, result) => {
    let foundFoo
    root.walkRules(rule => {
      if (rule.selector === ".foo") {
        if (expectation === "always") {
          stylelint.utils.report({
            result,
            ruleName,
            message: warnAboutFooMessages.found,
            node: rule,
          })
          foundFoo = true
        }
      }
    })
    if (!foundFoo) {
      stylelint.utils.report({
        result,
        line: 1,
        ruleName,
        message: warnAboutFooMessages.notFound,
      })
    }
  }
})
