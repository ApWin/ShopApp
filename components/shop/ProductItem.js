import React from 'react';
import {View, Text, Image, StyleSheet, Button, TouchableNativeFeedback} from "react-native";
import Colors from "../../constants/Colors";

const ProductItem = props =>{
return(
    <TouchableNativeFeedback onPress={props.onSelect} useForeground>
 <View style={styles.product}>
    <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: props.image}} />
    </View>

     <View style={styles.details}>
     <Text style={styles.title} > {props.title} </Text>
     <Text style={styles.price} > ${props.price.toFixed(2)} </Text>
     </View>

     <View style={styles.action}>
         {props.children}
     </View>
 </View>
    </TouchableNativeFeedback>
)
};

const styles = StyleSheet.create({

    product:{
        elevation:5,
        borderRadius:10,
        backgroundColor:'white',
        height:300,
        margin:20,

    },
    image:{
        height:'100%',
        width:'100%',
    },
    imageContainer:{
        width: '100%',
        height:'60%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow:'hidden'
    },
    title:{
       fontSize:18,
        marginVertical:4
    },
    price:{
       fontSize: 14,
        color:'#888',
    },
    action:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:'25%',
        paddingHorizontal:10
    },
    details:{
        alignItems:'center',
        padding:10,
        height:'15%'
    },

});
export default ProductItem;
