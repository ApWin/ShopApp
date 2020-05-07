import React from 'react';
import {HeaderButton, HeaderButtons} from 'react-navigation-header-buttons'
import Ionicons from "react-native-vector-icons/Ionicons";



const CustomHeaderButton = props => {

    return(
        <HeaderButton
            {...props}
            IconComponent = {Ionicons}
            iconSize={23}
            color='white'
        />
    )

};

export default CustomHeaderButton;
