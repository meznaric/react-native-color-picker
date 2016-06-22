'use strict';

let React = require('react');

let ColorBox = require('./ColorBox.ios');

let {
    View,
    StyleSheet,
    Animated
} = require('react-native');

let WIDTH = 160;
let ColorPickerPanel = React.createClass({

    propTypes: {
        style: React.PropTypes.any,
        onChange: React.PropTypes.func,
        color: React.PropTypes.string,
        width: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            width: WIDTH
        };
    },

    getInitialState: function() {
        return {
            visible: false
        };
    },

    componentWillMount: function() {
        //Open/close animation interpolation settings
        this.openCloseVal = new Animated.Value(this.state.visible ? 1 : 0);
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
                    outputRange: [-30, 0]
                }) 
            }]       
        }
    },

    render: function() {
        let {style, color, width} = this.props;
        if (!this.state.visible) return false;
        return (
            <Animated.View style={[styles.container, {width, borderColor: color}, style, this.viewStyles]} pointerEvents={this.state.visible ? 'auto' : 'none'}>
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
        Animated.spring(this.openCloseVal, {
            toValue: 0
        }).start(({finished}) => {
            console.log(finished);
            if(finished) {
                this.setState({visible: false});
            }
        });
    },

    show: function() {
        this.setState({visible: true});
        Animated.spring(this.openCloseVal, {
            toValue: 1
        }).start();
    },

    toggleVisibility: function () {
        if(this.state.visible) {
            this.hide();
        } else {
            this.show();
        }
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
