
'use strict';

let React = require('react');

let {
    View,
    StyleSheet,
    TouchableOpacity
} = require('react-native');

let ColorBox = React.createClass({

    propTypes: {
        style: React.PropTypes.object,
        onPress: React.PropTypes.func,
        color: React.PropTypes.string
    },

    render: function() {
        let {style, color} = this.props;
        return (
            <TouchableOpacity onPress={this.onPress} style={[styles.container, {backgroundColor: color}, style]}>
            </TouchableOpacity>
        );
    },
    onPress: function() {
        let {color, onPress} = this.props;
        onPress && onPress(color);
    }
});

let styles = StyleSheet.create({
    container: {
        width: 44,
        height: 44,
        borderWidth: 1,
        borderColor: 'rgba(200,200,200,1)',
        borderRadius: 17,
        margin: 4
    }
});


module.exports = ColorBox;
