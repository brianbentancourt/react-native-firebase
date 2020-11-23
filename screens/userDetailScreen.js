import React, { useEffect, useState } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet, ActivityIndicator, Alert, Avatar } from 'react-native'
import firebase from '../database/firebase'

const UserDetailScreen = (props) => {
    const [user, setuser] = useState({})
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)

    const getUserById = id => {
        setLoading(true)
        firebase.db.collection('users').doc(id).get()
            .then(doc => {
                setuser({
                    ...doc.data(),
                    id: doc.id
                })
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                props.navigation.navigate('UsersList')
                alert(error.message)
            })
    }

    useEffect(() => {
        getUserById(props.route.params.userId)
    }, [])

    const handleChangeText = (name, value) => setuser({ ...user, [name]: value })

    const updateUser = async () => {
        if (!user.name) {
            alert('Please provide a name')
        } else if (!user.email) {
            alert('Please provide a email')
        } else if (!user.phone) {
            alert('Please provide a phone')
        } else {
            setSaving(true)
            firebase.db.collection('users').doc(user.id).update(user)
                .then(() => {
                    setSaving(false)
                    props.navigation.navigate('UsersList')
                })
                .catch(error => {
                    setSaving(false)
                    alert(error.message)
                })

        }
    }

    const deleteUser = () =>
        firebase.db.collection('users').doc(user.id).delete()
            .then(() => {
                props.navigation.navigate('UsersList')
            })
            .catch(error => {
                props.navigation.navigate('UsersList')
                alert(error.message)
            })


    const openDeleteConfirmationAlert = () => {
        Alert.alert(`Remove ${user.name}`, 'Are you sure?', [
            { text: 'Yes', onPress: deleteUser },
            { text: 'No', onPress: () => console.log('No delete') }
        ])
    }

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#9e9e9e" />
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup} >
                <TextInput placeholder="Name user" value={user.name} onChangeText={(value) => handleChangeText('name', value)} />
            </View>
            <View style={styles.inputGroup} >
                <TextInput placeholder="Email user" value={user.email} onChangeText={(value) => handleChangeText('email', value)} />
            </View>
            <View style={styles.inputGroup} >
                <TextInput placeholder="Phone user" value={user.phone} onChangeText={(value) => handleChangeText('phone', value)} />
            </View>
            <View>
                <Button disabled={saving} title={saving ? "Saving..." : "Save User"} onPress={updateUser} />
            </View>
            <View>
                <Button disabled={saving} color="#E37399" title={"Delete User"} onPress={openDeleteConfirmationAlert} />
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

export default UserDetailScreen
