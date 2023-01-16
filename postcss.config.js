module.exports = (ctx) => ({
    map: ctx.env !== 'production',
    plugins: {
        'postcss-nested': {},
        'autoprefixer': {},
    }
});