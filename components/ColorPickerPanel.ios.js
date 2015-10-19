'use strict';

let React = require('react-native');

let ColorBox = require('./ColorBox.ios');

let {
    View,
    StyleSheet,
    Animated
} = React;

let WIDTH = 160;
let HEIGHT = 220;
let ColorPickerPanel = React.createClass({

    propTypes: {
        style: React.PropTypes.any,
        onChange: React.PropTypes.func,
        initiallyOpen: React.PropTypes.bool,
        color: React.PropTypes.string,
        width: React.PropTypes.number,
        height: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            initiallyOpen: false,
            width: WIDTH,
            height: HEIGHT
        };
    },

    componentWillMount: function() {
        let {initiallyOpen, height} = this.props;
        this.isOpen = initiallyOpen;

        //Open/close animation interpolation settings
        this.openCloseVal = new Animated.Value(initiallyOpen ? 1 : 0);
        this.viewStyles = {
            opacity: this.openCloseVal,
            transform: [{
                scale: this.openCloseVal.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.60, 1]
                })
            },{
                translateY: this.openCloseVal.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-height/3, 0]
                }) 
            }]       
        }
    },

    render: function() {
        let {style, color, width, height} = this.props;
        return (
            <Animated.View style={[styles.container, {width, height, borderColor: color}, style, this.viewStyles]}>
                <ColorBox onPress={this.onColorBoxPress} color="rgba(192, 57, 43,1.0)"/>
                <ColorBox onPress={this.onColorBoxPress} color="rgba(211, 84, 0,1.0)"/>
                <ColorBox onPress={this.onColorBoxPress} color="rgba(243, 156, 18,1.0)"/>
                <ColorBox onPress={this.onColorBoxPress} color="rgba(44, 62, 80,1.0)"/>
                <ColorBox onPress={this.onColorBoxPress} color="rgba(142, 68, 173,1.0)"/>
                <ColorBox onPress={this.onColorBoxPress} color="rgba(41, 128, 185,1.0)"/>
                <ColorBox onPress={this.onColorBoxPress} color="rgba(39, 174, 96,1.0)"/>
                <ColorBox onPress={this.onColorBoxPress} color="rgba(39, 174, 96,1.0)"/>
                <ColorBox onPress={this.onColorBoxPress} color="rgba(22, 160, 133,1.0)"/>
                <ColorBox onPress={this.onColorBoxPress} color="rgba(255, 255, 255,1.0)"/>
                <ColorBox onPress={this.onColorBoxPress} color="rgba(0, 0, 0,1.0)"/>
            </Animated.View>
        )
    },

    onColorBoxPress: function(color) {
        this.hide();
        this.props.onChange && this.props.onChange(color);
    },

    hide: function() {
        this.isOpen = false;
        Animated.spring(this.openCloseVal, {
            toValue: 0
        }).start();
    },

    show: function() {
        this.isOpen = true;
        Animated.spring(this.openCloseVal, {
            toValue: 1
        }).start();
    }
});

let styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        alignItems: 'stretch',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        borderWidth: 1,
        borderTopWidth: 0,
        paddingTop: 10,
    }
});

module.exports = ColorPickerPanel;
