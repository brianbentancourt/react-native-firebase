import React, { useEffect, useState } from 'react'
import { ScrollView, Button } from 'react-native'
import firebase from '../database/firebase'
import { ListItem, Avatar } from 'react-native-elements'

const UserList = (props) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        firebase.db.collection('users').onSnapshot(querySnapshot => {
            const users = []
            querySnapshot.docs.forEach(doc => {
                const { name, email, phone } = doc.data()
                users.push({
                    id: doc.id,
                    name,
                    email,
                    phone
                })
            })
            setUsers(users)
        })
    }, [])

    const createTitleAvatar = name => {
        let initials = name.match(/\b\w/g) || []
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
        return initials
    }

    return (
        <ScrollView>
            <Button title="Create User" onPress={() => props.navigation.navigate("CreateUserScreen")} />

            {
                users.map(user =>
                    <ListItem key={user.id} bottomDivider onPress={() => props.navigation.navigate("UserDetailScreen", { userId: user.id })}>
                        <ListItem.Chevron />
                        <Avatar rounded title={createTitleAvatar(user.name)} activeOpacity={0.7} />
                        <ListItem.Content>
                            <ListItem.Title>{user.name}</ListItem.Title>
                            <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )
            }
        </ScrollView>
    )
}

export default UserList
