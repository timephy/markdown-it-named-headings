module.exports = function plugin(md, options) {
    md.core.ruler.push('named_headings', namedHeadings.bind(null, md))
}

function namedHeadings(md, state) {
    state.tokens.forEach(function (token, i) {
        if (token.type === 'heading_open') {
            // var text = md.renderer.render(state.tokens[i + 1].children, md.options)
            // var text = encodeURIComponent(state.tokens[i + 1].children[0].content)
            var text = state.tokens[i + 1].children[0].content.replaceAll(' ', '-')
            setAttr(token, 'id', text)
        }
    })
}

function setAttr(token, attr, value, options) {
    var idx = token.attrIndex(attr)

    if (idx === -1) {
        token.attrPush([attr, value])
    } else if (options && options.append) {
        token.attrs[idx][1] =
            token.attrs[idx][1] + ' ' + value
    } else {
        token.attrs[idx][1] = value
    }
}
