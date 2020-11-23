import React, { useState } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native'
import firebase from '../database/firebase'

const CreateUserScreen = (props) => {
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({
        name: '',
        email: '',
        phone: ''
    })

    const handleChangeText = (name, value) => setState({...state, [name] : value})

    const saveNewUser = async () =>{
        if(!state.name){
            alert('Please provide a name')
        } else if(!state.email){
            alert('Please provide a email')
        }else if(!state.phone){
            alert('Please provide a phone')
        }else{
            setLoading(true)
             firebase.db.collection('users').add(state)
            .then(()=>{
                setLoading(false)
                alert('saved')
                props.navigation.navigate('UsersList')
            })
            .catch(error => {
                setLoading(false)
                alert(error.message)
            })
            
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup} >
                <TextInput placeholder="Name user" onChangeText={(value)=> handleChangeText('name',  value)} />
            </View>
            <View style={styles.inputGroup} >
                <TextInput placeholder="Email user" onChangeText={(value)=> handleChangeText('email',  value)} />
            </View>
            <View style={styles.inputGroup} >
                <TextInput placeholder="Phone user" onChangeText={(value)=> handleChangeText('phone',  value)} />
            </View>
            <View>
                <Button disabled={loading} title={loading ? "Saving..." : "Save user"} onPress={saveNewUser} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    }
})



export default CreateUserScreen
