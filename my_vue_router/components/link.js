export default {
    props: {
        to: {
            type:String,
            required: true,
        },
    },

    render(h) {
        // 转为虚拟 DOM
        return h(
            // 标签名
            'a',
            // 标签属性
            {
                domProps: {
                    href: '#' + this.to,
                },
            },
            // 标签里的内容，默认为插槽
            [this.$slots.default]
        )
    }
}