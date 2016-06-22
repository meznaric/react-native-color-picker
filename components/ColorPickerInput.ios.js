'use strict';

let React = require('react'),
namer = require('color-namer'),
    ColorPickerPanel = require('./ColorPickerPanel.ios');

let {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} = require('react-native');

let ColorPickerInput = React.createClass({
    propTypes: {
        style: React.PropTypes.object,
        color: React.PropTypes.string,
        panelStyle: React.PropTypes.object,
        width: React.PropTypes.number,
        height: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            color: 'rgba(200, 130, 56, 1)',
            width: 160,
            height: 50
        };
    },

    shouldComponentUpdate: function(nextProps) {
        return nextProps.color !== this.props.color;
    },

    render: function() {
        let {style, panelStyle, width, height, color} = this.props;
        let colorName = namer(color).ntc[0].name;

        var rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
        let res = color.match(rgbRegex);
        let c = {
            r: parseFloat(res[1]),
            g: parseFloat(res[2]),
            b: parseFloat(res[3]),
            a: parseFloat(res[4])
        }
        let displayColor = color;
        let val = (c.r+c.g+c.b)/3;
        if(val > 200) {
            displayColor = 'rgba('+
                (255-c.r/4) +
                ', ' +
                (255-c.g/4) +
                ', ' + 
                (255-c.b/4) +
                ', 1)';
        }

        let colorPanelStyle = {
            top: height-4,
            left: -1,
            borderColor: displayColor
        };

        return (
            <TouchableOpacity onPress={this.onOpenPanel}>
                <View style={[styles.view, {width, height, borderColor: displayColor}, style]}>
                    <View style={[styles.color, {backgroundColor: displayColor}]}>
                        <Text style={styles.ripple}>◦</Text>
                    </View>
                    <Text style={[styles.label, {color: displayColor}]}>{colorName}</Text>
                    <ColorPickerPanel
                        width={width}
                        color={color}
                        ref="colorPickerPanel"
                        style={[styles.panel, colorPanelStyle, panelStyle]}
                        onChange={this.onColorChange}
                    />
                </View>
            </TouchableOpacity>
        );
    },

    onOpenPanel: function() {
        this.refs.colorPickerPanel.toggleVisibility();
    },

    onColorChange: function(color) {
        this.props.onChange && this.props.onChange(color);
    }
});

let styles = StyleSheet.create({
    view: {
        backgroundColor: 'rgba(255,255,255,0.9);',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.133)',
        position: 'relative'
    },
    color: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    label: {
        flex: 1,
        fontSize: 14,
        textAlign: 'center',
        color: 'rgba(0,0,0,0.3)',
        borderTopColor: 'black',
        lineHeight: 21,
        borderTopWidth: 1
    },
    ripple: {
        color: 'white',
        textAlign: 'center',
        flex: 1,
        lineHeight: 30,
        fontSize: 36
    },
    panel: {
        position: 'absolute'
    }
});

module.exports = ColorPickerInput;
