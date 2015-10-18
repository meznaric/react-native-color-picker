'use strict';

let React = require('react-native'),
namer = require('color-namer'),
    ColorPickerPanel = require('./ColorPickerPanel.ios');

let {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} = React;

let ColorPickerInput = React.createClass({
    propTypes: {
        style: React.PropTypes.object,
        initialColor: React.PropTypes.string,
        panelStyle: React.PropTypes.object,
        width: React.PropTypes.number,
        height: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            initialColor: 'rgba(200, 130, 56, 1)',
            width: 160,
            height: 50
        };
    },

    getInitialState: function() {
        return {
            color: this.props.initialColor
        };
    },

    render: function() {
        let {style, panelStyle, width, height} = this.props;
        let {color} = this.state;
        let colorName = namer(color).ntc[0].name;

        let colorPanelStyle = {
            top: 48,
            left: -1 
        };

        return (
            <TouchableOpacity onPress={this.onOpenPanel}>
                <View style={[styles.view, {width, height, borderColor: color}, style]}>
                    <ColorPickerPanel width={width} color={color} ref="colorPickerPanel" style={[styles.panel, colorPanelStyle, panelStyle]} />
                    <View style={[styles.color, {backgroundColor: color}]}>
                        <Text style={styles.ripple}>◦</Text>
                    </View>
                    <Text style={[styles.label, {color: color}]}>{colorName}</Text>
                </View>
            </TouchableOpacity>
        );
    },

    onOpenPanel: function() {
        if(this.refs.colorPickerPanel.isOpen) {
            this.refs.colorPickerPanel.hide();
        } else {
            this.refs.colorPickerPanel.show();
        }
    },

    onColorChange: function(color) {
        this.setState({color});
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
