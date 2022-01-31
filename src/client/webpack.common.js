const path = require('path');

module.exports = {
    /**************** Project Entries ******************/
    //entry: './src/client/Projects/Protobytes/ProtoByte_prototype_v01/sketch.ts',
    //entry: './src/client/Projects/Other/ParasiticCleavage/sketch.ts',
    //entry: './src/client/Projects/Other/ParasiticEmission/sketch.ts',
    entry: './src/client/Projects/Other/ToneExperiment/sketch.ts',
    //entry: './src/client/Projects/Other/ToneExperiment02/sketch.ts',
    /************************************************ */
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        alias: {
            three: path.resolve('./node_modules/three')
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../../dist/client'),
    }
};